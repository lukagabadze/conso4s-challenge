import { ConnectionOptions } from "typeorm";
import { Employee } from "../models";

const host = process.env.POSTGRES_HOST || "localhost";
const port = Number(process.env.POSTGRES_PORT) || 5432;
const database = process.env.POSTGRES_DATABASE || "postgres";
const username = process.env.POSTGRES_USERNAME || "postgres";
const password = process.env.POSTGRES_PASSWORD || "postgres";

const dbConfig: ConnectionOptions = {
  type: "postgres",
  host,
  port,
  database,
  username,
  password,
  synchronize: true,
  entities: [Employee],
};

export default dbConfig;
