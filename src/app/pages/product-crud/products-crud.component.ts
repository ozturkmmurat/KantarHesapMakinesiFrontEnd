import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductDto } from 'src/app/models/Dtos/productDto';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { ModalService } from 'src/app/services/modalService/modal.service';
import { ProductService } from 'src/app/services/productService/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './products-crud.component.html',
  styleUrls: ['./products-crud.component.scss']
})
export class ProductsCrudComponent implements OnInit {

  productList : ProductDto[] = [];
  categoryList : Category[] = [];
  product:Product
  _addProductForm : FormGroup;
  _updateProductForm : FormGroup;

  constructor(
    private productService : ProductService,
    private categoryService : CategoryService,
    private modalService : ModalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllProductDto()
    this.getAllCategory()
    this.addProductForm()
    this.updateProductForm()
  }

  addProductForm(){
    this._addProductForm = this.formBuilder.group({
       categoryId:["", Validators.required],
       productName:["", Validators.required]
    })
  }

  updateProductForm(){
    this._updateProductForm = this.formBuilder.group({
      id:["", Validators.required],
      categoryId:["", Validators.required],
      productName:["", Validators.required]
    })
  }

  openLg(content: any): void {
    this.modalService.openLg(content);
  }

  getAllProductDto(){
    this.productService.getAllProductDto().subscribe(response => {
      this.productList = response.data
      console.log(response.data)
    })
  }

  getAllCategory(){
    this.categoryService.getAllCategory().subscribe(response => {
      this.categoryList = response.data
      console.log(this.categoryList)
    })
  }

  writeProduct(product:ProductDto){
    this._updateProductForm.patchValue({
      id:product.productId, categoryId:product.categoryId,productName:product.productName
    })
  }

  addProduct(){
    if (this._addProductForm.valid) {
      let productModel = Object.assign({}, this._addProductForm.value)
      this.productService.add(productModel).pipe(
        catchError((err:HttpErrorResponse) => {
          if(err.error.Errors.length >0){
              for(let i = 0; i < err.error.Errors.length; i++){
                this.toastrService.error(err.error.Errors[i].errorMessage,"Doğrulama hatası")
              }
          }
          return of();
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı");
          this.getAllProductDto()
        })
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  updateProduct(){
    if(this._updateProductForm.valid){
      let productModel = Object.assign({}, this._updateProductForm.value)
      this.productService.update(productModel).pipe(
        catchError((err:HttpErrorResponse) => {
          if(err.error.Errors.length >0){
            for(let i = 0; i < err.error.Errors.length; i++){
              this.toastrService.error(err.error.Errors[i].errorMessage,"Doğrulama hatası")
            }
          }
          return of();
        }))
        .subscribe(response => {
          this.toastrService.success(response.message,"Başarılı")
          this.getAllProductDto()
        })
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  deleteProduct(product:ProductDto){
    var result = this.editProductDto(product)
    this.productService.delete(result).pipe(
      catchError((err:HttpErrorResponse) => {
        if(err.error.Errors.length >0){
          for(let i = 0; i < err.error.Errors.length; i++){
            this.toastrService.error(err.error.Errors[i].errorMessage,"Doğrulama hatası")
          }
        }
          return of();
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.getAllProductDto()
      })
  }

  editProductDto(productDto: ProductDto){
    var editProduct = this.product = {
      id : productDto.productId, categoryId : productDto.categoryId, productName: productDto.productName
    }
    return editProduct
  }


}
