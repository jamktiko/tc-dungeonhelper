import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomEncounters, Enc } from '../types';
import { EserviceService } from '../eservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-biome-table',
  standalone: true,
  imports: [],
  templateUrl: './biome-table.component.html',
  styleUrl: './biome-table.component.css',
})
export class BiomeTableComponent {
  @Input() randomEncounters: RandomEncounters[] = [];
  @Input() enc: RandomEncounters[] = [];

  constructor(
    private eservice: EserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.eservice.getEncounters().subscribe((randomEncounters) => {
      this.randomEncounters = randomEncounters;
      console.log('täsä ollaan', randomEncounters);
    });
    this.eservice.getTable(1).subscribe((enc) => {
      this.enc = enc;
    });
    this.getTable();
  }
  private getTable() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eservice.getTable(id).subscribe((enc) => {
      this.randomEncounters = enc;
    });
  }

  /** biome: 'Highway',
        enc: [
          {
            id: 1,
            name: 'Highwaymen',
            description:
              'A group of bandits, armed to the teeth, are lying in wait to harass unsuspecting travelers.',
          }, */
}
