import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    Validators.required,
    Validators.pattern(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
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
  ) {}

  ngOnInit() {}

  createAccount(): void {
    if(!this.createAccountForm.valid){
      alert('Fields are invalid!');
      return;
    }

    if(this.password.value !== this.confirmPassword.value)
    {
      alert('Passords do not match!');
      return;
    }
    if(this.createAccountForm.valid){
      this.userService.createAccount(this.firstName.value, this.lastName.value, this.email.value, this.phoneNumber.value, this.password.value).subscribe(
        response => {
          this.createAccountForm.reset();
          alert('Registration succesfully completed!');
        } ,
        error => {
          alert(console.log(error));
        }
        
      );
    }
  }

}



