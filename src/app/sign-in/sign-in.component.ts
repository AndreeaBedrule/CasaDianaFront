import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitterService } from '../services/event-emitter.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  form = this.formBuilder.group({
    email: '',
    password: '',
  });

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventEmitterService: EventEmitterService,
  ) {
  }

  ngOnInit(): void {
    if (this.sessionService.activeSession())
      this.toHome();
  }

  submit(): void {
    if (!this.form.valid) {
      alert('Form is invalid');
      return;
    }
    this.sessionService.signIn(this.form.value.email, this.form.value.password).subscribe(
      response => {
        this.sessionService.saveToken(response);
        this.eventEmitterService.getEmitter('onLogin')?.emit();
        this.toHome(); 
      },
      error => {
        alert(error.message);
        this.form.reset();
        
      });
    } 
  
  toHome(): void {
    this.router.navigate(['/home']).then(() => {
      this.form.reset();
    });
  }
}



