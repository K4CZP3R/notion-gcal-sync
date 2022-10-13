import { NextFunction, Request, Response } from "express";
import { GoogleAuthLogic } from "../logic/google-auth.logic";
import { IRoute } from "../models/interfaces/route.interface";
import { BaseController } from "./base.controller";

export class GoogleAuthController extends BaseController {
    public routes: IRoute[] = [
        {
            path: "/",
            method: "GET",
            func: this.onStartAuth.bind(this),
        },
        {
            path: "/callback",
            method: "GET",
            func: this.onEndAuth.bind(this)
        }
    ];


    constructor(private googleAuthLogic = new GoogleAuthLogic()) {
        super({ path: "/google-auth" })
        this.loadRoutes();
    }

    async onStartAuth(req: Request, res: Response, next: NextFunction) {
        res.json(this.googleAuthLogic.getAuthUrl());
    }

    async onEndAuth(req: Request, res: Response, next: NextFunction) {
        const { code } = req.query;
        const resp = await this.googleAuthLogic.authorizeWithCode(code as string);
        res.json(resp);

    }
}