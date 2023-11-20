import { Component, OnInit } from '@angular/core';
import { InstallationCostDto } from 'src/app/models/Dtos/installationCostDto';
import { Location } from '../../../app/models/location';
import { InstallationCostService } from 'src/app/services/installationCostService/installation-cost.service';
import { LocationService } from 'src/app/services/locationService/location.service';
import { ModalService } from 'src/app/services/modalService/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { InstallationCost } from 'src/app/models/installationCost';
import { ErrorService } from 'src/app/services/errorService/error.service';

@Component({
  selector: 'app-installation-cost',
  templateUrl: './installation-cost.component.html',
  styleUrls: ['./installation-cost.component.scss']
})
export class InstallationCostComponent implements OnInit {

  //Model Start
  installationCostDtoList: InstallationCostDto[] = []
  installationCost: InstallationCost;
  locationList: Location[] = []
  //Model End

  // Form Start
  _addInstallationCostForm: FormGroup;
  _updateInstallationCostForm: FormGroup;
  //Form End

  filterText: any

  constructor(
    //Service Start
    private modalService: ModalService,
    private installationCostService: InstallationCostService,
    private locationService: LocationService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    //Service End

    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllInstallationCostDto()
    this.getAllLocation()
    this.addInstallationCostForm()
    this.updateInstallationCostForm()
  }

  openLg(content: any) {
    this.modalService.openLg(content)
  }

  addInstallationCostForm() {
    this._addInstallationCostForm = this.formBuilder.group({
      locationId: ["", Validators.required],
      installationTlPrice: [1, Validators.required],
      installationEuroPrice: [, Validators.required]
    })
  }

  updateInstallationCostForm() {
    this._updateInstallationCostForm = this.formBuilder.group({
      id: ["", Validators.required],
      locationId: ["", Validators.required],
      installationTlPrice: [1, Validators.required],
      installationEuroPrice: [, Validators.required]
    })
  }


  editDeleteInstallationCost(installationCostDto: InstallationCostDto) {
    this.installationCost = {
      id: installationCostDto.installationCostId, locationId: installationCostDto.locationId, installationTlPrice: installationCostDto.installationTlPrice,
      installationEuroPrice: installationCostDto.installationEuroPrice
    }
  }

  writeUpdateInstallationCostForm(installationCostDto: InstallationCostDto) {
    this._updateInstallationCostForm.patchValue({
      id: installationCostDto.installationCostId, locationId: installationCostDto.locationId, installationEuroPrice: installationCostDto.installationEuroPrice
    })
  }

  getAllInstallationCostDto() {
    this.installationCostService.getAllInstallationCostDto().subscribe(response => {
      this.installationCostDtoList = response.data
    })
  }

  getAllLocation() {
    this.locationService.getAllLocation().subscribe(response => {
      this.locationList = response.data
    })
  }

  addInstallationCost() {
    if (this._addInstallationCostForm.valid) {
      let installationCostModel = Object.assign({}, this._addInstallationCostForm.value)
      this.installationCostService.add(installationCostModel).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı");
          this.getAllInstallationCostDto();
        })
    }
    else {
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  updateInstallationCost() {
    if (this._updateInstallationCostForm.valid) {
      let installationCostModel = Object.assign({}, this._updateInstallationCostForm.value)
      this.installationCostService.update(installationCostModel).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı");
          this.getAllInstallationCostDto();
        })
    }
    else {
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  deleteInstallationCost(installationCostDto: InstallationCostDto) {
    this.editDeleteInstallationCost(installationCostDto)
    this.installationCostService.delete(this.installationCost).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorService.checkError(err)
        return EMPTY
      }))
      .subscribe(response => {
        this.getAllInstallationCostDto();
        this.toastrService.success(response.message, "Başarılı")
      })
  }



}
