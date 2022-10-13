import { NOTION_CAL_SERVICE } from "../helpers/di-names.helper";
import { ICalService } from "../models/interfaces/cal-service.interface";
import { DependencyProviderService } from "../services/dependency-provider.service";
import { BaseCalController } from "./base-cal.controller";

export class NotionCalController extends BaseCalController {

    constructor() {
        super("/notion-cal", DependencyProviderService.getImpl<ICalService>(NOTION_CAL_SERVICE))
    }
}
