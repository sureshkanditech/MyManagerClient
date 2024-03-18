export class CustomerDto {
  CustomerId!: number;
  CustomerName!: string;
  CustomerPhone!: string;
  CustomerAddress!: string;
  CustomerAadhaarNumber!: string;
  CustomerPhoto!: string;
  CustomerAadhaarPhoto!: string;
  CustomerStatus!: boolean;
  CustomerLoanTotal!: number;
  CustomerLoanCollectedAmout!: number;
  CustomerLoanStartDate!: Date | null;
  CustomerLoanEndDate!: Date | null;
  CreatedBy!: number;
  CreatedOn!: string;
  ModifiedBy!: number;
  ModifiedOn!: string;
  LoanDetail!: {
    LoanId: number;
    LoanAmount: number;
    LoanAmountWithInterest: number;
    LoanCollectedAmount: number;
    GrantedOn: string;
    GrantedBy: number;
    LoanGrantedCustomer: number;
    LoanGrantedCustomerGroup: number;
    LoanStartDate: string;
    LoanEndDate: string;
    LoanTotalInstallments: number;
  };

  searchCustomer(text: string) {
    return (
      this.CustomerId.toString().toLowerCase().includes(text.toLowerCase()) ||
      this.CustomerName.toLowerCase().includes(text.toLowerCase()) ||
      this.CustomerPhone.toLowerCase().includes(text.toLowerCase()) ||
      this.CustomerAddress.toLowerCase().includes(text.toLowerCase()) ||
      this.CustomerAadhaarNumber.toLowerCase().includes(text.toLowerCase())
    );
  }
}
