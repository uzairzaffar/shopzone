import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AlertService } from '../service/alert.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authService: AuthService;
  let alertService: AlertService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        TranslateModule.forRoot(),
        MatSnackBarModule,
        RouterTestingModule
      ],
      providers: [AuthService, AlertService, TranslateService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService);
    alertService = TestBed.inject(AlertService);
    router = TestBed.inject(Router);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login() and navigate on successful login', () => {
    spyOn(authService, 'login').and.returnValue(true);
    spyOn(router, 'navigate');
    component.username = 'testuser';
    component.password = 'testpassword';
    
    component.login();

    expect(authService.login).toHaveBeenCalledWith('testuser', 'testpassword');
    expect(router.navigate).toHaveBeenCalledWith(['/user']); // Assuming the user role is 'user'
  });

  it('should show error alert and not navigate on failed login', () => {
    component.username = 'testuser';
    component.password = 'testpassword';
    spyOn(authService, 'login').and.returnValue(false);
    spyOn(alertService, 'showError');
    spyOn(router, 'navigate');
    
    component.login();

    expect(authService.login).toHaveBeenCalled();
    expect(alertService.showError).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not call authService.login() and not navigate when fields are empty', () => {
    spyOn(authService, 'login');
    spyOn(router, 'navigate');
    
    component.login();

    expect(authService.login).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
