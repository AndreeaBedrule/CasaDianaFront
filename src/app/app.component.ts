import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CasaDianaAngular';
  /* constructor(private router: Router, private eventEmitterService: EventEmitterService){
    router.events.subscribe((event: RouterEvent)=>{
      if (event instanceof NavigationEnd) {
        eventEmitterService.getEmitter('onRouteChanged')?.emit(event.url);
      }
    })
  } */
 
}
