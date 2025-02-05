import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { sendOrder } from "@/lib/requests";
import { CustomerDialog } from "./CustomerDialog";
import {
    cartActions,
    checkoutDialogActions,
    successDialogActions,
} from "@/store";
import { DialogWrapper } from "./DialogWrapper";
import { useState } from "react";

export const CheckoutDialog = () => {
    const [error, setError] = useState(false);
    const event = useAppSelector((state) => state.event);
    const cart = useAppSelector((state) => state.cart);
    const user = useAppSelector((state) => state.user);
    const checkoutDialog = useAppSelector((state) => state.checkoutDialog);
    const dispatch = useAppDispatch();

    const handleCheckout = async () => {
        const tickets = cart.seats.map((seat) => {
            return {
                seatId: seat.seatId,
                ticketTypeId: seat.ticketTypeId,
            };
        });
        const response = await sendOrder(event.eventId, tickets, user);
        if (response.message.startsWith("Order successful, congratulations!")) {
            dispatch(cartActions.clearCart());
            dispatch(checkoutDialogActions.closeDialog());
            dispatch(successDialogActions.openDialog());
        } else {
            setError(true);
        }
    };

    const dialogButton = (
        <Button
            disabled={cart.quantity === 0}
            variant="default"
            onClick={() => dispatch(checkoutDialogActions.openDialog())}
        >
            Checkout
        </Button>
    );

    const dialogContent = (
        <>
            <DialogTitle className="text-xl text-zinc-900 font-semibold text-center">
                Checkout Confirmation
            </DialogTitle>
            <DialogDescription className="text-zinc-900 text-center">
                Are you sure you want to purchase the selected tickets?
            </DialogDescription>
            <ul className="flex flex-col gap-2">
                {cart.seats.map((item) => (
                    <li className="list-inside list-decimal" key={item.seatId}>
                        Row: {item.row}, place: {item.place}, price:{" "}
                        {item.price} CZK
                    </li>
                ))}
            </ul>
            <p className="font-semibold">Total price: {cart.totalPrice} CZK</p>
            {error && (
                <span className="text-center text-red-800 font-medium mt-5">
                    Something went wrong. Please try again later.
                </span>
            )}
            <div className="w-1/3 self-center flex justify-between">
                <Button
                    variant="destructive"
                    onClick={() =>
                        dispatch(checkoutDialogActions.closeDialog())
                    }
                >
                    Cancel
                </Button>
                {user.email ? (
                    <Button onClick={handleCheckout}>Confirm</Button>
                ) : (
                    <CustomerDialog />
                )}
            </div>
        </>
    );

    return (
        <DialogWrapper
            open={checkoutDialog.isOpen}
            onOpenChange={() => {
                checkoutDialog.isOpen
                    ? dispatch(checkoutDialogActions.closeDialog())
                    : dispatch(checkoutDialogActions.openDialog());
            }}
            onClose={() => dispatch(checkoutDialogActions.closeDialog())}
            buttonChild={dialogButton}
            contentChild={dialogContent}
        />
    );
};
