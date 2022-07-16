import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IReservation } from '../models/reservation';
import { IUser } from '../models/user';
import { AdminRoomService } from '../services/admin-room.service';
import { ReservationService } from '../services/reservation/reservation.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  
  
  currentDate = new Date();
  showReservations: IReservation[] = [] as IReservation[];
  displayedColumns: string[] = ['numarCamera', 'checkIn', 'checkOut', 'price' ,'status', 'canceled'];
  showModal: boolean = false;
  

  constructor(
    private reservationService: ReservationService,
    private sessionService: SessionService,
    
  ) { }
 
  
  ngOnInit(): void {
    
    this.getAllUsersReservations()
  }

  getAllUsersReservations()
  {
    this.reservationService.getAllUserReservation(
      this.sessionService.getToken()!,
      this.sessionService.getLoggedUserId()!
      ).subscribe(
      showReservations => {
        this.showReservations= showReservations
      }
    );
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString('ro-RO');
  }


  cancelReservation(reservation: IReservation): void {

    if (confirm('Are you sure you want cancel this reservation?')) {
  
      let reservationToCancel = {
        id: reservation.id,
        userId: reservation.userId,
        roomId: reservation.roomId,
        checkIn: reservation.checkIn,
        checkOut: reservation.checkOut,
        totalPrice: reservation.totalPrice,
        canceled: !reservation.canceled,
      } as IReservation;
     
      this.reservationService.cancelReservation(this.sessionService.getToken()!, reservationToCancel).subscribe(
        reservation => {
          const roomIndex = this.showReservations.findIndex(x => x.id == reservation.id );
          this.showReservations[roomIndex] = reservation;
          this.showReservations = this.showReservations.concat([]);
            
        }
      );
    }
  }

  dezactivate(checkIn: string) {
    const checkInNew = new Date(checkIn);
    if(this.currentDate > checkInNew)
      return true;
    return;
  }

  removeUser(reservation: IReservation): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.reservationService.removeUser(reservation.userId, this.sessionService.getToken()!).subscribe(
        response => this.showReservations = this.showReservations.filter(x => x != reservation),
      );
    }
  } 

  cancelModal(): void {
    if (this.showModal) {
      this.showModal = false;
    }
   }

}
  

