import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CarService } from 'src/app/core/services/car.service';
import { LocationService } from 'src/app/core/services/location.service';
import { APIResposnemodel } from 'src/app/shared/models/api-response.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  Location: any[] = [];
  carList: any[] = [];
  responsiveOptions: any[] | undefined;

  carService = inject(CarService);
  locationService = inject(LocationService);

  CarsForm = this.formbuilder.group({
    location: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.AllCars();
    this.AllLocation();
  }

  AllCars() {
    const allowedIds = [
      1299, 1291, 1290, 1287, 1278, 249, 248, 234, 232, 231, 212, 201, 192, 189,
      188,
    ];

    this.carService.getAllCars().subscribe((res: APIResposnemodel) => {
      this.carList = res.data.filter((X: any) => allowedIds.includes(X.carId));
      console.log(this.carList);
    });
  }

  Search() {
    const locationId = this.CarsForm.get('location')?.value;
    if (locationId) {
      this.router.navigate(['/layout/search', locationId]);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select a location',
      });
    }
  }

  AllLocation() {
    this.locationService.getAllLocations().subscribe((res: APIResposnemodel) => {
      this.Location = res.data;
    });
  }

  book() {
    this.router.navigate(['layout/car']);
  }
}
