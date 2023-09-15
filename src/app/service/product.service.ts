import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com';

  private http = inject(HttpClient);

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/products/categories`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<string[]>(`${this.apiUrl}/products`);
  }

  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/category/${category}`);
  }

  deleteProduct(productId: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/products/${productId}`);
  }

  addProduct(product: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/products`,product);
  }

  editProduct(productId: number, product: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/products/${productId}`, product);
  }
}
