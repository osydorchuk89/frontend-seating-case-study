import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogPortal,
} from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface DialogWrapperProps {
    open: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
    buttonChild?: React.ReactNode;
    contentChild: React.ReactNode;
}

export const DialogWrapper = ({
    open,
    onOpenChange,
    onClose,
    buttonChild,
    contentChild,
}: DialogWrapperProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {buttonChild}
            <DialogPortal>
                <DialogOverlay className="fixed inset-0 bg-black/70" />
                <DialogContent className="fixed z-[100] top-1/2 left-1/2 bg-zinc-50 p-5 rounded-xl shadow-lg w-1/3 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 text-zinc-900">
                    <X
                        className="absolute top-5 right-5 cursor-pointer"
                        onClick={onClose}
                    />
                    {contentChild}
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};
