import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { successDialogActions } from "@/store";
import { Button } from "./ui/button";
import { DialogWrapper } from "./DialogWrapper";

export const SuccessDialog = () => {
    const successDialog = useAppSelector((state) => state.successDialog);
    const dispatch = useAppDispatch();

    const dialogContent = (
        <>
            <DialogTitle className="text-xl text-zinc-900 font-semibold text-center">
                Order Completed
            </DialogTitle>
            <DialogDescription className="text-zinc-900 text-center">
                You have successfully completed the order.
            </DialogDescription>
            <div className="flex justify-center">
                <Button
                    onClick={() => dispatch(successDialogActions.closeDialog())}
                >
                    Got it!
                </Button>
            </div>
        </>
    );

    return (
        <DialogWrapper
            open={successDialog.isOpen}
            onOpenChange={() => {
                successDialog.isOpen
                    ? dispatch(successDialogActions.closeDialog())
                    : dispatch(successDialogActions.openDialog());
            }}
            onClose={() => dispatch(successDialogActions.closeDialog())}
            contentChild={dialogContent}
        />
    );
};
