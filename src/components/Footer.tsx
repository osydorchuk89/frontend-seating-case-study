import { useAppSelector } from "@/store/hooks";
import { CheckoutDialog } from "./CheckoutDialog";

export const Footer = () => {
    const cart = useAppSelector((state) => state.cart);

    return (
        <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
            {/* inner content */}
            <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
                {/* total in cart state */}
                <div className="flex flex-col">
                    <span>Total for {cart.quantity} ticket(s)</span>
                    <span className="text-2xl font-semibold">
                        {cart.totalPrice} CZK
                    </span>
                </div>

                {/* checkout button */}
                <CheckoutDialog />
            </div>
        </nav>
    );
};
