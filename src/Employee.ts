import { PensionPlan } from "./PensionPlan";

export class Employee {
  public pensionPlan?: PensionPlan;

  constructor(
    public employeeId: number,
    public firstName: string,
    public lastName: string,
    public employmentDate: Date,
    public yearlySalary: number,
  ) {}
}
