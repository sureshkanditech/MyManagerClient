export class InvestmentOutstanding {
  TotalInvestment: number;
  TotalLoanedInvestment: number;
  OutstandingInvestment: number;

  constructor(
    TotalInvestment: number,
    TotalLoanedInvestment: number,
    OutstandingInvestment: number
  ) {
    this.TotalInvestment = TotalInvestment;
    this.TotalLoanedInvestment = TotalLoanedInvestment;
    this.OutstandingInvestment = OutstandingInvestment;
  }
}
