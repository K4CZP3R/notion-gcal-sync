import { IEvent } from "./interfaces/event.interface";

export class EventModel implements IEvent {

    constructor(public data: {
        id: string,
        status: string,
        created: Date,
        updated: Date,
        summary: string,
        creator: string,
        startDateTime: Date,
        endDateTime: Date,
        timeZone: string
    }
    ) {

    }

    static fromNotionDatabaseObject(notionDatabaseObject: any): EventModel {
        return new EventModel({
            id: notionDatabaseObject.id,
            status: notionDatabaseObject.properties.Status.status.name,
            created: new Date(notionDatabaseObject.created_time),
            updated: new Date(notionDatabaseObject.last_edited_time),
            summary: notionDatabaseObject.properties.Name.title[0].plain_text,
            creator: notionDatabaseObject.created_by.id,
            startDateTime: new Date(notionDatabaseObject.properties.Date.date.start),
            endDateTime: new Date(notionDatabaseObject.properties.Date.date.end ?? notionDatabaseObject.properties.Date.date.start),
            timeZone: notionDatabaseObject.properties.Date.date.timezone ?? "Europe/Amsterdam"
        });
    }



    static isValidNotionDatabaseObject(notionDatabaseObject: any): boolean {
        const basicChecks = notionDatabaseObject.id && notionDatabaseObject.created_time && notionDatabaseObject.last_edited_time;

        const propertyKeys = Object.keys(notionDatabaseObject.properties);
        const nameChecks = propertyKeys.includes("Name") && notionDatabaseObject.properties.Name.title.length > 0 && notionDatabaseObject.properties.Name.title[0].plain_text;
        const dateChecks = propertyKeys.includes("Date") && notionDatabaseObject.properties.Date.date;
        const statusChecks = propertyKeys.includes("Status") && notionDatabaseObject.properties.Status.status.name;
        // const descriptionChecks = propertyKeys.includes("Description") && notionDatabaseObject.properties.Description.rich_text.length > 0 && notionDatabaseObject.properties.Description.rich_text[0].plain_text;


        return basicChecks && nameChecks && dateChecks && statusChecks;
    }

    static fromGoogleEvent(googleEvent: any): EventModel {
        return new EventModel({
            id: googleEvent.id,
            status: googleEvent.status,
            created: new Date(googleEvent.created),
            updated: new Date(googleEvent.updated),
            summary: googleEvent.summary,
            creator: googleEvent.creator.email,
            startDateTime: new Date(googleEvent.start.dateTime),
            endDateTime: new Date(googleEvent.end.dateTime),
            timeZone: googleEvent.start.timeZone
        });

    }

}