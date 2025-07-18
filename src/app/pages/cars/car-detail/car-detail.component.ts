import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CarService } from 'src/app/core/services/car.service';
import { LocationService } from 'src/app/core/services/location.service';
import { APIResposnemodel } from 'src/app/shared/models/api-response.model';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
})
export class CarDetailComponent {
  carservice = inject(CarService);
  locationservice = inject(LocationService);
  isLoading: boolean = true;
  Location: any[] = [];
  carList: any[] = [];
  locationId: any;
  panelSizes = [20, 80];

  CarsForm = this.formbuilder.group({
    location: ['', Validators.required],
  });

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.AllLocation();
    this.AllCars();
  }

  ngAfterViewInit() {
    this.panelSizes = [20, 80];
  }

  AllCars() {
    this.isLoading = true;
    this.carservice.getAllCars().subscribe({
      next: (res: APIResposnemodel) => {
        this.carList = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load all cars:', err);
        this.router.navigate(['/not-found']);
      },
    });
  }

  Search() {
    this.locationId = this.CarsForm.get('location')?.value;
    if (!this.locationId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select a location',
      });
      return;
    }

    this.isLoading = true;
    this.carservice.getAllCarsByLocation(this.locationId).subscribe({
      next: (res: APIResposnemodel) => {
        this.carList = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load cars by location:', err);
        this.router.navigate(['/not-found']);
      },
    });
  }

  AllLocation() {
    this.locationservice.getAllLocations().subscribe({
      next: (res: APIResposnemodel) => {
        this.Location = res.data;
      },
      error: (err) => {
        console.error('Failed to load locations:', err);
        this.router.navigate(['/not-found']);
      },
    });
  }

  View(carId: number) {
    this.router.navigate(['/layout/booking', carId]);
  }
}
