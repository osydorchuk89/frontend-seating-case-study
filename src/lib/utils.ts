import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

import { Seat, Seats } from "./entities";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getMaxRowLength = (seatsData: Seats) => {
    return seatsData.seatRows
        .flatMap((row) => row.seats)
        .reduce((max, seat) => Math.max(max, seat.place), 0);
};

export const fillMissingSeats = (array: Seat[], size: number) => {
    let i;
    for (i = 0; i < size; i++) {
        if (array[i] && array[i].place === i + 1) continue;
        array.splice(
            i,
            0,
            Object.assign({}, array[i - 1], {
                seatId: uuidv4(),
                place: i + 1,
                ticketTypeId: "",
            })
        );
    }
    return array;
};
