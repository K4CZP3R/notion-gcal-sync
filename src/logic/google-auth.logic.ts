import { GOOGLE_AUTH_SERVICE } from "../helpers/di-names.helper";
import { IResult } from "../models/interfaces/result.interface";
import { ConfigRepository } from "../repositories/config.repository";
import { Inject } from "../services/dependency-provider.service";
import { GoogleAuthService } from "../services/google-auth.service";

export class GoogleAuthLogic {
    @Inject<GoogleAuthService>(GOOGLE_AUTH_SERVICE)
    googleAuthService!: GoogleAuthService

    constructor(private configRepository: ConfigRepository = new ConfigRepository()) { }

    getAuthUrl(): IResult<string> {
        return { success: true, data: this.googleAuthService.generateAuthUrl() }
    }

    async authorizeWithCode(code: string): Promise<IResult<void>> {
        const tokens = await this.googleAuthService.getTokensFromCode(code);

        const currentConfig = await this.configRepository.getConfig();

        currentConfig.gcalCredentialsJson = JSON.stringify(tokens);

        await this.configRepository.setConfig(currentConfig);
        this.googleAuthService.authenticateWithTokens(JSON.parse(currentConfig.gcalCredentialsJson));

        return { success: true, message: "Authorized!" }
    }
}