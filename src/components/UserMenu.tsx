import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userActions } from "@/store";

export const UserMenu = () => {
    const user = useAppSelector((store) => store.user);
    const dispatch = useAppDispatch();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage
                                src={`https://source.boringavatars.com/marble/120/<user-email>?colors=25106C,7F46DB`}
                            />
                            <AvatarFallback>
                                {user.firstName.slice(0, 1)}
                                {user.lastName.slice(0, 1)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col text-left">
                            <span className="text-sm font-medium">
                                {user.firstName} {user.lastName}
                            </span>
                            <span className="text-xs text-zinc-500">
                                {user.email}
                            </span>
                        </div>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[250px]">
                <DropdownMenuLabel>
                    {user.firstName} {user.lastName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => dispatch(userActions.logoutUser())}
                    >
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
