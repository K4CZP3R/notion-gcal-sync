export interface IEvent {
    id: string;
    status: string;
    created: Date;
    updated: Date;
    summary: string;
    creator: string;
    startDateTime: Date;
    endDateTime: Date;
    timeZone: string;
}