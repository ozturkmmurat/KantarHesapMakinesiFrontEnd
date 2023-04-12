import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductDto } from 'src/app/models/Dtos/productDto';
import { ModalService } from 'src/app/services/modalService/modal.service';
import { ProductService } from 'src/app/services/productService/product.service';
import { ErrorService } from 'src/app/services/errorService/error.service';

@Component({
  selector: 'app-product',
  templateUrl: './products-crud.component.html',
  styleUrls: ['./products-crud.component.scss']
})
export class ProductsCrudComponent implements OnInit {

  //Model Start
  productList: ProductDto[] = [];
  categoryList: Category[] = [];
  product: Product
  //Model End

  //Form Start
  _addProductForm: FormGroup;
  _updateProductForm: FormGroup;
  //Form End

  filterText: any;

  constructor(
    //Service Start
    private productService: ProductService,
    private modalService: ModalService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    //Service End

    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getAllProductDto()
    this.addProductForm()
    this.updateProductForm()
  }

  addProductForm() {
    this._addProductForm = this.formBuilder.group({
      productName: ["", Validators.required]
    })
  }

  updateProductForm() {
    this._updateProductForm = this.formBuilder.group({
      id: ["", Validators.required],
      categoryId: ["", Validators.required],
      productName: ["", Validators.required]
    })
  }

  openLg(content: any): void {
    this.modalService.openLg(content);
  }

  getAllProductDto() {
    this.productService.getAllProductDto().subscribe(response => {
      this.productList = response.data
    })
  }

  writeProduct(product: ProductDto) {
    this._updateProductForm.patchValue({
      id: product.productId,  productName: product.productName
    })
  }

  addProduct() {
    if (this._addProductForm.valid) {
      let productModel = Object.assign({}, this._addProductForm.value)
      this.productService.add(productModel).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err)
          return of();
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı");
          this.getAllProductDto()
        })
    }
    else {
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  updateProduct() {
    if (this._updateProductForm.valid) {
      let productModel = Object.assign({}, this._updateProductForm.value)
      this.productService.update(productModel).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err)
          return of();
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
          this.getAllProductDto()
        })
    }
    else {
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  deleteProduct(product: ProductDto) {
    var result = this.editProductDto(product)
    this.productService.delete(result).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorService.checkError(err)
        return of();
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.getAllProductDto()
      })
  }

  editProductDto(productDto: ProductDto) {
    var editProduct = this.product = {
      id: productDto.productId, productName: productDto.productName
    }
    return editProduct
  }


}
