export interface Event {
    eventId: string;
    namePub: string;
    description: string;
    currencyIso: string;
    dateFrom: Date;
    dateTo: Date;
    headerImageUrl: string;
    place: string;
}

export interface Seat {
    seatId: string;
    place: number;
    row?: number;
    ticketTypeId: string;
}

export interface SeatRow {
    seatRow: number;
    seats: Seat[];
}

export interface Ticket {
    ticketTypeId: string;
    seatId: string;
}

export interface TicketType {
    id: string;
    name: string;
    price: number;
}

export interface Seats {
    ticketTypes: TicketType[];
    seatRows: SeatRow[];
}

export interface SeatWithPrice extends Seat {
    price: number;
}

export interface Cart {
    seats: SeatWithPrice[];
    quantity: number;
    totalPrice: number;
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
}
