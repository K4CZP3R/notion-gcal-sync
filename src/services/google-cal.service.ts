import { GOOGLE_AUTH_SERVICE } from "../helpers/di-names.helper";
import { DependencyProviderService } from "./dependency-provider.service";
import { GoogleAuthService } from "./google-auth.service";

import { calendar_v3, google } from "googleapis";
import { EventModel } from "../models/event.model";
import { CalendarModel } from "../models/calendar.model";
import { ICalService } from "../models/interfaces/cal-service.interface";

export class GoogleCalService implements ICalService {
	googleCalendarApi?: calendar_v3.Calendar;

	constructor() { }

	initializeUsingAuthService() {
		const authService = DependencyProviderService.getImpl<GoogleAuthService>(GOOGLE_AUTH_SERVICE);
		authService.getOauthClient();
		this.googleCalendarApi = google.calendar({ version: "v3", auth: authService.getOauthClient() });
	}

	async getCalendars(): Promise<any[]> {
		if (!this.googleCalendarApi) this.initializeUsingAuthService();
		const calendars = await this.googleCalendarApi!.calendarList.list();
		return calendars.data.items.map(f => CalendarModel.fromGoogleCalendar(f)) || [];
	}

	async getEvents(calendarId: string): Promise<any[]> {
		if (!this.googleCalendarApi) this.initializeUsingAuthService();
		const events = await this.googleCalendarApi!.events.list({ calendarId });
		return events.data.items.map(e => EventModel.fromGoogleEvent(e)) || [];
	}
}
