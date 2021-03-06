import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { IReservation } from '../models/reservation';
import { IRoom } from '../models/room';
import { AdminRoomService } from '../services/admin-room.service';
import { ReservationService } from '../services/reservation/reservation.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  showRooms: IRoom[] = [] as IRoom[];
  showAvailableRooms: IRoom[] = [] as IRoom[];

  userHasSelectedPeriod: boolean = false;

  start: FormControl = new FormControl();
  end: FormControl = new FormControl();
  minDate: Date | any;
  
  range = new FormGroup({
    start: this.start,
    end: this.end,
    
  });

  constructor(
    private adminRoomService: AdminRoomService,
    private sessionService: SessionService,
    private reservation: ReservationService,

  ){}
  
  ngOnInit(): void {
    this.minDate = new Date();
    this.getRooms()
  }
  onSlideChange(): void {
    console.log('slide change');
  }

  getRooms()
  {
    this.adminRoomService.getAllRooms(this.sessionService.getToken()!).subscribe(
      showRooms => {
        this.showRooms = showRooms
        console.log(this.sessionService.activeSession())
      }
    );
  }


  getAvailableRooms()
  {
    this.adminRoomService.getAvailableRooms(
      this.sessionService.getToken()!,
      new Date(this.start.value).toLocaleDateString('en-EN').split('/').join('.'),
      new Date(this.end.value).toLocaleDateString('en-EN').split('/').join('.'))
      .subscribe(
        showAvailableRooms => {
          this.showRooms = showAvailableRooms;
          this.userHasSelectedPeriod = true;
        }
    )
  } 

  onChangeEvent(event:any){
    if (this.start.value && this.end.value) {
      this.getAvailableRooms();
    }
  }

  isRoleUser() {
    return this.sessionService.getLoggedUserRole() === 'User';
  }

  showModal: boolean = false;
  booked: IReservation[] = [] as IReservation[];
  mode = 'Book'

  reservationId: number | undefined;
  roomId: number | undefined;
  userId: number | undefined;
  checkIn: FormControl = new FormControl;
  checkOut: FormControl = new  FormControl;

  selectedRoom: IRoom | undefined;


  submit(): void {
    const reservation: IReservation = {
      roomId: this.selectedRoom!.id,
      userId: this.sessionService.getLoggedUserId()!,
      checkIn: this.formatReservationDate(new Date(this.start.value)),
      checkOut: this.formatReservationDate(new Date(this.end.value)),
      canceled: false,
    } as IReservation

    if (this.mode === 'Book') {
      this.addReservations(reservation);
    }  else {
    } 
  }

  private addReservations(reservation: IReservation): void{
    
    this.reservation.addReservation(reservation, this.sessionService.getToken()!).subscribe(
      reservation => {
       this.booked = this.booked.concat([reservation]);
       this.cancelModal();
       this.getAvailableRooms();
      }
    ) 
}

cancelModal(): void {
 if (this.showModal) {
   this.showModal = false;
 }
}

openAddReservation(room: IRoom): void {
  this.mode = 'Book';
  this.selectedRoom = room;
  this.openModal();
}
openModal(): void {
  this.showModal = true;
}

private formatReservationDate(date: Date): string {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000 + 1000 * 60 * 60 * 21).toISOString()
}




 
}
