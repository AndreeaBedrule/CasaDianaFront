import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRservationComponent } from './add-rservation/add-rservation.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: SignInComponent
  },

  {
    path: 'admin-rooms',
    component: RoomsComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },
  
  {
    path: 'add-reservation',
    component: AddRservationComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
