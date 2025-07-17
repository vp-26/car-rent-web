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

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { SplitterModule } from 'primeng/splitter';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AvatarModule } from 'primeng/avatar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { TabViewModule } from 'primeng/tabview';
import { ProgressBarModule } from 'primeng/progressbar';
import { SidebarModule } from 'primeng/sidebar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { AccordionModule } from 'primeng/accordion';
import { SliderModule } from 'primeng/slider';
import { CarouselModule } from 'primeng/carousel';
import { ScrollTopModule } from 'primeng/scrolltop';

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
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    NgxMaskDirective,
    PasswordModule,
    FloatLabelModule,
    DropdownModule,
    MenubarModule,
    SplitterModule,
    SkeletonModule,
    TagModule,
    DataViewModule,
    InputTextModule,
    DropdownModule,
    FloatLabelModule,
    CalendarModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    MenuModule,
    InputTextareaModule,
    NgxMaskDirective,
    AvatarModule,
    AvatarGroupModule,
    DynamicDialogModule,
    TabViewModule,
    ProgressBarModule,
    SidebarModule,
    ProgressSpinnerModule,
    DividerModule,
    SelectButtonModule,
    FileUploadModule,
    TableModule,
    CheckboxModule,
    ChipModule,
    AccordionModule,
    SliderModule,
    CarouselModule,
    ScrollTopModule,
  ],
  providers: [
    ConfirmationService,
    MessageService,
    DialogService,
    provideNgxMask(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
