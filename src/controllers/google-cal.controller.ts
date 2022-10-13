import { NextFunction, Request, Response } from "express";
import { GoogleCalLogic } from "../logic/google-cal.logic";
import { IRoute } from "../models/interfaces/route.interface";
import { BaseController } from "./base.controller";


export class GoogleCalController extends BaseController {
    public routes: IRoute[] = [
        {
            path: "/get-calendars",
            method: "GET",
            func: this.getCalendars.bind(this),
        },
        {
            path: "/get-events-of-calendar/:calendarId",
            method: "GET",
            func: this.getEventsOfCalendar.bind(this),
        }

    ];

    constructor(private googleCalLogic = new GoogleCalLogic()) {
        super({ path: "/google-cal" });
        this.loadRoutes();
    }

    async getEventsOfCalendar(req: Request, res: Response, next: NextFunction) {
        const { calendarId } = req.params;
        const events = await this.googleCalLogic.getEvents(calendarId);
        res.json(events);
    }
    async getCalendars(req: Request, res: Response, next: NextFunction) {
        res.json(await this.googleCalLogic.getCalendars());

    }
}