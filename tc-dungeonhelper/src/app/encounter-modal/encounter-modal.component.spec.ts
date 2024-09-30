import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterModalComponent } from './encounter-modal.component';

describe('EncounterModalComponent', () => {
  let component: EncounterModalComponent;
  let fixture: ComponentFixture<EncounterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncounterModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncounterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
