import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/core/services/car.service';
import { APIResposnemodel } from 'src/app/shared/models/api-response.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  currentLocationId: number = 0;
  SearchCar: any[] = [];
  Location: any[] = [];
  carservice = inject(CarService);
  isLoading: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.currentLocationId = +params.Id; // Ensure number
      this.loadCarsByLocation();
    });
  }

  loadCarsByLocation() {
    this.isLoading = true;
    this.carservice.getAllCarsByLocation(this.currentLocationId).subscribe({
      next: (res: APIResposnemodel) => {
        this.SearchCar = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        // Handle error (optional)
      },
    });
  }

  View(carId: number) {
    this.router.navigate(['/layout/booking', carId]);
  }
}
