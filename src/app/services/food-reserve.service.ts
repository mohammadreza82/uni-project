import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodReserveService {
  private API_RESERVE_FOOD = environment.baseUrl + environment.food.reserve;
  private API_CANCEL_FOOD = environment.baseUrl + environment.food.cancel;
  private API_GET_FOODSLIST = environment.baseUrl + environment.food.get;

  constructor(private http: HttpClient) {}

  // getFoods با Authorization header
  getFoods(): Observable<any> {
    const token = localStorage.getItem('token'); // گرفتن توکن
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.API_GET_FOODSLIST, { headers });
  }

  reserveFood(foodId: number | string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.API_RESERVE_FOOD, { foodId }, { headers });
  }

  cancelReservation(reservationId: number | string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.API_CANCEL_FOOD, { reservationId }, { headers });
  }
}
