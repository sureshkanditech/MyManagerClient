import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { cilList, cilShieldAlt, cilPlus, cilMinus } from '@coreui/icons';
import { CustomerGroup } from 'src/app/interfaces/customer-group.interface';
import { Customer } from 'src/app/interfaces/customer.interface';

@Component({
  selector: 'app-add-new-widget',
  templateUrl: './add-new-widget.component.html',
  styleUrls: ['./add-new-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewWidgetsComponent implements OnInit {
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

  constructor(private currencyPipe: CurrencyPipe) {}

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

  public visibleCustomer = false;
  public visibleGroup = false;
  public modalTitle = '';
  public modalSubmitButtonText = '';

  toggleCustomerGroupModal() {
    this.visibleGroup = !this.visibleGroup;
  }

  toggleCustomerModal() {
    this.visibleCustomer = !this.visibleCustomer;
  }

  handleCustomerChange(event: any) {
    this.visibleCustomer = event;
  }

  handleCustomerGroupChange(event: any) {
    this.visibleGroup = event;
  }

  openAddNewModal() {
    if (this.type == 'Customer') {
      this.openAddNewCustomer();
    } else if (this.type == 'Group') {
      this.openAddNewCustomerGroup();
    }
  }

  openAddNewCustomer() {
    this.modalTitle = 'Add New Customer';
    this.modalSubmitButtonText = 'Create';
    this.visibleCustomer = true;
  }

  openAddNewCustomerGroup() {
    this.modalTitle = 'Add New Customer Group';
    this.modalSubmitButtonText = 'Create';
    this.visibleGroup = true;
  }

  handleAddNewGroupModalSubmitEvent() {
    this.addGroup.emit(this.selectedCustomerGroup);
    this.visibleGroup = false;
  }

  handleAddNewCustomerModalSubmitEvent() {
    this.addCustomer.emit(this.selectedCustomer);
    this.visibleCustomer = false;
  }

  @Output() addCustomer = new EventEmitter<Customer>();
  @Output() addGroup = new EventEmitter<CustomerGroup>();
}
