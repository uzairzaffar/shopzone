import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'shopzone';

  currentLanguage: string;

  private readonly destroy: DestroyRef = inject(DestroyRef);
  private translate = inject(TranslateService);
  private authService = inject(AuthService);
  
  constructor() {
    this.currentLanguage = this.authService.getUserLanguage();
  }

  ngOnInit() {
    this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroy)).subscribe((event) => {
      this.currentLanguage = event.lang
    });
    this.translate.use(this.currentLanguage);
    this.authService.setUserLanguage(this.currentLanguage);
  }
}
