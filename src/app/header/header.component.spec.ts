import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatIconModule } from  '@angular/material/icon';
import { MatSelectModule } from  '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AppComponent } from '../app.component';
import { HeaderComponent } from './header.component';
import { AuthService } from '../service/auth.service';
import { AppRoutingModule } from '../app-routing.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent],
      imports: [
        TranslateModule.forRoot(),
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatSelectModule,
        FormsModule
      ],
      providers: [
        AuthService,
        TranslateService
      ],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    translateService = TestBed.inject(TranslateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should initialize currentLanguage from AuthService', () => {
    const userLanguage = 'en';
    spyOn(authService, 'getUserLanguage').and.returnValue(userLanguage);

    fixture.detectChanges();

    expect(authService.getUserLanguage).toHaveBeenCalled();
    expect(component.currentLanguage).toBe(userLanguage);
  });

  it('should change the language and update AuthService and TranslateService', () => {
    const selectedLanguage = 'es';
    component.currentLanguage = 'en';

    spyOn(translateService, 'use').and.callThrough();
    spyOn(authService, 'setUserLanguage').and.callThrough();

    component.changeLanguage(selectedLanguage);

    expect(component.currentLanguage).toBe(selectedLanguage);
    expect(translateService.use).toHaveBeenCalledWith(selectedLanguage);
    expect(authService.setUserLanguage).toHaveBeenCalledWith(selectedLanguage);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
