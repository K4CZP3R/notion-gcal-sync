import { GOOGLE_CAL_SERVICE } from "../helpers/di-names.helper";
import { Inject } from "../services/dependency-provider.service";
import { GoogleCalService } from "../services/google-cal.service";

export class GoogleCalLogic {
    @Inject<GoogleCalService>(GOOGLE_CAL_SERVICE)
    googleCalService!: GoogleCalService;

    constructor() { }

    async getCalendars(): Promise<any[]> {
        return this.googleCalService.getCalendars();
    }

    async getEvents(calendarId: string): Promise<any[]> {
        return this.googleCalService.getEvents(calendarId);
    }




}