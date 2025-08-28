import { Injectable } from '@angular/core';
import { ITransaction, ITransactions } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  // private API_GET_TRANSACTIONS = environment.baseUrl + environment.purchases.get;
  // private API_ADD_TRANSACTION = environment.baseUrl + environment.purchases.add;
  // private API_PUT_TRANSACTION = environment.baseUrl + environment.purchases.put;
  // private API_DELETE_TRANSACTION = environment.baseUrl + environment.purchases.delete;

  // constructor(private http: HttpClient) { }

  // getAllTrans(): Observable<ITransactions[]> {
  //   return this.http.get<ITransactions[]>(this.API_GET_TRANSACTIONS);
  // }

  // addNewTrans(data: ITransaction): Observable<any> {
  //   return this.http.post(this.API_ADD_TRANSACTION, data);
  // }

  // editTrans(id: number, data: { cost: number, purchase_date: string, task_name: number }): Observable<any> {
  //   const url = this.API_PUT_TRANSACTION.replace('{id}', id.toString());
  //   return this.http.put(url, data);
  // }

  // deleteTrans(id: number): Observable<any> {
  //   const url = this.API_DELETE_TRANSACTION.replace('{id}', id.toString());
  //   return this.http.delete(url);
  // }
}
