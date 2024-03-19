import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { getStyle, rgbToHex } from '@coreui/utils';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomerGroup } from '../../interfaces/customer-group.interface';
import Swal from 'sweetalert2';
import { CustomerGroupService } from '../../services/customer-group.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { cilList, cilShieldAlt, cilPlus, cilMinus } from '@coreui/icons';
import { CustomerGroupDto } from '../../interfaces/customer-group-dto.interface';
import { FullDetailsDto } from '../../interfaces/full-details-dto.interface';
import { DataService } from '../../services/data.service';
import { CustomerDto } from '../../interfaces/customer-dto.interface';

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
  templateUrl: 'group.component.html',
  styleUrls: ['./group.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('300ms', style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class GroupComponent implements OnInit, AfterContentChecked {
  visibleGroupDeleteModal: boolean = false;
  toggleGroupDeleteModal() {
    this.visibleGroupDeleteModal = !this.visibleGroupDeleteModal;
  }
  handleGroupDeleteModalChange(event: boolean) {
    this.visibleGroupDeleteModal = event;
  }

  handleGroupDeleteModalSubmit() {
    throw new Error('Method not implemented.');
  }
  openGroupDeleteModal() {
    this.visibleGroupDeleteModal = true;
  }
  icons = { cilList, cilShieldAlt, cilPlus, cilMinus };

  clickAccordion(btnId: string) {
    let button: HTMLElement = document.getElementById(btnId) as HTMLElement;
    button.click();
  }

  customerGroupList: CustomerGroupDto[] = [];
  filteredCustomerGroups: CustomerGroupDto[] = [];
  expandUser: any;
  searchString: string = '';

  items = [1, 2, 3, 4];
  //items = ['First', 'Second', 'Third'];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cdref: ChangeDetectorRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private customerGroupService: CustomerGroupService,
    private dataService: DataService
  ) {}

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

  public themeColors(): void {
    Array.from(this.document.querySelectorAll('.theme-color')).forEach(
      (element: Element) => {
        const htmlElement = element as HTMLElement;
        const background = getStyle('background-color', htmlElement) ?? '#fff';
        const table = this.renderer.createElement('table');
        table.innerHTML = `
          <table class="table w-100">
            <tr>
              <td class="text-muted">HEX:</td>
              <td class="font-weight-bold">${rgbToHex(background)}</td>
            </tr>
            <tr>
              <td class="text-muted">RGB:</td>
              <td class="font-weight-bold">${background}</td>
            </tr>
          </table>
        `;
        this.renderer.appendChild(htmlElement.parentNode, table);
        // @ts-ignore
        // el.parentNode.appendChild(table);
      }
    );
  }

  ngOnInit(): void {
    // this.GetCustomerGroups();
    this.GetFullDetailsDtos();
  }

  fullDetailDtos!: FullDetailsDto;

  GetFullDetailsDtos() {
    Swal.fire({
      title: 'Please wait...',
      allowOutsideClick: false,
      icon: 'info',
    });
    Swal.showLoading();

    return this.customerGroupService.getFullDetailsDtos().subscribe({
      next: (data) => {
        this.processFullDetailsDtoData(data);
        Swal.close();
      },
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }
  processFullDetailsDtoData(data: FullDetailsDto) {
    this.fullDetailDtos = data;
    this.fullDetailDtos.CustomerGroups.forEach((e) => {
      e.Customers = this.getCurrentCustomerGroupCustomers(e);
    });
    this.fullDetailDtos.CustomerGroups.forEach((e) => {
      e.CustomerGroupLoanTotal = this.getCurrentCustomerGroupLoanAmount(e);
      e.CustomerGroupLoanPaidAmount =
        this.getCurrentCustomerGroupLoanCollectedAmount(e);
    });
    this.filteredCustomerGroups = this.fullDetailDtos.CustomerGroups;
    this.customerGroupList = this.fullDetailDtos.CustomerGroups;
    this.dataService.addData('FullDetailDtos', this.fullDetailDtos);
  }

  getCurrentCustomerGroupCustomers(currentCustomerGroup: any): CustomerDto[] {
    return this.fullDetailDtos.CustomerGroupToCustomerMapDTOs.filter(
      (x) => x.ParentCustomerGroupId == currentCustomerGroup.CustomerGroupId
    ).map((y) => y.Customer);
  }

  getCurrentCustomerGroupLoanAmount(currentCustomerGroup: any) {
    return this.fullDetailDtos.LoanDetailToCustomerMapDTOs.filter((x) =>
      (currentCustomerGroup.Customers
        ? currentCustomerGroup.Customers.map((c) => c.CustomerId)
        : []
      ).includes(x.ParentCustomerId)
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

  anotherCount: number = 0;

  getCurrentCustomerGroupLoanCollectedAmount(currentCustomerGroup: any) {
    this.anotherCount++;
    console.log(this.anotherCount);
    return this.fullDetailDtos.LoanDetailToLoanCollectionDetailMapDTOs.filter(
      (x) =>
        (currentCustomerGroup.Customers
          ? currentCustomerGroup.Customers.map((c: any) => c.CustomerId)
          : []
        ).includes(x.ParentLoanDetailId)
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

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  GetCustomerGroups() {
    Swal.fire({
      title: 'Please wait...',
      allowOutsideClick: false,
      icon: 'info',
    });
    Swal.showLoading();

    return this.customerGroupService.getCustomerGroups().subscribe({
      next: (data) => {
        this.customerGroupList = data;
        this.filteredCustomerGroups = this.customerGroupList;
        Swal.close();
      },
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }

  filterResults() {
    const text = this.searchString;
    if (!text) {
      this.filteredCustomerGroups = this.customerGroupList;
      return;
    }

    this.filteredCustomerGroups = this.customerGroupList.filter(
      (CustomerGroupDto) =>
        CustomerGroupDto?.CustomerGroupId.toString()
          .toLowerCase()
          .includes(text.toLowerCase()) ||
        CustomerGroupDto?.CustomerGroupName.toLowerCase().includes(
          text.toLowerCase()
        ) ||
        CustomerGroupDto?.CustomerGroupLocation.toLowerCase().includes(
          text.toLowerCase()
        ) ||
        CustomerGroupDto?.Customers?.filter((cust) =>
          cust.searchCustomer(text.toLowerCase())
        )?.length > 0
    );
  }

  addNewCustomerGroup(addGroup: CustomerGroupDto) {
    console.log(addGroup);
    this.customerGroupService.AddCustomerGroup(addGroup, 2).subscribe({
      next: (data) => {
        this.processFullDetailsDtoData(data);
        this.filterResults();
        Swal.close();
      },
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }
}

@Component({
  selector: 'app-theme-color',
  template: `
    <c-col xl="2" md="4" sm="6" xs="12" class="my-4 ms-4">
      <div [ngClass]="colorClasses" style="padding-top: 75%;"></div>
      <ng-content></ng-content>
    </c-col>
  `,
})
export class ThemeColorComponent implements OnInit {
  @Input() color = '';
  public colorClasses = {
    'theme-color w-75 rounded mb-3': true,
  };

  @HostBinding('style.display') display = 'contents';

  ngOnInit(): void {
    this.colorClasses = {
      ...this.colorClasses,
      [`bg-${this.color}`]: !!this.color,
    };
  }
}
