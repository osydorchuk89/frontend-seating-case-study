import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@radix-ui/react-dialog";

import { loginUser } from "@/lib/requests";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginDialogActions, userActions } from "@/store";
import { DialogWrapper } from "./DialogWrapper";

interface LoginFormInputs {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [error, setError] = useState(false);
    const loginDialog = useAppSelector((state) => state.loginDialog);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormInputs>();
    const onLogin: SubmitHandler<LoginFormInputs> = async (data) => {
        const response = await loginUser(data.email, data.password);
        if (response.message === "Login successful") {
            setInvalidCredentials(false);
            dispatch(userActions.loginUser(response.user));
            dispatch(loginDialogActions.closeDialog());
        } else if (response.message === "Request failed with status code 401") {
            setInvalidCredentials(true);
        } else {
            setError(true);
        }
    };

    const dialogButton = (
        <DialogTrigger asChild>
            <Button>Login</Button>
        </DialogTrigger>
    );

    const dialogContent = (
        <>
            <DialogTitle className="text-xl text-zinc-900 font-semibold text-center">
                Login
            </DialogTitle>
            <DialogDescription className="text-zinc-900 text-center">
                Enter your credentials below
            </DialogDescription>
            <form
                noValidate
                className="flex flex-col my-5"
                onSubmit={handleSubmit(onLogin)}
            >
                <div className="flex gap-2 items-center">
                    <label htmlFor="email" className="min-w-20">
                        Email:
                    </label>
                    <input
                        id="email"
                        className="py-1 px-2 w-full border border-zinc-300 rounded-md"
                        type="email"
                        onFocus={() => {
                            setInvalidCredentials(false);
                            setError(false);
                        }}
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
                <div className="flex gap-2 items-center mt-5">
                    <label htmlFor="password" className="min-w-20">
                        Password:
                    </label>
                    <input
                        id="password"
                        className="py-1 px-2 w-full border border-zinc-300 rounded-md"
                        type="password"
                        onFocus={() => {
                            setInvalidCredentials(false);
                            setError(false);
                        }}
                        {...register("password", { required: true })}
                    />
                </div>
                {errors.password && (
                    <span className="text-sm text-end text-red-800 font-medium">
                        This field is required
                    </span>
                )}
                {invalidCredentials && (
                    <span className="text-center text-red-800 font-medium mt-5">
                        Invalid credentials
                    </span>
                )}
                {error && (
                    <span className="text-center text-red-800 font-medium mt-5">
                        Something went wrong. Please try again later.
                    </span>
                )}
                <div className="flex justify-center mt-5">
                    <Button>LOGIN</Button>
                </div>
            </form>
        </>
    );

    return (
        <DialogWrapper
            open={loginDialog.isOpen}
            onOpenChange={() => {
                reset();
                loginDialog.isOpen
                    ? dispatch(loginDialogActions.closeDialog())
                    : dispatch(loginDialogActions.openDialog());
            }}
            onClose={() => dispatch(loginDialogActions.closeDialog())}
            buttonChild={dialogButton}
            contentChild={dialogContent}
        />
    );
};
