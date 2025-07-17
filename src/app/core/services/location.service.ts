import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResposnemodel } from 'src/app/shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) { }
  
  getAllLocations(){
    return this.http.get<APIResposnemodel>('/api/ZoomCar/GetAllLocations');
  }

  addBulkLocations(X:any){
    return this.http.post<APIResposnemodel>('/api/ZoomCar/AddBulkLocations' ,X)
  }

  deleteLocationById(X:number){
    return this.http.get<APIResposnemodel>('/api/ZoomCar/DeleteLocationById?id=' + X);
  }
}
