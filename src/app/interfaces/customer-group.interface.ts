import { Customer } from './customer.interface';

export class CustomerGroup {
  CustomerGroupId: number;
  CustomerGroupName: string;
  CustomerGroupLocation: string;
  CustomerGroupLeader: Customer;
  Customers: Customer[];
  CreatedDate: Date | null = null;
  ModifiedDate: Date | null = null;

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
