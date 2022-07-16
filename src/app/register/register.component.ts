import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';
import { IUser } from '../models/user';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  email: FormControl = new FormControl('', [
    Validators.required
  ]);
  password: FormControl = new FormControl('', [Validators.required]);
  confirmPassword: FormControl = new FormControl('', [Validators.required]);
  firstName: FormControl = new FormControl('', [Validators.required]);
  lastName: FormControl = new FormControl('', [Validators.required]);
  phoneNumber: FormControl = new FormControl('', [Validators.required]);

  createAccountForm: FormGroup = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    phoneNumber: this.phoneNumber,
    password: this.password,
    confirmPassword: this.confirmPassword
  });
  showModal = false;

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {}

  createAccount(): void {
    if (this.password.value !== this.confirmPassword.value) {
      this.snackbar.open("Parolele trebuie sa fie aceleasi", '', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      
      return;
    }

    if(this.createAccountForm.valid){
      this.userService.createAccount(this.firstName.value, this.lastName.value, this.email.value, this.phoneNumber.value, this.password.value).subscribe(
        response => {
          this.createAccountForm.reset();
          //alert('Registration succesfully completed!');
          this.router.navigate(["/login"])
        } ,
        
      );
    }
  }

}



