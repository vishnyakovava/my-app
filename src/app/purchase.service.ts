import {HttpClient, HttpParams} from '@angular/common/http';
import { Purchase} from './purchase';
import {Injectable} from '@angular/core';
import {Products} from './products';

@Injectable()
export class PurchaseService {
  private url = 'http://localhost:8080/rest/purchases';

  constructor(private http: HttpClient) { }

  getPurchases() {
    return this.http.get(`${this.url}/findall`);
  }

  createPurchase(purchase: Purchase) {
    return this.http.post(`${this.url}/save`, purchase);
  }
  updatePurchase(purchase: Purchase) {
    return this.http.put(`${this.url}/update`, purchase);
  }
  deletePurchase(purchaseId: number) {
    return this.http.delete(`${this.url}/delete/${purchaseId}`);
  }

}

