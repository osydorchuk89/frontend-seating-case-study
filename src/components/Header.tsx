import { Hexagon } from "lucide-react";

import { UserMenu } from "./UserMenu";
import { LoginForm } from "./LoginForm";
import { useAppSelector } from "@/store/hooks";

export const Header = () => {
    const user = useAppSelector((store) => store.user);
    const isLoggedIn = user.email !== "";

    return (
        <nav className="sticky top-0 left-0 right-0 bg-white border-b border-zinc-200 flex justify-center">
            {/* inner content */}
            <div className="max-w-screen-lg p-4 grow flex items-center justify-between gap-3">
                {/* application/author image/logo placeholder */}
                <div className="max-w-[250px] w-full flex">
                    <Hexagon />
                    {/* <div className="bg-zinc-100 rounded-md size-12" /> */}
                </div>
                {/* app/author title/name placeholder */}
                <p className="text-xl font-semibold">NFCtron</p>
                {/* user menu */}
                <div className="max-w-[250px] w-full flex justify-end">
                    {isLoggedIn ? <UserMenu /> : <LoginForm />}
                </div>
            </div>
        </nav>
    );
};
