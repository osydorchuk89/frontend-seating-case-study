import { useForm, SubmitHandler } from "react-hook-form";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

import { Button } from "./ui/button";
import { sendOrder } from "@/lib/requests";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    cartActions,
    checkoutDialogActions,
    customerDialogActions,
    loginDialogActions,
    successDialogActions,
} from "@/store";
import { DialogWrapper } from "./DialogWrapper";
import { useState } from "react";

interface CustomerDetailsInputs {
    firstName: string;
    lastName: string;
    email: string;
}

export const CustomerDialog = () => {
    const [error, setError] = useState(false);
    const event = useAppSelector((state) => state.event);
    const cart = useAppSelector((state) => state.cart);
    const customerDialog = useAppSelector((state) => state.customerDialog);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CustomerDetailsInputs>();

    const onCheckout: SubmitHandler<CustomerDetailsInputs> = async (data) => {
        const user = { ...data };
        const tickets = cart.seats.map((seat) => {
            return {
                seatId: seat.seatId,
                ticketTypeId: seat.ticketTypeId,
            };
        });
        const response = await sendOrder(event.eventId, tickets, user);
        if (response.message.startsWith("Order successful, congratulations!")) {
            dispatch(cartActions.clearCart());
            dispatch(customerDialogActions.closeDialog());
            dispatch(checkoutDialogActions.closeDialog());
            dispatch(successDialogActions.openDialog());
        } else {
            setError(true);
        }
    };

    const dialogButton = (
        <Button onClick={() => dispatch(customerDialogActions.openDialog())}>
            Checkout
        </Button>
    );

    const dialogContent = (
        <>
            <DialogTitle className="text-xl text-zinc-900 font-semibold text-center">
                Customer Details
            </DialogTitle>
            <DialogDescription className="text-zinc-900 text-center">
                Please enter you details below
            </DialogDescription>
            <form
                noValidate
                className="flex flex-col my-5"
                onSubmit={handleSubmit(onCheckout)}
            >
                <div className="flex gap-2 items-center">
                    <label htmlFor="firstName" className="min-w-20">
                        First name:
                    </label>
                    <input
                        id="firstName"
                        className="py-1 px-2 w-full border border-zinc-300 rounded-md"
                        type="text"
                        onFocus={() => setError(false)}
                        {...register("firstName", { required: true })}
                    />
                </div>
                {errors.firstName && (
                    <span className="text-sm text-end text-red-800 font-medium">
                        This field is required
                    </span>
                )}
                <div className="flex gap-2 items-center mt-5">
                    <label htmlFor="lastName" className="min-w-20">
                        Last name:
                    </label>
                    <input
                        id="lastName"
                        className="py-1 px-2 w-full border border-zinc-300 rounded-md"
                        type="text"
                        onFocus={() => setError(false)}
                        {...register("lastName", { required: true })}
                    />
                </div>
                {errors.lastName && (
                    <span className="text-sm text-end text-red-800 font-medium">
                        This field is required
                    </span>
                )}
                <div className="flex gap-2 items-center mt-5">
                    <label htmlFor="email" className="min-w-20">
                        Email:
                    </label>
                    <input
                        id="email"
                        className="py-1 px-2 w-full border border-zinc-300 rounded-md"
                        type="email"
                        onFocus={() => setError(false)}
                        {...register("email", {
                            required: "This field is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Please enter a valid email",
                            },
                        })}
                    />
                </div>
                {errors.email && (
                    <span className="text-sm text-end text-red-700 font-medium">
                        {errors.email.message}
                    </span>
                )}
                {error && (
                    <span className="text-center text-red-800 font-medium mt-5">
                        Something went wrong. Please try again later.
                    </span>
                )}
                <div className="w-1/3 self-center flex justify-between mt-5">
                    <Button
                        variant="destructive"
                        onClick={() =>
                            dispatch(customerDialogActions.closeDialog())
                        }
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Confirm</Button>
                </div>
            </form>
            <p className="text-center">
                Or login{" "}
                <a
                    className="underline cursor-pointer"
                    onClick={() => {
                        dispatch(checkoutDialogActions.closeDialog());
                        dispatch(loginDialogActions.openDialog());
                    }}
                >
                    here
                </a>
            </p>
        </>
    );

    return (
        <DialogWrapper
            open={customerDialog.isOpen}
            onOpenChange={() => {
                customerDialog.isOpen
                    ? dispatch(customerDialogActions.closeDialog())
                    : dispatch(customerDialogActions.openDialog());
            }}
            onClose={() => dispatch(customerDialogActions.closeDialog())}
            buttonChild={dialogButton}
            contentChild={dialogContent}
        />
    );
};
