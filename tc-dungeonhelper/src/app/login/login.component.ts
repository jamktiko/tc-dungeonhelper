import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SocialAuthService, SocialUser, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GoogleSigninButtonModule
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  error = '';
  user!: SocialUser;
  clicksub: Subscription;

  // injektoidaan router, authService ja socauthService
  constructor(
    private router: Router,
    private authService: AuthService, // itse tehty service
    private socauthService: SocialAuthService // valmiina saatu service
  ) {
    /* Haetaan navbarin logout-klikkaus tähän komponenttiin, jolloin se
       laukaisee signOutGoogle() -metodin
    */
    this.clicksub = this.authService.getClickEvent().subscribe(() => {
      this.signOutGoogle();
    });
  }

  ngOnInit() {
    /*
    signInGoogle() ei lähde automaattisesti käyntiin,
    jos signOutGoogle() on suoritettu, vaan Google-napin
    painallus vaaditaan.
    */
    this.socauthService.authState.subscribe((user) => {
      this.user = user;
      if (user) {
        console.log('SocialUser', user);
        // poistetaan vanha token jotta voidaan loggautua uudelleen
        this.authService.logout();

        /* Lähetetään glogin-metodilla Googlen idToken backendiin josta saadaan JWT
           Myös userin id annetaan authServicelle, jotta sitä voidaan verrata siellä
           backendistä saatuun userin id:hen. 
        */
        this.authService.glogin(user.idToken, user.id)
          .subscribe((result) => {
            if (result === true) {
              this.router.navigate(['/secret']);
            } else {
              this.error = 'Kirjautuminen epäonnistui';
            }
          });
      }
    });
  }
  
  signOutGoogle(): void {
    this.socauthService.signOut();
  }
  
  // Tavallinen kirjautuminen käyttää authServiceä tietojen lähetykseen.
  // authService palauttaa observablen jossa on joko true tai false
  onSubmit(formData: any) {
    this.authService
      .login(formData.tunnus, formData.salasana)
      .subscribe((result) => {
        if (result === true) {
          this.router.navigate(['/secret']);
        } else {
          this.error = 'Tunnus tai salasana väärä';
        }
      });
  }

  ngOnDestroy() {
    if (this.clicksub) {
      this.clicksub.unsubscribe();
    }
  }
}