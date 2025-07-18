import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CarService } from 'src/app/core/services/car.service';
import { LocationService } from 'src/app/core/services/location.service';
import { Constant } from 'src/app/shared/constants/constant';
import { APIResposnemodel } from 'src/app/shared/models/api-response.model';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
})
export class CarFormComponent {
  carservice = inject(CarService);
  locationservice = inject(LocationService);
  Location: any[] = [];
  OwnerCarList: any[] = [];
  OwnerId: number | null = null;
  visible: boolean = false;
  chooseLabel: string = 'Choose Image';
  isEditMode: boolean = false;
  mode: 'create' | 'update' = 'create';

  AddCarForm = this.formbuilder.group({
    carId: [0],
    brand: ['', Validators.required],
    name: ['', Validators.required],
    pricingDescription: ['', Validators.required],
    pricing: ['', Validators.required],
    locationId: ['', Validators.required],
    registeredOn: [new Date().toISOString()],
    imageUrl: ['', Validators.required],
    vehicleNo: ['', Validators.required],
    ownerUserId: [0],
    zoomCarAccessoriess: this.formbuilder.array([this.createAccessoryGroup()]),
  });

  constructor(
    private formbuilder: FormBuilder,
    private messageService: MessageService,
    public dialogService: DialogService
  ) {
    const userInfo = localStorage.getItem(Constant.LOCAL_KEY);
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      this.OwnerId = parsed.userId;
    }

    this.AddCarForm.patchValue({
      ownerUserId: this.OwnerId,
    });
  }

  ngOnInit() {
    this.loadAllLocations();
    this.loadOwnerCars();
  }

  get submitButtonLabel() {
    return this.mode === 'update' ? 'Update Car' : 'Add Car';
  }

  createAccessoryGroup() {
    return this.formbuilder.group({
      accessoriesId: [0],
      accessoriesTitle: ['', Validators.required],
      showOnWebsite: [true],
      carId: [0],
    });
  }

  ADDCAR() {
    if (this.mode === 'update') {
      this.carservice.updateCar(this.AddCarForm.value).subscribe({
        next: (res: APIResposnemodel) => {
          if (res.result) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Car updated successfully',
            });
            this.visible = false;
            this.loadOwnerCars();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Update failed',
          });
        },
      });
    } else {
      this.carservice.addNewCar(this.AddCarForm.value).subscribe({
        next: (res: APIResposnemodel) => {
          if (res.result) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Car added successfully',
            });
            this.visible = false;
            this.loadOwnerCars();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Creation failed',
          });
        },
      });
    }
  }

  setAccessoriesFormArray(accessories: any[]) {
    const accessoryFGs = accessories.map((accessory) =>
      this.formbuilder.group({
        accessoriesId: [accessory.accessoriesId],
        accessoriesTitle: [accessory.accessoriesTitle, Validators.required],
        showOnWebsite: [accessory.showOnWebsite],
        carId: [accessory.carId],
      })
    );

    const formArray = this.formbuilder.array(accessoryFGs);
    this.AddCarForm.setControl('zoomCarAccessoriess', formArray);
  }

  GetCarById(carId: number) {
    this.carservice.getCarById(carId).subscribe({
      next: (res: APIResposnemodel) => {
        this.AddCarForm.patchValue({
          carId: res.data.carId,
          brand: res.data.brand,
          name: res.data.name,
          pricingDescription: res.data.pricingDescription,
          pricing: res.data.pricing,
          locationId: res.data.locationId,
          registeredOn: res.data.registeredOn,
          imageUrl: res.data.imageUrl,
          vehicleNo: res.data.vehicleNo,
          ownerUserId: res.data.ownerUserId,
        });

        this.accessoriesList.clear();

        if (
          res.data.zoomCarAccessoriess &&
          res.data.zoomCarAccessoriess.length > 0
        ) {
          res.data.zoomCarAccessoriess.forEach((acc: any) => {
            this.accessoriesList.push(
              this.formbuilder.group({
                accessoriesId: [acc.accessoriesId],
                accessoriesTitle: [acc.accessoriesTitle, Validators.required],
                showOnWebsite: [acc.showOnWebsite],
                carId: [acc.carId],
              })
            );
          });
        } else {
          // If no accessories, initialize with one empty group
          this.addAccessories();
        }

        this.mode = 'update';
        this.visible = true;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load car details',
        });
      },
    });
  }

  showDialog() {
    this.visible = true;
  }

  loadOwnerCars() {
    if (!this.OwnerId) return;
    this.carservice.getAllCarsByOwnerId(this.OwnerId).subscribe({
      next: (res: APIResposnemodel) => {
        this.OwnerCarList = res.data;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load owner cars',
        });
      },
    });
  }

  loadAllLocations() {
    this.locationservice.getAllLocations().subscribe({
      next: (res: APIResposnemodel) => {
        this.Location = res.data;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load locations',
        });
      },
    });
  }

  get accessoriesList(): FormArray {
    return this.AddCarForm.get('zoomCarAccessoriess') as FormArray;
  }

  addAccessories(): void {
    this.accessoriesList.push(this.createAccessoryGroup());
  }

  removeAccessory(index: number): void {
    this.accessoriesList.removeAt(index);
  }

  FileUpload(event: any) {
    const file = event.files?.[0];
    if (file) {
      this.AddCarForm.patchValue({
        imageUrl: file.name,
      });
      this.chooseLabel = 'Selected';
    }
  }

  Delete(carId: number) {
    this.carservice.deleteCarById(carId).subscribe({
      next: (res: APIResposnemodel) => {
        if (res.result) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Car deleted successfully',
          });
          this.loadOwnerCars();
          this.visible = false;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Delete failed',
        });
      },
    });
  }

  Update(carId: number) {
    this.mode = 'update';
    this.GetCarById(carId);
    this.visible = true;
  }
}
