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

export class App {
	public app: express.Express;

	private controllers: IController[] = [];
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
		this.setupDi(environment);
		if (environment.isDev()) await this.seedDatabaseInDev();
		this.setupMiddlewares();
		this.setupControllers();
		this.setupAfterMiddlewares();
	}

	private setupDi(env: Environment) {
		createMongooseConnection(configToMongoUrl(env.getDatabase()));
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
