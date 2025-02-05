import { fillMissingSeats, getMaxRowLength } from "@/lib/utils";
import { Seat } from "./Seat";
import { useAppSelector } from "@/store/hooks";

export const SeatsMap = () => {
    const seats = useAppSelector((store) => store.seats);

    const rowLength = getMaxRowLength(seats);

    return (
        <div className="w-full">
            <p className="text-xl text-zinc-900 font-semibold text-center mb-10">
                Choose your seat(s)
            </p>
            <div className="grid width-full grow gap-5">
                {seats.seatRows.map((row) => {
                    const rowSeats = fillMissingSeats(
                        row.seats.slice(),
                        rowLength
                    );
                    return (
                        <div
                            key={row.seatRow}
                            className="grid auto-cols-[minmax(0,2fr)] grid-flow-col"
                        >
                            {rowSeats.map((seat) => {
                                if (!seat.ticketTypeId) {
                                    return (
                                        <Seat
                                            key={seat.seatId}
                                            seatNumber={-1}
                                            rowNumber={row.seatRow}
                                            seatId={seat.seatId}
                                            ticketTypeId={""}
                                        />
                                    );
                                }
                                return (
                                    <Seat
                                        key={seat.seatId}
                                        seatNumber={seat.place}
                                        rowNumber={row.seatRow}
                                        seatId={seat.seatId}
                                        ticketTypeId={seat.ticketTypeId}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
