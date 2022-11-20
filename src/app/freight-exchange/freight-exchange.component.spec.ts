import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightExchangeComponent } from './freight-exchange.component';

describe('FreightExchangeComponent', () => {
  let component: FreightExchangeComponent;
  let fixture: ComponentFixture<FreightExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreightExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
