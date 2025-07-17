import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { CarDetailComponent } from './pages/cars/car-detail/car-detail.component';
import { CarFormComponent } from './pages/cars/car-form/car-form.component';
import { CarListComponent } from './pages/cars/car-list/car-list.component';
import { MyBookingsComponent } from './pages/booking/my-bookings/my-bookings.component';
import { BookingListComponent } from './pages/booking/booking-list/booking-list.component';
import { LocationFormComponent } from './pages/location-form/location-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserProfileComponent } from './pages/users/user-profile/user-profile.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ServiceComponent } from './pages/service/service.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'layout',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'car-detail',
        component: CarDetailComponent,
      },
      {
        path: 'car-form',
        component: CarFormComponent,
      },
      {
        path: 'car-list',
        component: CarListComponent,
      },
      {
        path: 'booking/:carId',
        component: BookingListComponent,
      },
      {
        path: 'mybooking',
        component: MyBookingsComponent,
      },
      {
        path: 'mybooking/:customerid',
        component: MyBookingsComponent,
      },
      {
        path: 'location-form',
        component: LocationFormComponent,
      },
      {
        path: 'user-list',
        component: UserListComponent,
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
      {
        path: 'service',
        component: ServiceComponent,
      },
      {
        path: 'search/:Id',
        component: SearchComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'register/:id',
    component: RegisterComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
