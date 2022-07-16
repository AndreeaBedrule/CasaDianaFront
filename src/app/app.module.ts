import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { HttpClient, HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule} from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { MatTableModule} from '@angular/material/table'; 
import { NgImageSliderModule} from 'ng-image-slider';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { AddRservationComponent } from './add-rservation/add-rservation.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { AdminReservationComponent } from './admin-reservation/admin-reservation.component';
import { AuthenticationGuard } from './authentication-guard/authentication-guard';
import { RoleAuthGuard } from './authentication-guard/role-authentication-guard';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NetworkInterceptor } from './http-interceptors/network-interceptor';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    RegisterComponent,
    NavbarComponent,
    LayoutComponent,
    SignInComponent,
    HomeComponent,
    AddRservationComponent,
    AdminReservationComponent,
    UserDetailComponent,
    AboutComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    NgImageSliderModule,
    MdbCarouselModule,
    BrowserAnimationsModule,
    MatTableModule,
    NgbModule,
    MatIconModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  providers: [
    HttpClient,
    DatePipe,
    AuthenticationGuard,
    RoleAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
