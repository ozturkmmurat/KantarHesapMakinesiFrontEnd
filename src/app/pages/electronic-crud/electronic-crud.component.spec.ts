import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicCrudComponent } from './electronic-crud.component';

describe('ElectronicCrudComponent', () => {
  let component: ElectronicCrudComponent;
  let fixture: ComponentFixture<ElectronicCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectronicCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectronicCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
