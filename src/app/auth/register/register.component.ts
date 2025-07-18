import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/user.service';
import { Constant } from 'src/app/shared/constants/constant';
import { APIResposnemodel } from 'src/app/shared/models/api-response.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  userservice = inject(UserService);
  isEditMode: boolean = false;
  Role: any[] = [];
  UserByUserId: string = '';
  UserData: number = 0;
  isAdminEmail: boolean = false;
  Id: number = 0;

  registerForm = this.formbuilder.group({
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
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    // const userInfo = localStorage.getItem(Constant.LOCAL_KEY);
    // if (userInfo) {
    //   const parsed = JSON.parse(userInfo);
    //   this.UserData = parsed.userId;
    // }
  }

  ngOnInit() {
    this.Role = [
      { label: 'CarOwner', value: 'CarOwner' },
      { label: 'Customer', value: 'Customer' },
    ];
    this.registerForm.get('emailId')?.valueChanges.subscribe((email) => {
      if (email?.toLowerCase().startsWith('admin@')) {
        this.registerForm.get('userRole')?.setValue('Admin');
        this.isAdminEmail = true;
      } else {
        if (this.isAdminEmail) {
          this.registerForm.get('userRole')?.setValue('');
        }
        this.isAdminEmail = false;
      }
    });

    this.activatedRoute.params.subscribe((X: any) => {
      this.Id = X.id;
    });
    this.GetUserByUserId(this.Id);
  }

  submit(X: any) {
    console.log(X);
    this.userservice.addNewUser(this.registerForm.value).subscribe({
      next: (res: APIResposnemodel) => {
        if (res.result) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registration Success',
          });
          this.router.navigate(['/login']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
        }
      },
      error: (err) => {
        this.router.navigate(['/not-found']);
      },
    });
  }

  update() {
    this.userservice.updateUser(this.registerForm.value).subscribe({
      next: (res: APIResposnemodel) => {
        if (res.result) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User Updated Successfully',
          });
          localStorage.removeItem(Constant.LOCAL_KEY);
          this.router.navigate(['/login']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
        }
      },
      error: (err) => {
        this.router.navigate(['/not-found']);
      },
    });
  }

  GetUserByUserId(Id: number) {
    this.userservice.getUserByUserId(Id).subscribe({
      next: (res: APIResposnemodel) => {
        this.registerForm.patchValue(res.data);
        this.isEditMode = true;
      },
      error: (err) => {
        this.router.navigate(['/not-found']);
      },
    });
  }
}
