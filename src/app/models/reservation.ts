import { IRoom } from "./room";
import { IUser } from "./user";

export interface IReservation
{
    id?: number,
    userId: number,
    roomId: number,
    checkIn: string,
    checkOut: string,
    canceled: boolean,
    room?: IRoom,
    user?: IUser,
    totalPrice: number,
}