import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationOffertsComponent } from './quotation-offerts.component';

describe('QuotationOffertsComponent', () => {
  let component: QuotationOffertsComponent;
  let fixture: ComponentFixture<QuotationOffertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationOffertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationOffertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
