import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComedyTextComponent } from './comedy-text.component';

describe('ComedyTextComponent', () => {
  let component: ComedyTextComponent;
  let fixture: ComponentFixture<ComedyTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComedyTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComedyTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
