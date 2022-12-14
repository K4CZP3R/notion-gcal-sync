import { GOOGLE_CAL_SERVICE } from "../helpers/di-names.helper";
import { ICalService } from "../models/interfaces/cal-service.interface";
import { DependencyProviderService } from "../services/dependency-provider.service";
import { BaseCalController } from "./base-cal.controller";


export class GoogleCalController extends BaseCalController {


    constructor() {
        super("/google-cal", DependencyProviderService.getImpl<ICalService>(GOOGLE_CAL_SERVICE));
    }

}