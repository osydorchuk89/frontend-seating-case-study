import { AddToCalendarButton } from "add-to-calendar-button-react";

import { useAppSelector } from "@/store/hooks";

export const EventDetails = () => {
    const event = useAppSelector((store) => store.event);
    const loginDialog = useAppSelector((store) => store.loginDialog);
    const checkoutDialog = useAppSelector((store) => store.checkoutDialog);
    const customerDialog = useAppSelector((store) => store.customerDialog);
    const successDialog = useAppSelector((store) => store.successDialog);

    const isDialogOpen =
        loginDialog.isOpen ||
        checkoutDialog.isOpen ||
        customerDialog.isOpen ||
        successDialog.isOpen;

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const eventDate = new Date(event.dateFrom).toLocaleDateString(
        "cs-CZ",
        options
    );

    return (
        <aside className="w-full max-w-sm bg-white rounded-md shadow-sm p-3 flex flex-col gap-2">
            <img className="rounded-md" src={event.headerImageUrl} />
            {/* event name */}
            <h1 className="text-xl text-zinc-900 font-semibold">
                {event.namePub}
            </h1>
            <p className="text-sm text-zinc-500">Datum: {eventDate}</p>
            {/* event description */}
            <p className="text-sm">{event.description}</p>
            {/* add to calendar button */}
            <div className={isDialogOpen ? "hidden" : "flex justify-center"}>
                <AddToCalendarButton
                    name={event.namePub}
                    startDate={event.dateFrom.toString()}
                    location={event.place}
                    options={["Apple", "Google", "Yahoo", "iCal"]}
                    timeZone="Europe/Prague"
                    hideCheckmark
                />
            </div>
        </aside>
    );
};
