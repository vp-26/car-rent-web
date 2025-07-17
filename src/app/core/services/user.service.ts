import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResposnemodel } from 'src/app/shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<APIResposnemodel>('/api/ZoomCar/GetAllUsers');
  }

  getUserByUserId(X: number) {
    return this.http.get<APIResposnemodel>(
      '/api/ZoomCar/GetUserByUserId?userId=' + X
    );
  }

  login(X: any) {
    return this.http.post<APIResposnemodel>('/api/ZoomCar/Login', X);
  }

  addNewUser(X: any) {
    return this.http.post<APIResposnemodel>('/api/ZoomCar/AddNewUser', X);
  }

  updateUser(X: any) {
    return this.http.put<APIResposnemodel>('/api/ZoomCar/UpdateUser', X);
  }

  deleteUserByUserId(X: number) {
    return this.http.delete<APIResposnemodel>(
      '/api/ZoomCar/DeleteUserByUserId?userId=' + X
    );
  }
}
