import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListDetailsComponent } from './order-list-details.component';

describe('OrderListDetailsComponent', () => {
  let component: OrderListDetailsComponent;
  let fixture: ComponentFixture<OrderListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
