import { Schema, model, models } from "mongoose";
import { randomUuid } from "../helpers/mongo.helper";

export interface IConfig {
    _id?: string;
    gcalCredentialsJson?: string;
}

const schema = new Schema<IConfig>({
    _id: randomUuid,
    gcalCredentialsJson: String
}, { timestamps: true });

export const ConfigModel = models.Config || model("Config", schema);