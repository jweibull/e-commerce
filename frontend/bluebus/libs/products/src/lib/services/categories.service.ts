import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { HttpResponse } from '../../../../models/http-response';

@Injectable()
export class CategoriesService {

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/v1/categories');
  }

  public createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('http://localhost:3000/api/v1/categories', category);
  }

  public deleteCategory(id: string): Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(`http://localhost:3000/api/v1/categories/${id}`);
  }
}
