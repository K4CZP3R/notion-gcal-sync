export interface IEvent {
    data: {
        id: string;
        created: Date;
        updated: Date;
        summary: string;
        creator: string;
        startDateTime: Date;
        endDateTime: Date;
        timeZone: string;
        description?: string;
    }
}