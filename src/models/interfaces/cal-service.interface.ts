import { ICalendar } from "./calendar.interface";
import { IEvent } from "./event.interface";

export interface ICalService {
    getEvents(calendarId: string): Promise<IEvent[]>;
    getCalendars(): Promise<ICalendar[]>;
    getEvent(calendarId: string, eventId: string): Promise<IEvent>;
    createEvent(calendarId: string, event: { summary: string, startDateTime: string, endDateTime: string, description: string }): Promise<IEvent>;
    deleteEvent(calendarId: string, eventId: string): Promise<void>
}