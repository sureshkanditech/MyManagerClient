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
  selector: 'app-manage-customer-group-customer-map-widget',
  templateUrl: './manage-customer-group-customer-map-widget.component.html',
  styleUrls: ['./manage-customer-group-customer-map-widget.component.scss'],
  // changeDetection: ChangeDetectionStrategy.Default,
})
export class ManageCustomerGroupCustomerMapWidgetsComponent implements OnInit {
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

  // ngAfterContentInit(): void {
  //   this.amount = this.applyCurrentPipe(String(this.amount));
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

  public visibleModal = false;
  public visibleGroup = false;
  public modalTitle = '';
  public modalSubmitButtonText = '';
  public modalTextboxPlaceholder = '';
  public action = '';
  public modifiedInvestment = 0;

  toggleCustomModal() {
    this.visibleModal = !this.visibleModal;
  }

  handleCustomerModalChange(event: any) {
    this.visibleGroup = event;
  }

  openManageMappingModal() {
    this.modalTitle = 'Remove Customer from the Group?';
    this.modalSubmitButtonText = 'Remove';
    this.modalTextboxPlaceholder = 'Investment';
    this.action = 'add';
    this.modifiedInvestment = 0;
    this.visibleModal = true;
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
    this.visibleModal = false;
  }

  @Output() addInvestment = new EventEmitter<any>();
  @Output() deductInvestment = new EventEmitter<any>();
}
