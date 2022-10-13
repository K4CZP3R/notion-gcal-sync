import { Auth, google } from "googleapis";

export class GoogleAuthService {

    private oauthClient: Auth.OAuth2Client;

    // private calendar:
    constructor(oauthConfig: {
        clientId: string;
        clientSecret: string;
        redirectUri: string;
    }) {

        this.oauthClient = new google.auth.OAuth2({
            clientId: oauthConfig.clientId,
            clientSecret: oauthConfig.clientSecret,
            redirectUri: oauthConfig.redirectUri,
        });
    }


    getOauthClient() {
        return this.oauthClient;
    }

    generateAuthUrl(): string {
        const scopes = [
            'https://www.googleapis.com/auth/calendar',
        ]



        return this.oauthClient.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
        })
    }

    async getTokensFromCode(code: string): Promise<Auth.Credentials> {
        return (await this.oauthClient.getToken(code)).tokens;
    }


    authenticateWithTokens(tokens: Auth.Credentials) {
        this.oauthClient.setCredentials(tokens);
    }

}