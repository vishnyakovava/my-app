import { Observable, of, throwError } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Products } from './products';
import {Injectable} from '@angular/core';

@Injectable()
export class ProductsService {
  private url = 'http://localhost:8080/rest/products';
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${this.url}/findall`);
  }
  createProduct(product: Products) {
    return this.http.post(`${this.url}/save`, product);
  }
  updateProduct(product: Products) {
    return this.http.put(`${this.url}/update`, product);
  }
  deleteProduct(productId: number) {
    return this.http.delete(`${this.url}/delete/${productId}`);
  }

}
