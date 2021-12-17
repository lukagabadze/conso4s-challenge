import { Request as ExpressRequest } from "express";
import { Body, Get, Path, Post, Route, Header, Request } from "tsoa";
import { Employee } from "../models";
import { EmployeeStatus } from "../models/Employee";
import { employeeRepo } from "../repositories";

@Route("employee")
export default class EmployeeController {
  @Get("/")
  public async getEmployees(): Promise<Employee[]> {
    return employeeRepo.getEmployees();
  }

  @Post("/")
  public async createEmployee(
    @Body() payload: employeeRepo.CreateEmployeePayload
  ): Promise<Employee> {
    return employeeRepo.createEmployee(payload);
  }

  @Get("/:id")
  public async getEmployee(@Path() id: string): Promise<Employee | null> {
    return employeeRepo.getEmployee(id);
  }

  @Get("/:id/qr-code")
  public async getEmployeeQRCode(
    @Path() id: string,
    @Request() request: ExpressRequest
  ): Promise<string> {
    return employeeRepo.getEmployeeQRCode(id, request);
  }

  @Get("/:id/check-in")
  public async checkinEmploy(
    @Path() id: string
  ): Promise<EmployeeStatus | null> {
    return employeeRepo.checkinEmploy(id);
  }
}
