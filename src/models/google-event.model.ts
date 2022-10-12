import { IEvent } from "./interfaces/event.interface";

export class GoogleEventModel implements IEvent {
	id: string;
	status: string;
	created: Date;
	updated: Date;
	summary: string;
	creator: string;
	startDateTime: Date;
	endDateTime: Date;
	timeZone: string;

	constructor(
		id: string,
		status: string,
		created: Date,
		updated: Date,
		summary: string,
		creator: string,
		startDateTime: Date,
		endDateTime: Date,
		timeZone: string
	) {
		this.id = id;
		this.status = status;
		this.created = created;
		this.updated = updated;
		this.summary = summary;
		this.creator = creator;
		this.startDateTime = startDateTime;
		this.endDateTime = endDateTime;
		this.timeZone = timeZone;
	}

	static fromGoogleEvent(googleEvent: any): GoogleEventModel {
		return new GoogleEventModel(
			googleEvent.id,
			googleEvent.status,
			new Date(googleEvent.created),
			new Date(googleEvent.updated),
			googleEvent.summary,
			googleEvent.creator.email,
			new Date(googleEvent.start.dateTime),
			new Date(googleEvent.end.dateTime),
			googleEvent.start.timeZone
		);
	}
}
