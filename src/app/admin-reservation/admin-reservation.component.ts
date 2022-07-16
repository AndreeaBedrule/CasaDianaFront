import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IReservation } from '../models/reservation';
import { IUser } from '../models/user';
import { AdminRoomService } from '../services/admin-room.service';
import { ReservationService } from '../services/reservation/reservation.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.css']
})
export class AdminReservationComponent implements OnInit {

  showReservations: IReservation[] = [] as IReservation[]; 
  showModal: boolean = false;
  showDeleteModal = false;
  isAddMode = true;
  reservationId: number | undefined;
  mode = 'Add';
  editId: number | undefined;
  editUserId:number | undefined;
  editRoomId: number | undefined;
  requiredMessage = 'This field is required.'
  curentReservations: IReservation = {} as IReservation;
  //roomNumber: number | any;
  phoneNumber: FormControl = new FormControl;
  //roomId: FormControl = new FormControl;
  roomNumber: FormControl = new FormControl;
  checkIn: FormControl = new FormControl;
  checkOut: FormControl = new FormControl;

  editTotalPrice: number | undefined;
 

  form: FormGroup = new FormGroup({
    phoneNumber: this.phoneNumber,
    checkIn: this.checkIn,
    checkOut: this.checkOut,
    roomNumber: this.roomNumber,

  });

  displayedColumns: string[] = ['phoneNumber', 'roomNumber','checkIn', 'checkOut', 'totalPrice', 'actions'];

  constructor(
    private reservation: ReservationService,
    private sessionService: SessionService
  ){}
  

  ngOnInit(): void{
        this.getReservations()
  }

  getReservations()
  {

    this.reservation.getAllReservations(this.sessionService.getToken()!,).subscribe(
     
      showReservations => {

        this.showReservations = showReservations
      }
    
    );
    
  }
  
  openModal(): void {
    this.showModal = true;
  }

  cancelModal(): void {
    if (this.showModal) {
      this.showModal = false;
    }
    this.form.reset();
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString('ro-RO');
   
  }


  removeReservation(reservation: IReservation): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.reservation.removeReservation(reservation.id!, this.sessionService.getToken()!).subscribe(
        response => this.showReservations = this.showReservations.filter(x => x != reservation),
      );
    }
  }
  
  submit(): void {
    if (!this.form.valid) {
      alert('Invalid form!');
    }

    const reservation: IReservation = {
      id: this.editId,
      userId: this.editUserId,
      roomId: this.editRoomId,
      checkIn: this.formatReservationDate(new Date(this.checkIn.value)),
      checkOut: this.formatReservationDate(new Date(this.checkOut.value)),
      totalPrice: this.editTotalPrice
    } as IReservation
 
    this.editReservation(reservation);
    
  }

  private formatReservationDate(date: Date): string {
    return new Date(date.getTime() - date.getTimezoneOffset() -300 * 60 * 1000).toISOString()
  }

  private editReservation(reservation: IReservation): void {

    this.reservation.updateReservation(this.editId!, reservation, this.sessionService.getToken()!).subscribe(
     
      reservation => {
    
        const roomIndex = this.showReservations.findIndex(x => x.id == this.editId);
        this.showReservations[roomIndex] = reservation;
        this.showReservations = this.showReservations.concat([]);
       
        this.cancelModal();
      },
    );
    
  }

  getModalTitle(): string {
    return this.mode + 'Reservation';
  }

  openEditReservation(reservation: IReservation): void {
    const newCheckIn = this.formatDate(reservation.checkIn)
    const newCheckOut = this.formatDate(reservation.checkOut)
    this.mode = 'Edit';
    this.editId = reservation.id;
    this.editUserId = reservation.userId;
    this.editRoomId = reservation.roomId;
    this.form.get('roomNumber')?.setValue(reservation.room?.number);
    this.form.get('checkIn')?.setValue(reservation.checkIn);
    this.form.get('checkOut')?.setValue(reservation.checkOut);
    
    this.openModal();  
    
  }
}
