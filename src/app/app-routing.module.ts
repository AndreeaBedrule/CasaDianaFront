import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddRservationComponent } from './add-rservation/add-rservation.component';
import { AdminReservationComponent } from './admin-reservation/admin-reservation.component';
import { AuthenticationGuard } from './authentication-guard/authentication-guard';
import { RoleAuthGuard } from './authentication-guard/role-authentication-guard';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'login',
    component: SignInComponent,
    canActivate: [AuthenticationGuard]
  },

  {
    path: 'admin-rooms',
    component: RoomsComponent,
    canActivate: [RoleAuthGuard],
    data: { roles: ['Administrator'] }
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [RoleAuthGuard],
    data: { roles: ['Administrator', 'User'] }
  },
  
  {
    path: 'admin-reservations',
    component: AdminReservationComponent,
    canActivate: [RoleAuthGuard],
    data: { roles: ['Administrator'] }
  },

  {
    path: 'user-detail',
    component: UserDetailComponent,
    canActivate: [RoleAuthGuard],
    data: { roles: ['User'] }
  },

  {
    path: 'about',
    component: AboutComponent,
    
    
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
