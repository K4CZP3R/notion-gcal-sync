import { NextFunction, Request, Response } from "express";
import { ICalService } from "../models/interfaces/cal-service.interface";
import { IRoute } from "../models/interfaces/route.interface";
import { BaseController } from "./base.controller";

export class BaseCalController extends BaseController {
    public routes: IRoute[] = [
        {
            path: "/calendar",
            method: "GET",
            func: this.getCalendars.bind(this),
        },
        {
            path: "/calendar/:calendarId",
            method: "GET",
            func: this.getEventsOfCalendar.bind(this),
        },
        {
            path: "/calendar/:calendarId/event/:eventId",
            method: "GET",
            func: this.getEventOfCalendar.bind(this),
        },
        {
            path: "/calendar/:calendarId/event",
            method: "POST",
            func: this.createEventInCalendar.bind(this),
        },
        {
            path: "/calendar/:calendarId/event/:eventId",
            method: "DELETE",
            func: this.deleteEventOfCalendar.bind(this),
        }
    ];
    constructor(path: string, private calService: ICalService) {
        super({ path });
        this.loadRoutes();
    }

    async deleteEventOfCalendar(req: Request, res: Response, next: NextFunction) {
        const { calendarId, eventId } = req.params;
        await this.calService.deleteEvent(calendarId, eventId);
        res.json({ success: true });
    }

    async createEventInCalendar(req: Request, res: Response, next: NextFunction) {
        const { calendarId } = req.params;
        const event = await this.calService.createEvent(calendarId, req.body);
        res.json(event.data);
    }

    async getEventOfCalendar(req: Request, res: Response, next: NextFunction) {
        const { calendarId, eventId } = req.params;
        const event = await this.calService.getEvent(calendarId, eventId);
        res.json(event.data);
    }

    async getEventsOfCalendar(req: Request, res: Response, next: NextFunction) {
        const { calendarId } = req.params;
        const events = await this.calService.getEvents(calendarId);
        res.json(events.map(e => e.data));
    }
    async getCalendars(req: Request, res: Response, next: NextFunction) {
        const calendars = await this.calService.getCalendars();
        res.json(calendars);

    }
}