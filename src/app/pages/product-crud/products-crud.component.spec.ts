import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCrudComponent } from './products-crud.component';

describe('ProductComponent', () => {
  let component: ProductsCrudComponent;
  let fixture: ComponentFixture<ProductsCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
