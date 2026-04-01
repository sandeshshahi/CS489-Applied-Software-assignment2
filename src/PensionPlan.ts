export class PensionPlan {
  constructor(
    public planReferenceNumber: string,
    public enrollmentDate: Date,
    public monthlyContribution: number,
  ) {}
}
