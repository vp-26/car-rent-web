import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CarService } from 'src/app/core/services/car.service';
import { APIResposnemodel } from 'src/app/shared/models/api-response.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html'
})
export class CarListComponent {
 carservice = inject(CarService);
  carList: any[] = [];
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.AllCars();
  }

  AllCars() {
    this.carservice.getAllCars().subscribe({
      next: (res: APIResposnemodel) => {
        this.carList = res.data;
        this.isLoading = false;
        console.log(this.carList);
      },
      error: (err) => {
        console.error('Failed to load cars:', err);
        this.router.navigate(['/not-found']);
      },
    });
  }

  Delete(X: number) {
    console.log(X);
    this.confirmationService.confirm({
      message: 'Do you want to remove your booking?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.carservice.deleteCarById(X).subscribe({
          next: (res: APIResposnemodel) => {
            if (res.result) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Booking removed successfully',
              });
              this.AllCars();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: res.message,
              });
            }
          },
          error: (err) => {
            console.error('Failed to delete car:', err);
            this.router.navigate(['/not-found']);
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancelled',
          detail: 'Delete cancelled',
        });
      },
    });
  }
}
