import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParaphraseComponent } from './paraphrase.component';

describe('ParaphraseComponent', () => {
  let component: ParaphraseComponent;
  let fixture: ComponentFixture<ParaphraseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParaphraseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParaphraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
