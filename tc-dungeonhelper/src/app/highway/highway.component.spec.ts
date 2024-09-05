import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighwayComponent } from './highway.component';

describe('HighwayComponent', () => {
  let component: HighwayComponent;
  let fixture: ComponentFixture<HighwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighwayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
