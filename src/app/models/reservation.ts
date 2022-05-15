export interface IReservation
{
    reservationId?: number,
    userId: number,
    roomId: number,
    checkIn: string,
    checkOut: string,
}