import { SessionService } from '../services/session.service';
import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../services/event-emitter.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  isLoggedIn = false;

  constructor(
    private sessionService: SessionService, 
    private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
    this.isLoggedIn = this.sessionService.activeSession();

    this.eventEmitterService.getEmitter('onLogin')?.subscribe(
      () => this.isLoggedIn = this.sessionService.activeSession()
    );

    this.eventEmitterService.getEmitter('onLogout')?.subscribe(
      () => this.isLoggedIn = false
    );
  }
}
