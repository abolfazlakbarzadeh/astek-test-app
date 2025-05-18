import { Sequelize } from 'sequelize-typescript';
import dotenv from "dotenv";
import {env} from "./env";
import * as path from "node:path";
dotenv.config();

const sequelize = new Sequelize({
    database: env.DB_DATABASE,
    username: env.DB_USERNAME,
    password:env.DB_PASSWORD,
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_DIALECT as any,
    logging: false,
    models: [path.resolve('src', 'models/*.ts')]
});
export {sequelize}