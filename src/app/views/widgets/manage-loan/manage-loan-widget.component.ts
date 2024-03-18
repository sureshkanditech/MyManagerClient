import { CurrencyPipe } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { cilList, cilShieldAlt, cilPlus, cilMinus } from '@coreui/icons';
import { CustomerGroup } from '../../../interfaces/customer-group.interface';
import { Customer } from '../../../interfaces/customer.interface';
import { LoanDetail } from '../../../interfaces/loan-detail.interface';
import * as moment from 'moment';
import { CustomerGroupDto } from 'src/app/interfaces/customer-group-dto.interface';
import { CustomerDto } from 'src/app/interfaces/customer-dto.interface';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  selector: 'app-manage-loan-widget',
  templateUrl: './manage-loan-widget.component.html',
  styleUrls: ['./manage-loan-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageLoanWidgetsComponent implements OnInit {
  parseDate(dateString: any): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return new Date();
  }
  addDays(date: Date, days: any) {
    debugger;
    let currentDate = moment();

    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  txtEMIPerInstallment: any;

  addWorkingDays(date: moment.Moment, days: number) {
    let newDate = date.clone();
    for (let i = 0; i < days; i++) {
      if (newDate.isoWeekday() !== 7) {
        newDate = newDate.add(1, 'days');
      } else {
        newDate = newDate.add(1, 'days');
        i--;
      }
    }
    return newDate.toDate();
  }

  calculateEndDate(event: any) {
    this.loanDetail.LoanStartDate = moment(event.target.value).toDate();
    this.loanDetail.LoanEndDate = this.addWorkingDays(
      moment(this.loanDetail.LoanStartDate),
      100
    );
  }
  calculateInterest() {
    this.loanDetail.LoanAmountWithInterest =
      this.loanDetail.LoanAmount + this.loanDetail.LoanAmount / 10;
    this.txtEMIPerInstallment = (
      this.loanDetail.LoanAmountWithInterest / 100
    ).toFixed(0);
  }
  icons = { cilList, cilShieldAlt, cilPlus, cilMinus };
  expandUser: any;

  @Input()
  type: string | undefined;

  buttonText: string | undefined;

  @Input()
  amount: string | undefined;

  @Input()
  WidgetTitle: string | undefined;

  @Input()
  widgetText: string | undefined;

  @Input()
  progressPercentage: string | undefined;

  @Input()
  selectedCustomerGroup: CustomerGroupDto = new CustomerGroupDto();

  @Input()
  selectedCustomer: CustomerDto = new CustomerDto();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.buttonText = 'Add ' + this.type;
    this.amount = this.applyCurrentPipe(String(this.amount));
  }

  onlyContainsNumbers = (str: string) => /^\d+$/.test(str);

  applyCurrentPipe(str: string): string {
    str = str.replace(',', '');
    if (this.onlyContainsNumbers(str)) {
      return this.currencyPipe.transform(
        str,
        'INR',
        'symbol',
        '0.0-2',
        'en-IN'
      ) as string;
    } else {
      return str;
    }
  }

  public visibleAddEMI = false;
  public visibleAddLoan = false;
  public modalTitle = '';
  public modalSubmitButtonText = '';
  public modalTextboxPlaceholder = '';
  public action = '';
  public modifiedInvestment = 0;

  public loanDetail: LoanDetail = new LoanDetail();

  toggleAddLoanModal() {
    this.visibleAddLoan = !this.visibleAddLoan;
    this.loanDetail = new LoanDetail();
  }

  toggleAddEMIModal() {
    this.visibleAddEMI = !this.visibleAddEMI;
  }

  handleAddEMIChange(event: any) {
    this.visibleAddEMI = event;
  }

  handleAddLoanChange(event: any) {
    this.visibleAddLoan = event;
  }

  openAddNewModal() {
    if (this.type == 'AddLoan') {
      this.openAddNewAddLoan();
    } else if (this.type == 'AddEMI') {
      this.openAddNewAddEMI();
    }
  }

  openAddNewAddEMI() {
    this.modalTitle = 'Add New AddEMI';
    this.modalSubmitButtonText = 'Add';
    this.modalTextboxPlaceholder = 'Investment';
    this.action = 'add';
    this.modifiedInvestment = 0;
    this.visibleAddEMI = true;
  }

  openAddNewAddLoan() {
    this.modalTitle = 'Provide Loan to the Customer:';
    this.modalSubmitButtonText = 'Provide Loan';
    this.modalTextboxPlaceholder = 'Loan Amount';
    this.action = 'deduct';
    this.modifiedInvestment = 0;
    this.visibleAddLoan = true;
  }

  handleModalSubmitEvent(action: any) {
    if (this.type == 'AddLoan') {
      this.loanDetail.LoanGrantedCustomer = this.selectedCustomer.CustomerId;
      this.loanDetail.LoanGrantedCustomerGroup =
        this.selectedCustomerGroup.CustomerGroupId;
      this.loanDetail.LoanTotalInstallments = 100;

      this.addLoan.emit({ loanDetail: this.loanDetail });
      this.visibleAddLoan = false;
    } else if (this.type == 'AddEMI') {
      this.deductEmit.emit({
        deductedInvestment: this.modifiedInvestment,
      });
      this.visibleAddEMI = false;
    }
  }

  @Output() addLoan = new EventEmitter<any>();
  @Output() deductEmit = new EventEmitter<any>();
}
