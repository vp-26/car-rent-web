import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResposnemodel } from 'src/app/shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  getAllBookings() {
    return this.http.get<APIResposnemodel>('/api/ZoomCar/GetAllBookings');
  }

  getAllBookingsByCarId(X: number) {
    return this.http.get<APIResposnemodel>(
      '/api/ZoomCar/GetAllBookingsByCarId?carid=' + X
    );
  }

  getAllBookingsByCustomerId(X: number) {
    return this.http.get<APIResposnemodel>(
      '/api/ZoomCar/GetAllBookingsByCustomerId?customerid=' + X
    );
  }

  getBookingById(X: number) {
    return this.http.get<APIResposnemodel>(
      '/api/ZoomCar/GetBookingById?id=' + X
    );
  }

  createNewBooking(X: any) {
    return this.http.post<APIResposnemodel>('/api/ZoomCar/createNewBooking', X);
  }

  updateBooking(X: any) {
    return this.http.put<APIResposnemodel>('/api/ZoomCar/updateBooking', X);
  }

  deleteBookingById(X: number) {
    return this.http.get<APIResposnemodel>(
      '/api/ZoomCar/DeleteBookingById?id=' + X
    );
  }
}
