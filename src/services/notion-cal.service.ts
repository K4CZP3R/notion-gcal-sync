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
    async deleteEvent(calendarId: string, eventId: string): Promise<void> {
        await this.client.pages.update({
            page_id: eventId,
            archived: true
        })
    }
    async createEvent(calendarId: string, event: { summary: string, startDateTime: string, endDateTime: string, description: string }): Promise<IEvent> {
        const object = await this.client.pages.create({
            parent: {
                database_id: calendarId
            },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: event.summary
                            }
                        }]

                },
                Date: {
                    date: {
                        start: event.startDateTime,
                        end: event.endDateTime
                    }
                },
                Description: {
                    rich_text: [
                        {
                            text: {
                                content: event.description
                            }
                        }
                    ]
                }

            },


        })

        return this.getEvent(calendarId, object.id);
    }
    async getEvent(calendarId: string, eventId: string): Promise<IEvent> {
        let object = await this.client.pages.retrieve({
            page_id: eventId
        });

        console.log(JSON.stringify(object, null, 4));

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