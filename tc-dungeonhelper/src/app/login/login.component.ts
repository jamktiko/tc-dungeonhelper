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

  constructor(
    private router: Router,
    private authService: AuthService,
    private socauthService: SocialAuthService
  ) {
    this.clicksub = this.authService.getClickEvent().subscribe(() => {
      this.signOutGoogle();
    });
  }

  ngOnInit() {
    this.socauthService.authState.subscribe((user) => {
      this.user = user;
      if (user) {
        console.log('SocialUser', user);
        
        this.authService.glogin(user.idToken, user.id)
          .subscribe({
            next: (result) => {
              console.log('Login result:', result);
              if (result === true) {
                this.router.navigate(['/dashboard']);
              } else {
                this.error = 'Kirjautuminen epäonnistui';
              }
            },
            error: (error) => {
              console.error('Login error:', error);
              this.error = 'Kirjautuminen epäonnistui: ' + (error.message || 'Tuntematon virhe');
            }
          });
      }
    });
  }
  
  signOutGoogle(): void {
    this.socauthService.signOut();
    this.authService.logout();
  }
  
  onSubmit(formData: any) {
    this.authService
      .login(formData.tunnus, formData.salasana)
      .subscribe({
        next: (result) => {
          if (result === true) {
            this.router.navigate(['/dashboard']);
          } else {
            this.error = 'Tunnus tai salasana väärä';
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.error = 'Kirjautuminen epäonnistui: ' + (error.message || 'Tuntematon virhe');
        }
      });
  }

  ngOnDestroy() {
    if (this.clicksub) {
      this.clicksub.unsubscribe();
    }
  }
}
