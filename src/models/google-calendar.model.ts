import { ICalendar } from "./interfaces/calendar.interface";

export class GoogleCalendarModel implements ICalendar {
    id: string;
    summary: string;
    timeZone: string;

    constructor(id: string, summary: string, timeZone: string) {
        this.id = id;
        this.summary = summary;
        this.timeZone = timeZone;
    }

    static fromGoogleCalendar(googleCalendar: any): GoogleCalendarModel {
        return new GoogleCalendarModel(googleCalendar.id, googleCalendar.summary, googleCalendar.timeZone);
    }

}