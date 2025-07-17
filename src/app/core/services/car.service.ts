import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResposnemodel } from 'src/app/shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

constructor(private http: HttpClient) { }

  getAllCars(){
    return this.http.get<APIResposnemodel>('/api/ZoomCar/GetAllCars');
  }

  getAllCarsByOwnerId(X:number){
    return this.http.get<APIResposnemodel>('/api/ZoomCar/GetAllCarsByOwnerId?id=' + X);
  }

  getAllCarsByLocation(X:number){
    return this.http.get<APIResposnemodel>('/api/ZoomCar/GetAllCarsByLocation?id=' + X);
  }

  searchCarByLocation(X:number){
    return this.http.get<APIResposnemodel>('/api/ZoomCar/searchCarByLocation?id=' + X);
  }

  getCarById(X:number){
    return this.http.get<APIResposnemodel>('/api/ZoomCar/GetCarById?id=' + X);
  }

  addNewCar(X :any){
    return this.http.post<APIResposnemodel>('/api/ZoomCar/addNewCar' ,X);
  }

  updateCar(X :any){
    return this.http.put<APIResposnemodel>('/api/ZoomCar/UpdateCar' ,X);
  }

  deleteCarById(X:number){
    return this.http.get<APIResposnemodel>('/api/ZoomCar/DeleteCarById?id=' + X);
  }

}
