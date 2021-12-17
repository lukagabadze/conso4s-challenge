import { getRepository } from "typeorm";
import { Employee } from "../models";
import QRCode from "qrcode";
import { Request as ExpressRequest } from "express";
import { EmployeeStatus } from "../models/Employee";

export interface CreateEmployeePayload {
  firstName: string;
  lastName: string;
}

export function getEmployees(): Promise<Employee[]> {
  const repository = getRepository(Employee);
  const employees = repository.find();
  return employees;
}

export function createEmployee(
  payload: CreateEmployeePayload
): Promise<Employee> {
  const repository = getRepository(Employee);
  const employee = new Employee();
  return repository.save({ ...employee, ...payload });
}

export async function getEmployee(
  employeeId: string
): Promise<Employee | null> {
  const repository = getRepository(Employee);
  const employee = await repository.findOne(employeeId);

  if (!employee) return null;

  return employee;
}

export async function getEmployeeQRCode(
  employeeId: string,
  req: ExpressRequest
): Promise<string> {
  const repository = getRepository(Employee);
  const employee = await repository.findOne(employeeId);

  if (!employee) return "Employee does not exist";

  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl; // assemble full url
  const baseUrl = fullUrl.split("/").slice(0, -1).join("/"); // base url (without the last part '/qr-code')
  const checkInUrl = baseUrl + "/check-in"; // append the appropriate route

  console.log(fullUrl);
  console.log(baseUrl);
  console.log(checkInUrl);

  const employeeQRCode = await QRCode.toDataURL(checkInUrl); // generate the qr code

  return `<img src='${employeeQRCode}' style='max-width: 400px;width:100%;' />`;
}

export async function checkinEmploy(
  employId: string
): Promise<EmployeeStatus | null> {
  const repository = getRepository(Employee);
  const employee = await repository.findOne(employId);
  if (!employee) return null;

  const isCheckedIn = !!(employee.status === EmployeeStatus.CHECKED_IN);

  const newStatus = isCheckedIn
    ? EmployeeStatus.CHECKED_OUT
    : EmployeeStatus.CHECKED_IN;

  // update the employee with the new status
  return repository
    .createQueryBuilder()
    .update()
    .set({ status: newStatus, lastStatusUpdate: new Date() })
    .where("id = :id", { id: employee.id })
    .returning("status")
    .execute()
    .then((response) => response.raw[0]);
}
