import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EserviceService } from '../eservice.service';
import { RandomEncounters, Enc } from '../types';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-enctable',
  standalone: true,
  imports: [NgFor],
  templateUrl: './enctable.component.html',
  styleUrl: './enctable.component.css',
})
export class EnctableComponent {
  randomEncounters: RandomEncounters[] = [];
  encs: Enc[] = [];
  encprops = Object.keys(this.randomEncounters);
  neededArray = [];
  i = 0;

  constructor(
    private route: ActivatedRoute,
    private eservice: EserviceService
  ) {}

  ngOnInit() {
    this.getTable();
  }

  private getTable(): void {
    this.eservice.getTable().subscribe((data: RandomEncounters[]) => {
      this.randomEncounters = data;
      console.log('Encounters', data);
    });
  }
}
