import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CourseReserveService {

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(environment.baseUrl + '/api/students/courses/', { headers });
  }

  reserveCourse(courseId: number | string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    // اینجا فانکشن رو صدا می‌زنیم
    const url = environment.baseUrl + environment.course.reserve(courseId);
    return this.http.post(url, {}, { headers });
  }

  cancelReservation(reservationId: number | string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    // اینجا هم همین
    const url = environment.baseUrl + environment.course.cancel(reservationId);
    return this.http.post(url, {}, { headers });
  }
}
