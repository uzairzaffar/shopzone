import { Component, inject } from '@angular/core';
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
  
  constructor() {
    this.currentLanguage = this.authService.getUserLanguage();
  }

  changeLanguage(selectedLanguage: string): void {
    this.currentLanguage = selectedLanguage;
    this.translate.use(selectedLanguage);
    this.authService.setUserLanguage(selectedLanguage);
  }
}
