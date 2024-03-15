import { User } from './user.interface';

export class InvestmentTransaction {
  TransId: number;
  InvestmentBy: User;
  InvestmentAmount: string;
  InvestmentOn: Date;

  constructor(
    TransId: number,
    InvestmentBy: User,
    InvestmentAmount: string,
    InvestmentOn: Date
  ) {
    this.TransId = TransId;
    this.InvestmentBy = InvestmentBy;
    this.InvestmentAmount = InvestmentAmount;
    this.InvestmentOn = InvestmentOn;
  }
}
