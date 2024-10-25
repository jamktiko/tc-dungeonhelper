import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MerchantService } from '../merchant.service';
import { Merchants } from '../types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-merchants',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    CommonModule,
    NgFor,
    RouterModule,
    RouterOutlet,
  ],
  templateUrl: './merchants.component.html',
  styleUrl: './merchants.component.css',
})
export class MerchantsComponent implements OnInit {
  merchants: Merchants[] = [];

  constructor(private merchantService: MerchantService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public getMerchants(): void {
    console.log('Fetching merchants...');
    this.merchantService.getMerchants().subscribe(
      (merchants) => {
        console.log('Merchants received:', merchants);
        this.merchants = merchants;
      },
      (error) => console.error('Error fetching merchants:', error)
    );
  }
}
