import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocationService } from 'src/app/core/services/location.service';
import { APIResposnemodel } from 'src/app/shared/models/api-response.model';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
})
export class LocationFormComponent {
  locationservice = inject(LocationService);
  AllLocation: any[] = [];
  visible: boolean = false;
  isEditMode: boolean = false;

  AddLocationForm = this.formbuilder.group({
    locations: this.formbuilder.array([this.createLocationGroup()]),
  });

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.GetAllLocation();
  }

  // Helper to create a FormGroup for a location entry
  createLocationGroup() {
    return this.formbuilder.group({
      locationId: [0],
      city: ['', Validators.required],
      title: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]], // added pincode validation pattern
    });
  }

  get locations() {
    return this.AddLocationForm.get('locations') as FormArray;
  }

  // Add new empty location form group dynamically
  addLocation() {
    this.locations.push(this.createLocationGroup());
  }

  // Remove a location form group by index
  removeLocation(index: number) {
    if (this.locations.length > 1) {
      this.locations.removeAt(index);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'At least one location must be present.',
      });
    }
  }

  GetAllLocation() {
    this.locationservice.getAllLocations().subscribe((res: APIResposnemodel) => {
      this.AllLocation = res.data;
    });
  }

  Submit() {
    if (this.AddLocationForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields correctly.',
      });
      return;
    }

    const locations = this.AddLocationForm.value.locations;

    this.locationservice.addBulkLocations(locations).subscribe((res: APIResposnemodel) => {
      if (res.result) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
        this.GetAllLocation();
        this.visible = false; // close dialog on success if using dialog
        this.locations.clear();
        this.locations.push(this.createLocationGroup());
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
    });
  }

  Delete(locationId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this data?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-secondary p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.locationservice.deleteLocationById(locationId).subscribe(
          (res: APIResposnemodel) => {
            if (res.result) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: res.message,
              });
              this.GetAllLocation();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: res.message,
              });
            }
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Deletion cancelled by user',
        });
      },
    });
  }

  showDialog() {
    this.visible = true;
  }
}
