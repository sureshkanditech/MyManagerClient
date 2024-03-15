import {
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
import { CustomerGroup } from 'src/app/interfaces/customer-group.interface';
import Swal from 'sweetalert2';
import { CustomerGroupService } from 'src/app/services/customer-group.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { cilList, cilShieldAlt, cilPlus, cilMinus } from '@coreui/icons';

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
export class GroupComponent implements OnInit {
  icons = { cilList, cilShieldAlt, cilPlus, cilMinus };

  clickAccordion(btnId: string) {
    let button: HTMLElement = document.getElementById(btnId) as HTMLElement;
    button.click();
  }

  customerGroupList: CustomerGroup[] = [];
  filteredCustomerGroups: CustomerGroup[] = [];
  expandUser: any;
  searchString: string = '';

  items = [1, 2, 3, 4];
  //items = ['First', 'Second', 'Third'];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private customerGroupService: CustomerGroupService
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
    this.GetCustomerGroups();
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
      (customerGroup) =>
        customerGroup?.CustomerGroupId.toString()
          .toLowerCase()
          .includes(text.toLowerCase()) ||
        customerGroup?.CustomerGroupName.toLowerCase().includes(
          text.toLowerCase()
        ) ||
        customerGroup?.CustomerGroupLocation.toLowerCase().includes(
          text.toLowerCase()
        ) ||
        customerGroup?.Customers?.filter((cust) =>
          cust.searchCustomer(text.toLowerCase())
        )?.length > 0
    );
  }

  getAccordionBodyText(value: string) {
    const textSample = `
      <strong>This is the <mark>#${value}</mark> item accordion body.</strong> It is hidden by
      default, until the collapse plugin adds the appropriate classes that we use to
      style each element. These classes control the overall appearance, as well as
      the showing and hiding via CSS transitions. You can modify any of this with
      custom CSS or overriding our default variables. It&#39;s also worth noting
      that just about any HTML can go within the <code>.accordion-body</code>,
      though the transition does limit overflow.
    `;
    return this.sanitizer.bypassSecurityTrustHtml(textSample);
  }

  addNewCustomerGroup(addGroup: CustomerGroup) {
    console.log(addGroup);
    this.customerGroupService.AddCustomerGroup(addGroup, 2).subscribe({
      next: (data) => {
        this.customerGroupList = data;
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
