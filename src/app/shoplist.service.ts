import { Observable, of, throwError } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ShoppingList} from './shoplist';

@Injectable()
export class ShoplistService {
  private url = 'http://localhost:8080/rest/shoplist';

  constructor(private http: HttpClient) { }

  getLists() {
    return this.http.get(`${this.url}/findall`);
  }

  createList(list: ShoppingList) {
    return this.http.post(`${this.url}/save`, list);
  }
  updateList(list: ShoppingList) {
    return this.http.put(`${this.url}/update`, list);
  }
  deleteList(listId: number) {
    return this.http.delete(`${this.url}/delete/${listId}`);
  }

}
