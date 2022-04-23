import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParaphraseTextComponent } from './paraphrase-text.component';

describe('ParaphraseTextComponent', () => {
  let component: ParaphraseTextComponent;
  let fixture: ComponentFixture<ParaphraseTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParaphraseTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParaphraseTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
