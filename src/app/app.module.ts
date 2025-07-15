import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CarListComponent } from './pages/cars/car-list/car-list.component';
import { CarDetailComponent } from './pages/cars/car-detail/car-detail.component';
import { CarFormComponent } from './pages/cars/car-form/car-form.component';
import { BookingListComponent } from './pages/booking/booking-list/booking-list.component';
import { MyBookingsComponent } from './pages/booking/my-bookings/my-bookings.component';
import { BookingFormComponent } from './pages/booking/booking-form/booking-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserProfileComponent } from './pages/users/user-profile/user-profile.component';
import { LocationFormComponent } from './pages/location-form/location-form.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ServiceComponent } from './pages/service/service.component';
import { SearchComponent } from './pages/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CarListComponent,
    CarDetailComponent,
    CarFormComponent,
    BookingListComponent,
    MyBookingsComponent,
    BookingFormComponent,
    UserListComponent,
    UserProfileComponent,
    LocationFormComponent,
    AboutUsComponent,
    ContactUsComponent,
    ServiceComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
