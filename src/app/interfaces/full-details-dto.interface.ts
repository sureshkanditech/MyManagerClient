import { CustomerGroupDto } from './customer-group-dto.interface';
import { CustomerDto } from './customer-dto.interface';

export class FullDetailsCustomerGroupDto {
  CustomerGroupId!: number;
  CustomerGroupName!: string;
  CustomerGroupLocation!: string;
  Status!: boolean;
  CreatedDate!: string;
  CreatedBy!: number;
  ModifiedDate!: string;
  ModifiedBy!: number;
}

export class FullDetailsCustomerDto {
  CustomerId!: number;
  CustomerName!: string;
  CustomerPhone!: string;
  CustomerAddress!: string;
  CustomerAadhaarNumber!: string;
  CustomerPhoto!: string;
  CustomerAadhaarPhoto!: string;
  CustomerStatus!: boolean;
  createdBy!: number;
  createdOn!: string;
  ModifiedBy!: number;
  ModifiedOn!: string;
}

export class FullDetailsCustomerGroupToCustomerMapDTO {
  ParentCustomerGroupId!: number;
  Customer!: CustomerDto;
}

export class FullDetailsInvestmentMastersDto {
  InvestmentMasterId!: number;
  InvestmentAmount!: number;
  LoanAmount!: number;
  OutstandingInvestment!: number;
}

export class FullDetailsLoanDetailDto {
  LoanDetailId!: number;
  LoanAmount!: number;
  LoanAmountWithInterest!: number;
  LoanCollectedAmount!: number;
  GrantedOn!: string;
  GrantedBy!: number;
  LoanGrantedCustomer!: number;
  LoanGrantedCustomerGroup!: number;
  LoanStartDate!: string;
  LoanEndDate!: string;
  LoanTotalInstallments!: number;
}

export class FullDetailsLoanDetailToCustomerMapDTO {
  ParentCustomerId!: number;
  LoanDetail!: FullDetailsLoanDetailDto;
}

export class FullDetailsLoanCollectionDetailDto {
  LoanCollectionId!: number;
  LoanCollectionAmount!: number;
  LoanCollectionBy!: number;
  LoanCollectionForDate!: string;
  LoanCollectionOn!: string;
}
export class FullDetailsLoanDetailToLoanCollectionDetailMapDTO {
  ParentLoanDetailId!: number;
  ParentLoanCustomerId!: number;
  LoanCollectionDetail!: FullDetailsLoanCollectionDetailDto;
}

export class FullDetailsCustomerCollectionDetailDto {
  CreditCollectionId!: number;
  CreditCollectionAmount!: number;
  CreditPerformedBy!: number;
  CreditPerformedOn!: string;
}
export class FullDetailsCreditCollectionDetailToCustomerMapDTO {
  ParentCustomerId!: number;
  CustomerCollectionDetail!: FullDetailsCustomerCollectionDetailDto;
}

export class FullDetailsDto {
  CustomerGroups!: CustomerGroupDto[];
  CustomerGroupToCustomerMapDTOs!: FullDetailsCustomerGroupToCustomerMapDTO[];
  InvestmentMasters!: FullDetailsInvestmentMastersDto[];
  LoanDetailToCustomerMapDTOs!: FullDetailsLoanDetailToCustomerMapDTO[];
  LoanDetailToLoanCollectionDetailMapDTOs!: FullDetailsLoanDetailToLoanCollectionDetailMapDTO[];
  CreditCollectionDetailToCustomerMapDTOs!: FullDetailsCreditCollectionDetailToCustomerMapDTO[];
}
