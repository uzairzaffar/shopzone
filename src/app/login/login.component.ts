import { Component , inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from  '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from  '@angular/forms';
import { AuthService } from '../service/auth.service';
import { AlertService } from '../service/alert.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  private readonly destroy: DestroyRef = inject(DestroyRef);
  private translate = inject(TranslateService);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  constructor() {}

  ngOnInit() {
    if(this.authService.getUserRole()) {
      this.router.navigate([this.authService.getUserRole() === 'admin' ? '/admin' : '/user']);
    }
  }

  login() {
    if (!this.username || !this.password) {
      return;
    }
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate([this.authService.getUserRole() === 'admin' ? '/admin' : '/user']);
    } else {
      this.translate.get('login.errorMessage').pipe(takeUntilDestroyed(this.destroy)).subscribe((message: string) => {
        this.alertService.showError(message);
      });
    }
  }
}
