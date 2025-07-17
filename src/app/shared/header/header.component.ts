import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Constant } from '../constants/constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
option: MenuItem[] | undefined;
  sidebarVisible: boolean = false;
  showProfile = false;
  userData: any;
  userId: number = 0;
  loggedUserMenuList: any[] = [];
  menuList: any = {
    Customer: [
      {
        label: 'Home',
        routerLink: ['home'],
      },
      {
        label: 'Car',
        routerLink: ['car'],
      },
      {
        label: 'Service',
        routerLink: ['service'],
      },
      {
        label: 'About us',
        routerLink: ['aboutus'],
      },
      {
        label: 'Contact us',
        routerLink: ['contactus'],
      },
    ],

    CarOwner: [
      {
        label: 'Home',
        routerLink: ['home'],
      },
      {
        label: 'Car',
        routerLink: ['car'],
      },
      {
        label: 'Add Car',
        routerLink: ['addcar'],
      },
      {
        label: 'Service',
        routerLink: ['service'],
      },
      {
        label: 'About us',
        routerLink: ['aboutus'],
      },
      {
        label: 'Contact us',
        routerLink: ['contactus'],
      },
    ],

    Admin: [
      {
        label: 'Home',
        routerLink: ['home'],
      },
      {
        label: 'Car',
        routerLink: ['car'],
      },
      {
        label: 'Add Car',
        routerLink: ['addcar'],
      },
      {
        label: 'All Car',
        routerLink: ['allcars'],
      },
      {
        label: 'Add Location',
        routerLink: ['addlocation'],
      },
      {
        label: 'Users',
        routerLink: ['allusers'],
      },
      {
        label: 'Service',
        routerLink: ['service'],
      },
      {
        label: 'About us',
        routerLink: ['aboutus'],
      },
      {
        label: 'Contact us',
        routerLink: ['contactus'],
      },
    ],
  };

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    const userInfo = localStorage.getItem(Constant.LOCAL_KEY);
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      console.log('userRole', parsed.userRole);
      this.loggedUserMenuList = this.menuList[parsed.userRole];
      this.userId = parsed.userId;
      this.userData = parsed;
    }
  }

  ngOnInit() {
    this.option = [
      {
        label: 'My Booking',
        icon: 'pi pi-heart',
        command: () => {
          this.router.navigate(['layout/mybooking', this.userId]);
        },
      },
      {
        label: 'Profile',
        icon: 'pi pi-user',
        // command: () => this.confirm1(event),
        command: () => {
          this.router.navigate(['layout/profile']);
        },
      },
      {
        label: 'Log Out',
        icon: 'pi pi-sign-out',
        command: () => this.confirm2(event),
      },
    ];
  }

  confirm1(e: any) {
    this.confirmationService.confirm({
      target: e.target as EventTarget,
      message: 'Are you sure you want to update your data ?',
      header: 'Update User',
      icon: 'pi pi-exclamation-triangle text-warning',
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
    this.sidebarVisible = false;
  }

  confirm2(e: any) {
    this.confirmationService.confirm({
      target: e.target as EventTarget,
      message: 'Are you sure that you want to log out ?',
      header: 'Log out Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Log out',
        });
        localStorage.removeItem(Constant.LOCAL_KEY);
        localStorage.removeItem(Constant.LOGIN);
        this.router.navigate(['/login']);
      },
      reject: () => {
        this.router.navigate(['/layout']);
      },
    });
    this.sidebarVisible = false;
  }
}
