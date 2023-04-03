import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, of } from 'rxjs';
import { Electronic } from 'src/app/models/electronic';
import { Size } from 'src/app/models/size';
import { ElectronicService } from 'src/app/services/electronicService/electronic.service';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { ModalService } from 'src/app/services/modalService/modal.service';
import { SizeContentService } from 'src/app/services/sizeContentService/size-content.service';
import { SizeService } from 'src/app/services/sizeService/size.service';
const { required, min } = Validators;

@Component({
  selector: 'app-size-content-modal',
  templateUrl: './size-content-modal.component.html',
  styleUrls: ['./size-content-modal.component.scss']
})
export class SizeContentModalComponent implements OnInit {


  //#region Injections
  private readonly fb = inject(FormBuilder);
  private readonly sizeContentService = inject(SizeContentService);
  private readonly electronicService = inject(ElectronicService);
  private readonly toastrService = inject(ToastrService);
  //#endregion

  private loadAccessoryList(): void {
    this.electronicService.getAllElectronic().subscribe(
      response => this.electronicList = response.data
    )
  }


  @Input() size : Size

    _sizeContentForm:FormGroup;
    sizeList: Size[] = []
    electronicList : Electronic[] = [];
    filterText : any

  constructor(
    private errorService : ErrorService,
    private modalService : ModalService
  ) { }

  ngOnInit(): void {
    this.loadAccessoryList()
    this.buildForm()
    this.getAllSizeContent()
  }

  private buildForm(): void {
    const { id } = this.size;
    this._sizeContentForm = this.fb.group({
      sizeId: new FormControl(id || 0, { nonNullable: true, validators: [required] }),
      electronicId: new FormControl(0, { nonNullable: true, validators: [required] }),
      electronicPcs: new FormControl(1, { nonNullable: true, validators: [required] }),
      sizeContentArray: this.fb.array([])
    })
  }

  get sizeContent() {
    return this._sizeContentForm.controls['sizeContentArray'] as FormArray;
  }

  getAllSizeContent(){
    const input = this._sizeContentForm.value as any;
    console.log("Get All İnput yazdırıldı",input)
    console.log("input yazdırıldı başlangıç", input)
    this.sizeContentService
    .getAllSizeCtDtoBySizeId(input.sizeId)
    .subscribe(({ data }) => {
      data.map(item => {
        const group = this.fb.group({
          id:new FormControl(item.sizeContentId),
          sizeId:new FormControl(item.sizeId),
          electronicId:new FormControl(item.electronicId),
          electronicName:new FormControl(item.electronicName),
          electronicTlPrice:new FormControl(item.electronicTlPrice),
          electronicEuroPrice:new FormControl(item.electronicEuroPrice),
          electronicPcs:new FormControl(item.electronicPcs)
        })
        this.sizeContent.push(group)
      });
    })
  }

  getAllElectronic(){
    this.electronicService.getAllElectronic().subscribe(response => {
      this.electronicList = response.data
      console.log("Elektronik listesi", this.electronicList)
    })
  }


  save(): void {
    console.log("Size content add", this._sizeContentForm.value)
    if (this._sizeContentForm.invalid) {
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata");
      return;
    }

    const input = this._sizeContentForm.value as any;
    this.sizeContentService.add(input)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY;
        })
      )
      .subscribe(response => {
        this.sizeContentService
          .getAllSizeCtDtoBySizeId(input.sizeId)
          .subscribe(({ data }) => {
            data.map(item => {
              const group = this.fb.group({
                id:new FormControl(item.sizeContentId),
                sizeId:new FormControl(item.sizeId),
                electronicId:new FormControl(item.electronicId),
                electronicName:new FormControl(item.electronicName),
                electronicTlPrice:new FormControl(item.electronicTlPrice),
                electronicEuroPrice:new FormControl(item.electronicEuroPrice),
                electronicPcs:new FormControl(item.electronicPcs)
              })
              console.log("Add pushlanan group",group)
              this.sizeContent.push(group)
            });
          })
          this.sizeContent.clear()
          console.log("Reset başarılı mı ?",this.sizeContent)
        this.toastrService.success(response.message, "Başarılı")
      })
  }



  update(contact: any, index: number): void {
    console.log("Update sizecontent form value ",this._sizeContentForm.value)
    if (this._sizeContentForm.invalid) {//Validate form
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
      return;
    }
    const input = {
      id:contact.controls.id.value,
      sizeId:contact.controls.sizeId.value,
      electronicId:parseInt(contact.controls.electronicId.value),
      electronicPcs:contact.controls.electronicPcs.value
    }
    console.log("İnput yazdırıldı",input)
    this.sizeContentService.update(input).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorService.checkError(err)
        return EMPTY;
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
      })
  }



  remove(contact: any, index: number): void {
    const input = {
      id:contact.controls.id.value,
      sizeId:contact.controls.sizeId.value,
      electronicId:contact.controls.electronicId.value,
      electronicPcs:contact.controls.electronicPcs.value
    }
    console.log("Delete check ", contact);
    this.sizeContentService.delete(input).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorService.checkError(err)
        return EMPTY;
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.sizeContent.controls.splice(index, 1);
      })
  }
  

}


