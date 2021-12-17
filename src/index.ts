import express, { Application } from "express";
import rootRouter from "./routes";
import swaggerUI from "swagger-ui-express";

import "reflect-metadata";
import dbConfig from "./config/database";
import { createConnection } from "typeorm";

const app: Application = express();

// connect to db and listen on port
const port = process.env.PORT || 4000;
createConnection(dbConfig).then(() => {
  console.log("connected to db");
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});

// middleware
app.use(express.json());
app.use(express.static("public"));

// swagger docs
app.use(
  "/api_docs",
  swaggerUI.serve,
  swaggerUI.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

// main router
app.use(rootRouter);
