import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsHandlerComponent } from './params-handler.component';

describe('ParamsHandlerComponent', () => {
  let component: ParamsHandlerComponent;
  let fixture: ComponentFixture<ParamsHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamsHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
