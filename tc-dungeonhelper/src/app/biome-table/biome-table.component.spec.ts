import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomeTableComponent } from './biome-table.component';

describe('BiomeTableComponent', () => {
  let component: BiomeTableComponent;
  let fixture: ComponentFixture<BiomeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiomeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiomeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
