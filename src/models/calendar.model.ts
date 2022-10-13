import { ICalendar } from "./interfaces/calendar.interface";

export class CalendarModel implements ICalendar {
    id: string;
    summary: string;

    constructor(id: string, summary: string) {
        this.id = id;
        this.summary = summary;
    }

    static fromGoogleCalendar(googleCalendar: any): CalendarModel {
        return new CalendarModel(googleCalendar.id, googleCalendar.summary);
    }

    static fromNotionDatabase(notionDatabase: any): CalendarModel {
        return new CalendarModel(
            notionDatabase.id,
            notionDatabase.title[0].plain_text
        );
    }

    static isValidNotionDatabase(notionDatabase: any): boolean {
        let propertyKeys = Object.keys(notionDatabase.properties);
        return notionDatabase.object === "database" &&
            propertyKeys.includes("Name") &&
            propertyKeys.includes("Date");
    }

}