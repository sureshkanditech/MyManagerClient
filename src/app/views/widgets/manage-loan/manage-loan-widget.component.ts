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
  selectedCustomerGroup: CustomerGroup = new CustomerGroup(
    0,
    '',
    '',
    new Customer(0, '', '', '', '', null, null),
    []
  );

  @Input()
  selectedCustomer: Customer = new Customer(0, '', '', '', '', null, null);

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.buttonText = 'Add ' + this.type;
    this.amount = this.applyCurrentPipe(String(this.amount));
  }

  // ngAfterContentInit(): void {
  //   this.amount = this.applyCurrentPipe(String(this.amount));
  //   // this.WidgetData = this.WidgetData.map((el: any) => {
  //   //   return {
  //   //     ...el,
  //   //     Amount: this.applyCurrentPipe(el.Amount),
  //   //     Text: '',
  //   //   };
  //   // });

  //   // this.changeDetectorRef.detectChanges();
  // }

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

  toggleAddLoanModal() {
    this.visibleAddLoan = !this.visibleAddLoan;
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
    console.log(action);
    if (action == 'add') {
      this.addInvestment.emit({ addedInvestment: this.modifiedInvestment });
    } else {
      this.deductInvestment.emit({
        deductedInvestment: this.modifiedInvestment,
      });
    }
    this.visibleAddEMI = false;
  }

  @Output() addInvestment = new EventEmitter<any>();
  @Output() deductInvestment = new EventEmitter<any>();
}
