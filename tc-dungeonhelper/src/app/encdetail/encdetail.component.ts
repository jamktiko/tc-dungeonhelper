import { Component } from '@angular/core';
import { RandomEncounters, Enc } from '../types';
import { CommonModule, Location, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EserviceService } from '../eservice.service';

@Component({
  selector: 'app-encdetail',
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule],
  templateUrl: './encdetail.component.html',
  styleUrl: './encdetail.component.css',
})
export class EncdetailComponent {
  randomEncounters: RandomEncounters[] = [];
  encs: Enc[] = [];
  filteredEncounters: RandomEncounters | undefined;
  rolledEncounter: Enc | null = null; // Store the whole rolled encount

  constructor(
    private route: ActivatedRoute,
    private eservice: EserviceService,
    private location: Location // Inject the Location service
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getOneEncouter();
  }

  goBack(): void {
    this.location.back(); // Use the Location service to navigate back to the previous page
  }

  private getOneEncouter(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eservice
      .getOneEncouter(id)
      .subscribe((encounter) => (this.randomEncounters = encounter));
  }
}
