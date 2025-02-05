import { Cart, Event, Seats, TicketType, User } from "@/lib/entities";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialEventState: Event = {
    eventId: "",
    namePub: "",
    description: "",
    currencyIso: "",
    dateFrom: new Date(),
    dateTo: new Date(),
    headerImageUrl: "",
    place: "",
};

const initialSeatsState: Seats = {
    ticketTypes: [],
    seatRows: [],
};

const initialTicketTypesState: TicketType[] = [];

const initialCartState: Cart = {
    seats: [],
    quantity: 0,
    totalPrice: 0,
};

const initialUserState: User = {
    firstName: "",
    lastName: "",
    email: "",
};

const initialCheckoutDialogState = {
    isOpen: false,
};

const initialCustomerDialogState = {
    isOpen: false,
};

const initialLoginDialogState = {
    isOpen: false,
};

const initialSuccessDialogState = {
    isOpen: false,
};

const eventSlice = createSlice({
    name: "event",
    initialState: initialEventState,
    reducers: {
        setEvent(_, action) {
            return action.payload;
        },
    },
});

const seatsSlice = createSlice({
    name: "seats",
    initialState: initialSeatsState,
    reducers: {
        setSeats(_, action) {
            return action.payload;
        },
    },
});

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addSeat(state, action) {
            state.seats.push(action.payload.seat);
            state.quantity++;
            state.totalPrice += action.payload.seat.price;
        },
        removeSeat(state, action) {
            state.totalPrice -= state.seats.find(
                (seat) => seat.seatId === action.payload.seatId
            )!.price;
            state.seats = state.seats.filter(
                (seat) => seat.seatId !== action.payload.seatId
            );
            state.quantity--;
        },
        clearCart() {
            return initialCartState;
        },
    },
});

const ticketTypesSlice = createSlice({
    name: "ticketType",
    initialState: initialTicketTypesState,
    reducers: {
        setTicketTypes(_, action) {
            return action.payload;
        },
    },
});

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        loginUser(_, action) {
            return action.payload;
        },
        logoutUser() {
            return initialUserState;
        },
    },
});

const checkoutDialogSlice = createSlice({
    name: "checkoutDialog",
    initialState: initialCheckoutDialogState,
    reducers: {
        openDialog(state) {
            state.isOpen = true;
        },
        closeDialog(state) {
            state.isOpen = false;
        },
    },
});

const customerDialogSlice = createSlice({
    name: "customerDialog",
    initialState: initialCustomerDialogState,
    reducers: {
        openDialog(state) {
            state.isOpen = true;
        },
        closeDialog(state) {
            state.isOpen = false;
        },
    },
});

const loginDialogSlice = createSlice({
    name: "loginDialog",
    initialState: initialLoginDialogState,
    reducers: {
        openDialog(state) {
            state.isOpen = true;
        },
        closeDialog(state) {
            state.isOpen = false;
        },
    },
});

const successDialog = createSlice({
    name: "successDialog",
    initialState: initialSuccessDialogState,
    reducers: {
        openDialog(state) {
            state.isOpen = true;
        },
        closeDialog(state) {
            state.isOpen = false;
        },
    },
});

export const store = configureStore({
    reducer: {
        event: eventSlice.reducer,
        seats: seatsSlice.reducer,
        cart: cartSlice.reducer,
        ticketTypes: ticketTypesSlice.reducer,
        user: userSlice.reducer,
        checkoutDialog: checkoutDialogSlice.reducer,
        customerDialog: customerDialogSlice.reducer,
        loginDialog: loginDialogSlice.reducer,
        successDialog: successDialog.reducer,
    },
});

export const cartActions = cartSlice.actions;
export const ticketTypesActions = ticketTypesSlice.actions;
export const eventActions = eventSlice.actions;
export const seatsActions = seatsSlice.actions;
export const userActions = userSlice.actions;
export const checkoutDialogActions = checkoutDialogSlice.actions;
export const customerDialogActions = customerDialogSlice.actions;
export const loginDialogActions = loginDialogSlice.actions;
export const successDialogActions = successDialog.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
