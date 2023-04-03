import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateOfferComponent } from './calculate-offer.component';

describe('CalculateOfferComponent', () => {
  let component: CalculateOfferComponent;
  let fixture: ComponentFixture<CalculateOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculateOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
