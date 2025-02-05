import { useEffect, useState } from "react";

import "./App.css";
import { EventDetails } from "./components/EventDetails";
import { SeatsMap } from "./components/SeatsMap";
import { getEventDetails, getSeats } from "./lib/requests";
import { eventActions, seatsActions, ticketTypesActions } from "./store";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useAppDispatch } from "./store/hooks";
import { SuccessDialog } from "./components/SuccessDialog";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchEventDetails = async () => {
            const eventResponseData = await getEventDetails();
            if (eventResponseData) {
                dispatch(eventActions.setEvent(eventResponseData));
                const seatsResponseData = await getSeats(
                    eventResponseData.eventId
                );
                if (seatsResponseData) {
                    setIsLoading(false);
                    dispatch(seatsActions.setSeats(seatsResponseData));
                    dispatch(
                        ticketTypesActions.setTicketTypes(
                            seatsResponseData.ticketTypes
                        )
                    );
                }
            }
        };
        fetchEventDetails();
    }, []);

    return (
        <div className="flex flex-col grow">
            {/* header (wrapper) */}
            <Header />
            {/* main body (wrapper) */}
            <main className="grow flex flex-col justify-center">
                {/* inner content */}
                {isLoading ? (
                    <div className="max-w-screen-lg m-auto flex justify-center w-full">
                        <p>Fetching event data...</p>
                    </div>
                ) : (
                    <div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
                        <SeatsMap />
                        <EventDetails />
                        <SuccessDialog />
                    </div>
                )}
            </main>

            {/* bottom cart affix (wrapper) */}
            <Footer />
        </div>
    );
}

export default App;
