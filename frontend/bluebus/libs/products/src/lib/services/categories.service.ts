import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { HttpResponse } from '../../../../models/http-response';
import { environment } from '@env/environment'

@Injectable()
export class CategoriesService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  public getCategory(id: string) : Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/${id}`);
  }

  public createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, category);
  }

  public updateCategory(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/categories/${id}`, category);
  }

  public deleteCategory(id: string): Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(`${this.baseUrl}/categories/${id}`);
  }
}
