import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  currentLanguage: string;
  private translate = inject(TranslateService);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  constructor() {
    this.currentLanguage = this.authService.getUserLanguage();
  }

  changeLanguage(selectedLanguage: string): void {
    this.currentLanguage = selectedLanguage;
    this.translate.use(selectedLanguage);
    this.authService.setUserLanguage(selectedLanguage);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return this.authService.getUserRole() !== null;
  }
}
