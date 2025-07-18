import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { APIResposnemodel } from 'src/app/shared/models/api-response.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  userservice = inject(UserService);
  Users: any[] = [];
  isLoading = true;

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.GetAllUsers();
      this.isLoading = false;
    }, 2000);
  }

  GetAllUsers() {
    this.userservice.getAllUsers().subscribe({
      next: (res: APIResposnemodel) => {
        this.Users = res.data.filter(
          (x: any) => x.userRole === 'CarOwner' || x.userRole === 'Customer'
        );
        console.log(res.data);
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.router.navigate(['/not-found']);
      },
    });
  }

  getSeverity(
    status: string
  ):
    | 'success'
    | 'secondary'
    | 'info'
    | 'warning'
    | 'danger'
    | 'contrast'
    | undefined {
    switch (status) {
      case 'CarOwner':
        return 'contrast';
      case 'Customer':
        return 'warning';
      default:
        return 'danger';
    }
  }
}
