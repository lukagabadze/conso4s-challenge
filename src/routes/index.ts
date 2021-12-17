import { Router } from "express";
import employeeRouter from "./employee.routes";

const rootRouter = Router();

rootRouter.use("/employee", employeeRouter);

export default rootRouter;
