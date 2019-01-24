import { Observable, of, throwError } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Customer } from './customer';
import {Injectable} from '@angular/core';

@Injectable()
export class CustomerService {
  private url = 'http://localhost:8080/rest/users';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.url}/findall`);
  }

  createUser(user: Customer) {
    return this.http.post(`${this.url}/save`, user);
  }
  updateUser(user: Customer) {
    return this.http.put(`${this.url}/update`, user);
  }
  deleteUser(userEmail: string) {
    return this.http.delete(`${this.url}/delete/${userEmail}`);
  }

}
