import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportInformationComponent } from './transport-information.component';

describe('TransportInformationComponent', () => {
  let component: TransportInformationComponent;
  let fixture: ComponentFixture<TransportInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
