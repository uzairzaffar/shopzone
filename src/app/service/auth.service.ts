import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'user', password: 'user', role: 'user' },
    { username: 'admin', password: 'admin', role: 'admin' }
  ];

  private currentUser: { username: string, role: string } | null = null;

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  getUserRole(): string | null {
    return JSON.parse(localStorage.getItem('user') || '{}')?.role || null;
  }
  
  setUserLanguage(language: string): void {
    localStorage.setItem('userLanguage', language);
  }

  getUserLanguage(): string {
    return localStorage.getItem('userLanguage') || 'en';
  }
}
