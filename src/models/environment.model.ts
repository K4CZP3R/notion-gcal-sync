import { IEnvironment } from "./interfaces/environment.interface";
import { IDatabaseConfig } from "./interfaces/orm-database-config.interface";
import { IGoogleAuthConfig } from "./interfaces/google-auth-config.interface";

export class Environment {
	constructor(public env: IEnvironment) { }

	getDatabase(): IDatabaseConfig {
		return {
			username: this.env.DB_USER,
			hostname: this.env.DB_HOST,
			databaseName: this.env.DB_NAME,
			password: this.env.DB_PASS,
			port: this.env.DB_PORT,
			url: this.env.DB_URL,
		};
	}

	getGoogleAuthConfig(): IGoogleAuthConfig {
		return {
			clientId: this.env.GCAL_CLIENT_ID,
			clientSecret: this.env.GCAL_CLIENT_SECRET,
			redirectUri: this.env.GCAL_REDIRECT_URI,
		};
	}


	isDev(): boolean {
		return this.env.ENVIRONMENT === "dev";
	}

}
