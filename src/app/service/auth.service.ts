import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  setUserLanguage(language: string): void {
    localStorage.setItem('userLanguage', language);
  }

  getUserLanguage(): string {
    return localStorage.getItem('userLanguage') || 'en';
  }
}
