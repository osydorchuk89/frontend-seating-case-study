import { forwardRef } from "react";
import { PopoverClose } from "@radix-ui/react-popover";

import { Button } from "@/components/ui/button.tsx";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import { cartActions } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
    rowNumber: number;
    seatNumber: number;
    seatId: string;
    ticketTypeId: string;
}

export const Seat = forwardRef<HTMLDivElement, SeatProps>((props, ref) => {
    const cart = useAppSelector((state) => state.cart);
    const ticketTypes = useAppSelector((state) => state.ticketTypes);
    const dispatch = useAppDispatch();

    const isInCart = cart.seats.some((seat) => seat.seatId === props.seatId);

    const addSeatToCart = () => {
        setTimeout(() => {
            dispatch(
                cartActions.addSeat({
                    seat: {
                        seatId: props.seatId,
                        place: props.seatNumber,
                        row: props.rowNumber,
                        ticketTypeId: props.ticketTypeId,
                        price:
                            ticketTypes.find(
                                (ticketType) =>
                                    ticketType.id === props.ticketTypeId
                            )?.price || 0,
                    },
                })
            );
        }, 100);
    };

    const removeSeatFromCart = () => {
        setTimeout(() => {
            dispatch(cartActions.removeSeat({ seatId: props.seatId }));
        }, 100);
    };

    if (props.seatNumber > 0) {
        return (
            <div className="flex justify-center">
                <Popover>
                    <PopoverTrigger>
                        <div
                            className={cn(
                                "size-8 rounded-full transition-color self-center",
                                isInCart
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-zinc-100 hover:bg-zinc-200"
                            )}
                            ref={ref}
                        >
                            <span
                                className={cn(
                                    "text-xs font-medium",
                                    isInCart ? "text-white" : "text-zinc-400"
                                )}
                            >
                                {props.seatNumber}
                            </span>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <p>Row: {props.rowNumber}</p>
                            <p>Seat: {props.seatNumber}</p>
                        </div>
                        <footer className="flex flex-col">
                            <PopoverClose asChild>
                                {isInCart ? (
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={removeSeatFromCart}
                                    >
                                        Remove from cart
                                    </Button>
                                ) : (
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={addSeatToCart}
                                    >
                                        Add to cart
                                    </Button>
                                )}
                            </PopoverClose>
                        </footer>
                    </PopoverContent>
                </Popover>
            </div>
        );
    } else {
        return (
            <div className="flex justify-center">
                <div
                    className={cn(
                        "size-8 rounded-full bg-zinc-400 transition-color cursor-not-allowed",
                        props.className
                    )}
                    ref={ref}
                />
            </div>
        );
    }
});
