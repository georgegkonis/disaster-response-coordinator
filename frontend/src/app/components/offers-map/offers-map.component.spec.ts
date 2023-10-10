import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersMapComponent } from './offers-map.component';

describe('MapComponent', () => {
  let component: OffersMapComponent;
  let fixture: ComponentFixture<OffersMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffersMapComponent]
    });
    fixture = TestBed.createComponent(OffersMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
