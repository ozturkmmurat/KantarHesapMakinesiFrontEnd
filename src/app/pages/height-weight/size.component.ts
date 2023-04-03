import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { Electronic } from 'src/app/models/electronic';
import { Product } from 'src/app/models/product';
import { Size } from 'src/app/models/size';
import { ElectronicService } from 'src/app/services/electronicService/electronic.service';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { ModalService } from 'src/app/services/modalService/modal.service';
import { ProductService } from 'src/app/services/productService/product.service';
import { SizeService } from 'src/app/services/sizeService/size.service';

@Component({
  selector: 'app-height-weight',
  templateUrl:'./size.component.html',
  styleUrls: ['size.component.scss']
})
export class SizeComponent implements OnInit {

  //Model Start
  size:Size
  sizeList:Size[] = []
  electronicList:Electronic[] = []
  //Model End

  //Form Start
  _addHeightWeightForm:FormGroup;
  _updateHeightWeightForm:FormGroup;
  //Form End

  sizeSelected: Size
  filterText :any
  
  constructor(
    //Service Start
    private sizeService : SizeService,
    private electronicService : ElectronicService,
    private modalService : ModalService,
    private toastrService : ToastrService,
    private errorService : ErrorService,
    //Service End

    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllSize()
    this.getAllElectronic()
    this.addHeightWeightForm()
    this.updateHeightWeightForm()
  }

  openLg(content : any){
    this.modalService.openLg(content)
  }

  @ViewChild('sizeContentDetail') sizeContentDetailChild: any; 
  private openModal(): void {
    this.modalService
      .openXl(this.sizeContentDetailChild)
      .dismissed
      .subscribe(() => { });
  }

  sizeContentEdit(size:Size){
    this.sizeSelected = size;
    this.openModal()
  }

  addHeightWeightForm(){
    this._addHeightWeightForm = this.formBuilder.group({
      aspect:["", Validators.required],
      weight:["", Validators.required]
    })
  }

  updateHeightWeightForm(){
    this._updateHeightWeightForm = this.formBuilder.group({
      id:["", Validators.required],
      aspect:["", Validators.required],
      weight:["", Validators.required]
    })
  }

  getAllSize(){
    this.sizeService.getAllSize().subscribe(response => {
      this.sizeList = response.data
    })
  }

  getAllElectronic(){
    this.electronicService.getAllElectronic().subscribe(response => {
      this.electronicList = response.data
    })
  }

  writeSize(size : Size){
    this._updateHeightWeightForm.patchValue({
      id:size.id, aspect:size.aspect, weight:size.weight
    })
  }

  addSize(){
    console.log("Check add weight ",this._addHeightWeightForm.value)
    if (this._addHeightWeightForm.valid) {
      let heightWeightModel = Object.assign({},this._addHeightWeightForm.value)
      this.sizeService.add(heightWeightModel).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY;
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı");
          this.getAllSize();
        })
    }
  }

  updateSize(){
    console.log("Check update size", this._updateHeightWeightForm.value)
    if (this._updateHeightWeightForm.valid) {
      let heightWeightModel = Object.assign({},this._updateHeightWeightForm.value)
      this.sizeService.update(heightWeightModel).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY;
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı");
          this.getAllSize();
        })
    }
  }

  deleteSize(heightWeight : Size){
    this.sizeService.delete(heightWeight).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorService.checkError(err)
        return EMPTY;
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.getAllSize()
      })
  }

}
