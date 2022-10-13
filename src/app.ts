import express from "express";
import helmet from "helmet";
import cors from "cors";

import { IController } from "./models/interfaces/controller.interface";
import { errorMiddleware } from "./middlewares/error.middleware";
import { getEnvironment } from "./helpers/dotenv.helper";
import { createMongooseConnection } from "./services/mongoose-connection.service";
import { configToMongoUrl } from "./helpers/mongo.helper";
import { Environment } from "./models/environment.model";
import { getDebug } from "./helpers/debug.helper";
import { DependencyProviderService } from "./services/dependency-provider.service";
import { GoogleAuthService } from "./services/google-auth.service";
import { GOOGLE_AUTH_SERVICE, GOOGLE_CAL_SERVICE } from "./helpers/di-names.helper";
import { ConfigRepository } from "./repositories/config.repository";
import { GoogleAuthController } from "./controllers/google-auth.controller";
import { GoogleCalController } from "./controllers/google-cal.controller";
import { GoogleCalService } from "./services/google-cal.service";

export class App {
	public app: express.Express;

	private controllers: IController[] = [new GoogleAuthController(), new GoogleCalController()];
	debug: debug.Debugger;
	public appIsReady: boolean;

	constructor() {
		this.appIsReady = false;
		this.debug = getDebug();

		const environemnt = getEnvironment();

		this.debug("Initializing express app");
		this.app = express();

		this.bootstrapApp(environemnt)
			.then(() => {
				this.appIsReady = true;
				this.debug("App bootstrapped!");
			})
			.catch((e: any) => {
				console.error("Something went wrong while bootstrapping", e);
			});
	}

	private async bootstrapApp(environment: Environment) {
		await this.setupDi(environment);
		if (environment.isDev()) await this.seedDatabaseInDev();
		this.setupMiddlewares();
		this.setupControllers();
		this.setupAfterMiddlewares();
	}

	private async setupDi(env: Environment) {
		createMongooseConnection(configToMongoUrl(env.getDatabase()));

		const googleAuthService = new GoogleAuthService(env.getGoogleAuthConfig());
		const config = await new ConfigRepository().getConfig();
		if (config.gcalCredentialsJson) {
			googleAuthService.authenticateWithTokens(JSON.parse(config.gcalCredentialsJson))
		}

		DependencyProviderService.setImpl<GoogleAuthService>(GOOGLE_AUTH_SERVICE, googleAuthService);
		DependencyProviderService.setImpl<GoogleCalService>(GOOGLE_CAL_SERVICE, new GoogleCalService());
	}

	private setupMiddlewares() {
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use(express.json());
	}

	private setupControllers() {
		this.controllers.forEach(controller => {
			this.app.use(controller.path, controller.router);
		});
	}

	private setupAfterMiddlewares() {
		this.app.use(errorMiddleware);
	}

	private async seedDatabaseInDev() {
		/* Define repos and seed here */
	}
}
