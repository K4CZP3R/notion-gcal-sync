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
        }
    ];
    constructor(path: string, private calService: ICalService) {
        super({ path });
        this.loadRoutes();
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