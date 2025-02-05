import axios from "axios";
import { Ticket, User } from "./entities";


const BASE_API_URL =
    "https://nfctron-frontend-seating-case-study-2024.vercel.app";

export const getEventDetails = async () => {
    try {
        const response = await axios.get(`${BASE_API_URL}/event`);
        return response.data;
    } catch (error) {
        console.error("Error fetching event details: ", error);
    }
};

export const getSeats = async (uuid: string) => {
    try {
        const response = await axios.get(
            `${BASE_API_URL}/event-tickets?eventId=${uuid}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets and seats: ", error);
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.log("Error logging in: ", error);
    }
};

export const sendOrder = async (eventId: string, tickets: Ticket[], user: User) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/order`, {
            eventId,
            tickets,
            user,
        });
        return response.data;
    } catch (error) {
        console.log("Error sending order: ", error);
    }
}
