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
import { CustomerGroupDto } from '../../../interfaces/customer-group-dto.interface';
import { CustomerDto } from '../../../interfaces/customer-dto.interface';
import { CustomerGroup } from '../../../interfaces/customer-group.interface';
import { Customer } from '../../../interfaces/customer.interface';
import {
  FullDetailsCustomerDto,
  FullDetailsCustomerGroupToCustomerMapDTO,
  FullDetailsDto,
} from '../../../interfaces/full-details-dto.interface';
import { LoanDetail } from '../../../interfaces/loan-detail.interface';
import { CustomerService } from '../../../services/customer.service';
import { DataService } from '../../../services/data.service';
import Swal from 'sweetalert2';
import { LoanDetailService } from '../../../services/loan-detail.service';
import * as moment from 'moment';
import { LoanCollectionDetailService } from '../../../services/loan-collection-detail.service';
import { LoanCollectionDetail } from '../../../interfaces/loan-collection-detail-dto.interface';

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
  selector: 'app-list-customer-group-widget',
  templateUrl: './list-customer-group-widget.component.html',
  styleUrls: ['./list-customer-group-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCustomerGroupWidgetsComponent implements OnInit {
  createdBy: number = 0;

  addEMI(event: any) {
    this.loanCollectionDetailService
      .addInstallment(event.loanCollectionDetail)
      .subscribe({
        next: (data) => {
          this.dataService.addData('FullDetailDtos', data);
          this.processFullDetailsDtoData();
          Swal.close();
        },
        error: (message) => {
          Swal.fire('Error', message, 'error');
        },
      });
  }

  addLoan(event: any) {
    this.createNewLoanDetail(event.loanDetail, this.createdBy);
  }

  createNewLoanDetail(loanDetail: LoanDetail, createdBy: number) {
    this.loanDetailService
      .createNewLoanDetail(loanDetail, createdBy)
      .subscribe({
        next: (data) => {
          this.dataService.addData('FullDetailDtos', data);
          this.processFullDetailsDtoData();
          Swal.close();
        },
        error: (message) => {
          Swal.fire('Error', message, 'error');
        },
      });
  }

  addCustomer(addedCustomer: CustomerDto) {
    let CustomerGroupToCustomerMapDTO: FullDetailsCustomerGroupToCustomerMapDTO =
      new FullDetailsCustomerGroupToCustomerMapDTO();
    CustomerGroupToCustomerMapDTO.Customer = addedCustomer;
    CustomerGroupToCustomerMapDTO.ParentCustomerGroupId =
      this.selectedCustomerGroup.CustomerGroupId;

    this.customerService.AddCustomer(CustomerGroupToCustomerMapDTO).subscribe({
      next: (data) => {
        // this.selectedCustomerGroup.Customers.push(addedCustomer);
        this.dataService.addData('FullDetailDtos', data);
        this.processFullDetailsDtoData();
        Swal.close();
      },
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }

  icons = { cilList, cilShieldAlt, cilPlus, cilMinus };
  expandUser: any;

  items = [1, 2, 3, 4];

  public users: IUser[] = [
    {
      name: 'Yiorgos Avraamu',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Us',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/img/avatars/1.jpg',
      status: 'success',
      color: 'success',
    },
    {
      name: 'Avram Tarasios',
      state: 'Recurring ',
      registered: 'Jan 1, 2021',
      country: 'Br',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: './assets/img/avatars/2.jpg',
      status: 'danger',
      color: 'info',
    },
    {
      name: 'Quintin Ed',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'In',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: './assets/img/avatars/3.jpg',
      status: 'warning',
      color: 'warning',
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/img/avatars/4.jpg',
      status: 'secondary',
      color: 'danger',
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/img/avatars/5.jpg',
      status: 'success',
      color: 'primary',
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/img/avatars/6.jpg',
      status: 'info',
      color: 'dark',
    },
  ];

  @Input()
  selectedCustomerGroup: CustomerGroupDto = new CustomerGroupDto();

  @Input()
  amount: string | undefined;

  @Input()
  WidgetTitle: string | undefined;

  @Input()
  widgetText: string | undefined;

  @Input()
  progressPercentage: string | undefined;

  public FullDetailDtos: FullDetailsDto = new FullDetailsDto();
  public InvestmentMasters: any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private currencyPipe: CurrencyPipe,
    private customerService: CustomerService,
    private dataService: DataService,
    private loanDetailService: LoanDetailService,
    private loanCollectionDetailService: LoanCollectionDetailService
  ) {}

  ngOnInit(): void {
    this.amount = this.applyCurrentPipe(String(this.amount));
    this.processFullDetailsDtoData();
  }

  processFullDetailsDtoData() {
    this.FullDetailDtos = this.dataService.getData('FullDetailDtos');

    this.InvestmentMasters = this.FullDetailDtos.InvestmentMasters;

    this.FullDetailDtos.CustomerGroups.forEach((e) => {
      e.Customers = this.getCurrentCustomerGroupCustomers(e);
    });

    this.FullDetailDtos.CustomerGroups.forEach((e) => {
      e.Customers.forEach((c) => {
        c.CustomerLoanTotal = this.getCurrentCustomerLoanAmount(c);
        c.CustomerLoanCollectedAmout =
          this.getCurrentCustomerLoanCollectedAmount(c);
        c.CustomerLoanStartDate = this.getCurrentCustomerLoanStartDate(c);
        c.CustomerLoanEndDate = this.getCurrentCustomerLoanEndDate(c);
      });
    });

    let searchedCustomerGroups = this.FullDetailDtos.CustomerGroups.filter(
      (x) => x.CustomerGroupId == this.selectedCustomerGroup.CustomerGroupId
    );
    if (searchedCustomerGroups.length > 0) {
      this.selectedCustomerGroup = searchedCustomerGroups[0];
    }
  }
  getCurrentCustomerGroupCustomers(currentCustomerGroup: any): CustomerDto[] {
    return this.FullDetailDtos.CustomerGroupToCustomerMapDTOs.filter(
      (x) => x.ParentCustomerGroupId == currentCustomerGroup.CustomerGroupId
    ).map((y) => y.Customer);
  }

  getCurrentCustomerLoanAmount(currentCustomer: any) {
    return this.FullDetailDtos.LoanDetailToCustomerMapDTOs.filter(
      (x) => x.ParentCustomerId == currentCustomer.CustomerId
    )
      .map((y) => y.LoanDetail)
      .reduce(
        (sum, current) =>
          sum +
          (current.LoanAmountWithInterest == null
            ? 0
            : current.LoanAmountWithInterest),
        0
      );
  }

  getCurrentCustomerLoanCollectedAmount(currentCustomer: any) {
    return this.FullDetailDtos.LoanDetailToLoanCollectionDetailMapDTOs.filter(
      (x) => x.ParentLoanCustomerId == currentCustomer.CustomerId
    )
      .map((y) => y.LoanCollectionDetail)
      .reduce(
        (sum, current) =>
          sum +
          (current.LoanCollectionAmount == null
            ? 0
            : current.LoanCollectionAmount),
        0
      );
  }

  getCurrentCustomerLoanStartEndDateText(currentCustomer: any) {
    let fullDetailDtosForCurrentCustomer =
      this.FullDetailDtos.LoanDetailToCustomerMapDTOs.filter(
        (x) => x.ParentCustomerId == currentCustomer.CustomerId
      );
    if (fullDetailDtosForCurrentCustomer.length > 0) {
      return (
        'Start: ' +
        this.getCurrentCustomerLoanStartDate(fullDetailDtosForCurrentCustomer) +
        ' | End: ' +
        this.getCurrentCustomerLoanEndDate(fullDetailDtosForCurrentCustomer)
      );
    } else {
      return '';
    }
  }

  getCurrentCustomerLoanStartDate(currenctCustomer: any) {
    return moment(
      this.FullDetailDtos.LoanDetailToCustomerMapDTOs.filter(
        (x) => x.ParentCustomerId == currenctCustomer.CustomerId
      )
        .map((y: any) => y.LoanDetail.LoanStartDate)
        .join()
    ).toDate();
    //.format('YYYY-MM-DD HH:mm');
  }

  getCurrentCustomerLoanEndDate(currenctCustomer: any) {
    return moment(
      this.FullDetailDtos.LoanDetailToCustomerMapDTOs.filter(
        (x) => x.ParentCustomerId == currenctCustomer.CustomerId
      )
        .map((y: any) => y.LoanDetail.LoanEndDate)
        .join()
    ).toDate();
    //.format('YYYY-MM-DD HH:mm');
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

  public visible = false;
  public modalTitle = '';
  public modalSubmitButtonText = '';
  public modalTextboxPlaceholder = '';
  public action = '';
  public modifiedInvestment = 0;

  public profileCustomerSelected: CustomerDto | undefined;

  toggleProfileModal(_profileCustomerSelected: CustomerDto | undefined) {
    this.visible = !this.visible;
    this.profileCustomerSelected = _profileCustomerSelected;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  openAddInvestment() {
    this.modalTitle = 'Add Investment';
    this.modalSubmitButtonText = 'Add';
    this.modalTextboxPlaceholder = 'Investment';
    this.action = 'add';
    this.modifiedInvestment = 0;
    this.visible = true;
  }

  openDeductInvestment() {
    this.modalTitle = 'Deduct Investment';
    this.modalSubmitButtonText = 'Deduct';
    this.modalTextboxPlaceholder = 'Investment';
    this.action = 'deduct';
    this.modifiedInvestment = 0;
    this.visible = true;
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
    this.visible = false;
  }

  @Output() addInvestment = new EventEmitter<any>();
  @Output() deductInvestment = new EventEmitter<any>();
}
