import { CustomerDto } from './customer-dto.interface';

export class CustomerGroupDto {
  CustomerGroupId!: number;
  CustomerGroupName!: string;
  CustomerGroupLocation!: string;
  Status!: boolean;
  CreatedDate!: string;
  CreatedBy!: number;
  ModifiedDate!: string;
  ModifiedBy!: number;
  CustomerGroupLoanTotal!: number;
  CustomerGroupLoanPaidAmount!: number;
  CustomerGroupMemberCount!: number;
  Customers!: CustomerDto[];
}
