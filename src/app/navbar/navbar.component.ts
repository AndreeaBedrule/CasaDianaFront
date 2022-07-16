import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../services/event-emitter.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name="";
  isLoggedIn: boolean = false;
  title = "Casa Diana";

  constructor(
    private eventEmitterService: EventEmitterService,
    private sessionService: SessionService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.sessionService.activeSession();
    
    this.eventEmitterService.getEmitter('onLogin')?.subscribe(
      () => { 
        this.isLoggedIn = this.sessionService.activeSession();
      }
    );
   
    
  }

  logout() {
    this.isLoggedIn = false;
    this.eventEmitterService.getEmitter('onLogout')?.emit()
    this.sessionService.logout();
  }
  isRoleUser() {
    return this.sessionService.getLoggedUserRole() === 'User';
  }

}
