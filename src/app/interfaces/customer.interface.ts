export class Customer {
  CustomerId: number;
  CustomerName: string;
  CustomerPhone: string;
  CustomerAddress: string;
  CustomerAadhaarNumber: string;
  CustomerPhoto: File | null;
  CustomerAadhaarPhoto: File | null;

  constructor(
    CustomerId: number,
    CustomerName: string,
    CustomerPhone: string,
    CustomerAddress: string,
    CustomerAadhaarNumber: string,
    CustomerPhoto: File | null,
    CustomerAadhaarPhoto: File | null
  ) {
    this.CustomerId = CustomerId;
    this.CustomerName = CustomerName;
    this.CustomerPhone = CustomerPhone;
    this.CustomerAddress = CustomerAddress;
    this.CustomerAadhaarNumber = CustomerAadhaarNumber;
    this.CustomerPhoto = CustomerPhoto;
    this.CustomerAadhaarPhoto = CustomerAadhaarPhoto;
  }

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
