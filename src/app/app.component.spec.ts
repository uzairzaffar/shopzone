import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatIconModule } from  '@angular/material/icon';
import { MatSelectModule } from  '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './service/auth.service';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
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

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    translateService = TestBed.inject(TranslateService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentLanguage from AuthService', () => {
    spyOn(authService, 'getUserLanguage').and.returnValue('en');
    spyOn(translateService, 'get').and.returnValue(of('Translated Text'));
    fixture.detectChanges();
    expect(component.currentLanguage).toBe('en');
  });

  it('should update currentLanguage when TranslateService lang changes', () => {
    spyOn(authService, 'getUserLanguage').and.returnValue('en');
    fixture.detectChanges();

    const newLang = 'fr';
    translateService.use(newLang);
    
    expect(component.currentLanguage).toBe(newLang);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
