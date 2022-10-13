import { ICalendar } from "./calendar.interface";
import { IEvent } from "./event.interface";

export interface ICalService {
    getEvents(calendarId: string): Promise<IEvent[]>;
    getCalendars(): Promise<ICalendar[]>;
}