import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EserviceService } from '../eservice.service';
import { RandomEncounters, Enc } from '../types';

@Component({
  selector: 'app-enctable',
  standalone: true,
  imports: [],
  templateUrl: './enctable.component.html',
  styleUrl: './enctable.component.css',
})
export class EnctableComponent implements OnInit {
  randomEncounters: RandomEncounters[] = [];
  encounters: Enc[] = [];

  constructor(
    private route: ActivatedRoute,
    private eservice: EserviceService
  ) {}

  ngOnInit() {
    this.getTable();
  }

  private getTable(): void {
    this.eservice.getTable().subscribe((hw) => {
      this.randomEncounters = hw;
      console.log('täsä ollaan', hw[0].enc);
    });
  }
}
