import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRoom } from '../models/room';
import { AdminRoomService } from '../services/admin-room.service';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit {

  
  showRooms: IRoom[] = [] as IRoom[]; 
  showModal: boolean = false;
  showDeleteModal = false;
  isAddMode = true;
  roomId: number | undefined;
  mode = 'Add';
  editId: number | undefined;
  requiredMessage = 'This field is required.'
  
  curentRooms: IRoom = {} as IRoom;
 

  floor: FormControl = new FormControl('', [Validators.required]);
  number: FormControl = new FormControl('', [Validators.required]);
  price: FormControl = new FormControl('', [Validators.required]);
  numberOfPersons: FormControl = new FormControl('', [Validators.required]);
  


  form: FormGroup = new FormGroup({
    floor: this.floor,
    number: this.number,
    price: this.price,
    numberOfPersons: this.numberOfPersons,

  });

  displayedColumns: string[] = ['number', 'floor','price', 'numberOfPersons', 'actions'];

  constructor(
    private adminRoomService: AdminRoomService,
    private sessionService: SessionService
  ){}
  

  ngOnInit(): void{
    this.getRooms()
  }

  getRooms()
  {
    this.adminRoomService.getAllRooms(this.sessionService.getToken()!).subscribe(
      showRooms => {
        this.showRooms= showRooms
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

  submit(): void {
    if (!this.form.valid) {
      alert('Invalid form!');
    }

    const room: IRoom = {
      floor: this.floor.value,
      number: this.number.value,
      price: this.price.value,
      numberOfPersons: this.numberOfPersons.value,
   
    } as IRoom

    if (this.mode === 'Add') {
      this.addRooms(room);
    }  else {
      room.id = this.editId;
      this.editRoom(room);
    } 
  }

    private addRooms(room: IRoom): void {
      this.adminRoomService.addRoom(room, this.sessionService.getToken()!).subscribe(
        room => {
          this.showRooms = this.showRooms.concat([room]);
          this.cancelModal();
        },
      );
    }

    private editRoom(room: IRoom): void {
      this.adminRoomService.updateRoom(this.editId!, room, this.sessionService.getToken()!).subscribe(
        room => {
          const roomIndex = this.showRooms.findIndex(x => x.id == this.editId);
          this.showRooms[roomIndex] = room;
          this.showRooms = this.showRooms.concat([]);
          
          this.cancelModal();
        },
      );
    }

    openEditRoom(room: IRoom): void {
      this.mode = 'Edit';
      this.editId = room.id;
  
      this.form.get('floor')?.setValue(room.floor);
      this.form.get('price')?.setValue(room.price);
      this.form.get('number')?.setValue(room.number);
      this.form.get('numberOfPersons')?.setValue(room.numberOfPersons);
  
  
      this.openModal();  
    }

    openAddRoom(): void {
      this.mode = 'Add';
      this.openModal();
    }

    removeRooms(room: IRoom): void {
      if (confirm('Are you sure you want to delete this item?')) {
        this.adminRoomService.removeRoom(room.id!, this.sessionService.getToken()!).subscribe(
          response => this.showRooms = this.showRooms.filter(x => x != room),
        );
      }
    }
  
    getModalTitle(): string {
      return this.mode + ' Room';
    }  
}