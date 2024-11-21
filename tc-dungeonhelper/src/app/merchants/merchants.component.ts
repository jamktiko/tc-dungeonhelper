import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MerchantService } from '../merchant.service';
import { Merchants } from '../types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import {
  MatDialogModule,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MerchantModalComponent } from '../modals/merchant-modal/merchant-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-merchants',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    CommonModule,
    NgFor,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatIcon,
    MatDialogModule,
    MatDialogModule,
  ],
  templateUrl: './merchants.component.html',
  styleUrl: './merchants.component.css',
})
export class MerchantsComponent implements OnInit {
  merchants: Merchants | any;
  newMerchant = {
    name: '',
    inventory: [{ type: '' }],
  };
  isEditing: boolean = false;

  dialogConfig = new MatDialogConfig();

  constructor(
    private merchantService: MerchantService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMerchants();
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  /**
   * Fetchaa listan kauppiaita palvelimelta ja alustaa ne merchants -muuttujaan.
   * @remarks
   * Tämä funktio kutsutaan kun komponentti initialisoidaan.
   */
  public getMerchants() {
    this.merchantService.getMerchants().subscribe((data: any[]) => {
      this.merchants = data;

      console.log(this.merchants);
    });
  }

  /**
   * Luodaan uusi kauppias ja lisätään se merchants -muuttujaan.
   * @remarks
   * Tämä funktio kutsutaan kun käyttäjä painaa "Create Merchant" -painiketta.
   */
  //  public createMerchant(): void {
  //    // Alustetaan newMerchant joka sisältää tulevan kauppiaan tiedot
  //    const newMerchant = {
  //      name: this.merchantForm.value.name, // Tarkoittaa, että haetaan merchantForm -nimisen lomakkeen arvot. ? operaattori tarkoittaa että jos merchantForm on null tai undefined, niin koodia ei suoriteta
  //      type: this.merchantForm.value.itemTypes, // Tässä asetetaan uuden kauppaain tyyppi.l
  //    };
  //    console.log('Request body:', {
  //      name: newMerchant.name,
  //      type: newMerchant.type,
  //    });
  //
  //    // Tässä kutsutaan createMerchant metodia merchantservice palvelusta.
  //    // Se lähettää newMerchant objektin palvelimelle ja odottaa, että se palauttaa vastauksen (response).
  //    // Subscribe tarkoittaa, että se tilaa vastauksen, jotta voidaan reagoida siihen.
  //    this.merchantService.createMerchant(newMerchant).subscribe(
  //      (response) => {
  //        console.log('Merchant created successfully:', response);
  //        this.merchants.push(response); // Push metodi lisää uuden kauppiaan merchants taulukkoon, jolloin se näkyy käyttöliittymässä
  //        this.merchantForm.reset(); // Tämä rivi nollaa lomakkeen sen jälkeen kun uusi kauppias on luotu
  //      },
  //      (error) => {
  //        console.error('Error creating merchant:', error);
  //        // Voit myös näyttää virheilmoituksen käyttöliittymässä
  //      }
  //    );
  //  }

  // Tämän on typeguard, se tarkistaa, onko annettu type- parametri taulukko (string[]) vai yksittäinen merkkijono (string).
  //  //Tämä auttaa typescriptiä ymmärtään, minkä tyyppinen arvo sieltä ois tulos...
  //  isTypeArray(type: string | string[]): type is string[] {
  //    return Array.isArray(type);
  //  }

  // Tässä pitiäisi olla sellainen funktio josta pääsee tarkastelemaan kauppiasta, eli avaa uuden ikkunan jossa näkyy kaikki kauppiaan tavarat
  // Metodi vastaanottaa merchant-objektin, joka sisältää tietoa valitusta kauppiaasta.
  viewMerchant(merchant: any) {
    console.log('viewMerchant() called with:', merchant);
    console.log('Navigating to /merchant-detail with id:', merchant._id);
    this.router.navigate(['/merchant-detail', merchant._id]);
  }

  // Kauppiaan poisto metodi
  deleteMerchant(merchant: any) {
    console.log('deleteMerchant() called with:', merchant);
    this.merchantService.deleteMerchant(merchant).subscribe(
      (response) => {
        // Kutsutaan getMerchantsi uudelleen jotta merchants taulukko saa uudet tiedot
        this.getMerchants();
        console.log('Merchant deleted successfully:', response);
        this.router.navigate(['/merchants']);
      },
      (error) => {
        console.error('Error deleting merchant:', error);
      }
    );
  }

  createMerchant(result: any): void {
    if (!result.name) {
      console.log('Table name is required');
      this.snackBar.open('Table name is required', 'Close', {
        duration: 2000,
        panelClass: ['mat-snackbar-error'],
      });
      return;
    }

    this.merchantService.createMerchant(result).subscribe({
      next: (response) => {
        console.log('Merchant created successfully:', response);
        this.getMerchants();
        this.snackBar.open('Merchant created successfully!', 'Close', {
          duration: 2000,
          panelClass: ['mat-snackbar-success'],
        });
      },
      error: (error) => {
        console.error('Error creating merchant:', error);
        this.snackBar.open('Error creating merchant', 'Close', {
          duration: 2000,
          panelClass: ['mat-snackbar-error'],
        });
      }
    });
  }

  public merchantModalOpen(): void {
    const dialogRef = this.dialog.open(MerchantModalComponent, {
      data: this.newMerchant,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createMerchant(result);
        this.getMerchants();
      }
    });
  }
}
