import { Customer } from './customer.interface';

export class CustomerGroup {
  CustomerGroupId: number;
  CustomerGroupName: string;
  CustomerGroupLocation: string;
  CustomerGroupLeader: Customer;
  Customers: Customer[];
  CreatedDate: Date | null = null;
  ModifiedDate: Date | null = null;
  CustomerGroupMemberCount: number = 0;
  CustomerGroupLoanTotal: number = 0;
  CustomerGroupLoanPaidAmount: number = 0;
  CustomerGroupLoanOutstanding: number = 0;
  CreatedBy: number = 0;
  ModifiedBy: number = 0;

  constructor(
    CustomerGroupId: number,
    CustomerGroupName: string,
    CustomerGroupLocation: string,
    CustomerGroupLeader: Customer,
    Customers: Customer[]
  ) {
    this.CustomerGroupId = CustomerGroupId;
    this.CustomerGroupName = CustomerGroupName;
    this.CustomerGroupLocation = CustomerGroupLocation;
    this.CustomerGroupLeader = CustomerGroupLeader;
    this.Customers = Customers;
  }
}
