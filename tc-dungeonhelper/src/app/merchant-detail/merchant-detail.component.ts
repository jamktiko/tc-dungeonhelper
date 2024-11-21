import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Merchants } from '../types';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MerchantService } from '../merchant.service';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCard, MatCardModule } from '@angular/material/card';
import { RouterModule, RouterOutlet } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-merchant-detail',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    FormsModule,
    RouterModule,
    MatExpansionModule,
    MatButton,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  templateUrl: './merchant-detail.component.html',
  styleUrl: './merchant-detail.component.css',
})
export class MerchantDetailComponent implements OnInit {
  merchants: Merchants[] | undefined;
  specificMerchant: Merchants | any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private mservice: MerchantService
  ) {}
  ngOnInit() {
    this.getMerchants();
  }

  getMerchants() {
    console.log('getMerchants() called');
    this.mservice.getMerchants().subscribe((data: Merchants[] | undefined) => {
      console.log('getMerchants() got data:', data);
      this.merchants = data;
      console.log('getMerchants() set this.merchants:', this.merchants);

      const id = this.route.snapshot.paramMap.get('id') as string;
      this.getSpecificMerchant(id);
    });
  }

  getSpecificMerchant(id: string) {
    if (this.merchants) {
      const result = this.merchants.find((merchant) => merchant._id === id);
      this.specificMerchant = result;
      console.log('getSpecificMerchant() result:', this.specificMerchant);
    } else {
      console.log('No merchants available');
    }
  }
}
