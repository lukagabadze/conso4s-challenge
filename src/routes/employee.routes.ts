import { Router } from "express";
import { EmployeeController } from "../controllers";

const employeeRouter = Router();

employeeRouter.get("/", async (req, res) => {
  const controller = new EmployeeController();

  try {
    const response = await controller.getEmployees();
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
  }
});

employeeRouter.post("/", async (req, res) => {
  const payload = req.body;
  const controller = new EmployeeController();

  try {
    const response = await controller.createEmployee(payload);
    return res.status(201).send(response);
  } catch (err) {
    console.log(err);
  }
});

employeeRouter.get("/:id", async (req, res) => {
  const controller = new EmployeeController();
  const id = req.params.id;

  try {
    const response = await controller.getEmployee(id);
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
  }
});

employeeRouter.get("/:id/qr-code", async (req, res) => {
  const controller = new EmployeeController();
  const id = req.params.id;

  try {
    const response = await controller.getEmployeeQRCode(id, req);
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
  }
});

employeeRouter.get("/:id/check-in", async (req, res) => {
  const controller = new EmployeeController();
  const id = req.params.id;

  try {
    const response = await controller.checkinEmploy(id);
    return res.status(201).send(response);
  } catch (err) {
    console.log(err);
  }
});

export default employeeRouter;
