import { Client } from "@notionhq/client"
import { IEvent } from "../models/interfaces/event.interface";
import { EventModel } from "../models/event.model";
import { CalendarModel } from "../models/calendar.model";
import { ICalendar } from "../models/interfaces/calendar.interface";
import { ICalService } from "../models/interfaces/cal-service.interface";

export class NotionCalService implements ICalService {
    client: Client

    constructor(notionKey: string) {
        this.client = new Client({ auth: notionKey })

    }
    async getEvent(calendarId: string, eventId: string): Promise<IEvent> {
        let object = await this.client.pages.retrieve({
            page_id: eventId
        });

        if (EventModel.isValidNotionDatabaseObject(object)) {
            return EventModel.fromNotionDatabaseObject(object);
        } else {
            throw new Error("Notion object is not a valid event");
        }
    }

    async getEvents(id: string): Promise<IEvent[]> {
        let objects = await this.client.databases.query({
            database_id: id
        });
        return objects.results.filter(EventModel.isValidNotionDatabaseObject).map(EventModel.fromNotionDatabaseObject);
    }

    async getCalendars(): Promise<ICalendar[]> {
        let databases = await this.client.search({
            filter: {
                value: "database",
                property: "object",
            }
        })
        return databases.results.filter(CalendarModel.isValidNotionDatabase).map(CalendarModel.fromNotionDatabase);

    }

}