import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IReservation } from '../models/reservation';
import { AdminRoomService } from '../services/admin-room.service';
import { ReservationService } from '../services/reservation/reservation.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-add-rservation',
  templateUrl: './add-rservation.component.html',
  styleUrls: ['./add-rservation.component.css']
})
export class AddRservationComponent implements OnInit {
  showModal: boolean = false;
  booked: IReservation[] = [] as IReservation[];
  mode = 'Book'

  reservationId:number | undefined;
  roomId: number | undefined;
  userId: number | undefined;
  checkIn: FormControl = new FormControl;
  checkOut: FormControl = new  FormControl;

  start: FormControl = new FormControl();
  end: FormControl = new FormControl();

  newStart = new Date(this.start.value).toLocaleDateString('en-EN').split('/').join('.')
  newEnd = new Date(this.end.value).toLocaleDateString('en-EN').split('/').join('.')
  range = new FormGroup({
    start: this.start,
    end: this.end,
  });



  constructor(

    private sessionService: SessionService,
    private reservation: ReservationService,
    private adminRoomService: AdminRoomService

  ){}

  ngOnInit(): void {
  }
  
  submit(): void {

    const reservation: IReservation = {
      roomId: this.roomId,
      reservationId: this.reservationId,
      userId: this.userId,
      checkIn:this.newStart,
      checkOut: this.newEnd,


    } as IReservation

    if (this.mode === 'Book') {
      this.addReservations(reservation);
    }  else {
      //this.editRoom(room);
    } 
  }

  private addReservations(reservation: IReservation): void{
    this.reservation.addReservation(reservation, this.sessionService.getToken()!).subscribe(
      reservation => {
       this.booked = this.booked.concat([reservation]);
       this.cancelModal();
      }
    )
 

}
cancelModal(): void {
 if (this.showModal) {
   this.showModal = false;
 }
}

openAddReservation(): void {
  this.mode = 'Book';
  this.openModal();
}
openModal(): void {
  this.showModal = true;
}




}
