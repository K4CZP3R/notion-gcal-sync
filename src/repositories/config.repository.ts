import { ConfigModel, IConfig } from "../models/config.model";
import { BaseRepository } from "./base.repository";

export class ConfigRepository extends BaseRepository<IConfig> {
    constructor() {
        super(ConfigModel);
    }

    async getConfig(): Promise<IConfig> {
        return await this.getOne() ?? {}
    }
    async setConfig(config: IConfig): Promise<IConfig> {
        const foundConfig = await this.getOne();
        if (foundConfig) {
            console.log("Updating", foundConfig, config);
            return await this.update(foundConfig._id, config);
        }
        else {
            console.log("Adding", config)
            return await this.addObject(config);
        }
    }
}