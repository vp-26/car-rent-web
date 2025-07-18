import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/user.service';
import { Constant } from 'src/app/shared/constants/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  userservice = inject(UserService);
  Role: any[] = [];
  isAdminEmail: boolean = false;

  loginForm = this.formbuilder.group({
    userId: [0],
    name: ['', Validators.required],
    userRole: ['', Validators.required],
    emailId: ['', [Validators.required, Validators.email]],
    mobileNo: ['', Validators.required],
    password: ['', Validators.required],
    createdOn: [new Date().toISOString()],
  });

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.Role = [
      { label: 'CarOwner', value: 'CarOwner' },
      { label: 'Customer', value: 'Customer' },
    ];

    this.loginForm.get('emailId')?.valueChanges.subscribe((email) => {
      if (email?.toLowerCase().startsWith('admin@')) {
        this.loginForm.get('userRole')?.setValue('Admin');
        this.isAdminEmail = true;
      } else {
        if (this.isAdminEmail) {
          this.loginForm.get('userRole')?.setValue('');
        }
        this.isAdminEmail = false;
      }
    });
  }

  login(X: any) {
    debugger;
    console.log(X);
    const UserName = this.loginForm.value.name;
    const UserRole = this.loginForm.value.userRole;
    const UserPassword = this.loginForm.value.password;

    this.userservice.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res.result) {
          localStorage.setItem(Constant.LOCAL_KEY, JSON.stringify(res.data));
          localStorage.setItem(Constant.LOGIN, 'true');
          this.router.navigate(['layout']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message || 'Invalid login credentials',
          });
          localStorage.setItem(Constant.LOGIN, 'false');
        }
      },

      error: (err) => {
        this.router.navigate(['/not-found']);
        localStorage.setItem(Constant.LOGIN, 'false');
      },
    });
  }
}
