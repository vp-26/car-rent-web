import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UserService } from 'src/app/core/services/user.service';
import { Constant } from 'src/app/shared/constants/constant';
import { APIResposnemodel } from 'src/app/shared/models/api-response.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
  userservice = inject(UserService);
  userData: any;
  userId: number = 0;
  isLoading: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    public dialogService: DialogService
  ) {
    const userInfo = localStorage.getItem(Constant.LOCAL_KEY);
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      this.userId = parsed.userId;
      this.userData = parsed;
    }
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    if (!this.userId) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'User ID not found',
      });
      return;
    }

    this.isLoading = true;
    this.userservice.getUserByUserId(this.userId).subscribe({
      next: (res: APIResposnemodel) => {
        this.isLoading = false;
        if (res.result && res.data) {
          this.userData = res.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message || 'Failed to load user data',
          });
        }
      },
      error: () => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'API error while fetching user data',
        });
      },
    });
  }

  Update() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to update your data?',
      header: 'Update User',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.router.navigate(['/register', this.userId]);
      },
      reject: () => {
        this.router.navigate(['/layout']);
      },
    });
  }

  Delete(userId: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this profile permanently?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.userservice.deleteUserByUserId(userId).subscribe({
          next: (res: APIResposnemodel) => {
            if (res.result) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Profile deleted successfully',
              });
              localStorage.removeItem(Constant.LOCAL_KEY);
              localStorage.removeItem(Constant.LOGIN);
              this.router.navigate(['/login']);
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
              detail: 'API error during profile deletion',
            });
          },
        });
      },
      reject: () => {
        this.router.navigate(['layout/profile']);
      },
    });
  }
}
