import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableTestComponent } from './data-table-test.component';

describe('DataTableTestComponent', () => {
  let component: DataTableTestComponent;
  let fixture: ComponentFixture<DataTableTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
