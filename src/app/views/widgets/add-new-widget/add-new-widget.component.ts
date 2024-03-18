import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { cilList, cilShieldAlt, cilPlus, cilMinus } from '@coreui/icons';
import { CustomerGroupDto } from 'src/app/interfaces/customer-group-dto.interface';
import { CustomerDto } from 'src/app/interfaces/customer-dto.interface';
import { CustomerGroup } from 'src/app/interfaces/customer-group.interface';
import { Customer } from 'src/app/interfaces/customer.interface';
import {
  FullDetailsCustomerGroupToCustomerMapDTO,
  FullDetailsDto,
} from 'src/app/interfaces/full-details-dto.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-widget',
  templateUrl: './add-new-widget.component.html',
  styleUrls: ['./add-new-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewWidgetsComponent implements OnInit {
  AddhaarVerificationChanged(event: any) {
    this.isAadhaarInUse = false;
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

  isAadhaarVerified: boolean = false;
  isAadhaarInUse: boolean = false;
  AadhaarForVerification: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private currencyPipe: CurrencyPipe,
    private dataService: DataService,
    private customerService: CustomerService
  ) {}

  clickEvent() {
    if (this.isAadhaarVerified) {
      this.handleAddNewCustomerModalSubmitEvent();
    } else {
      this.verifyAadhaar();
    }
  }

  public FullDetailDtos: FullDetailsDto = new FullDetailsDto();
  public existingGroupName: string = '';
  verifyAadhaar() {
    this.FullDetailDtos = this.dataService.getData('FullDetailDtos');
    let customers = this.FullDetailDtos.CustomerGroupToCustomerMapDTOs.filter(
      (x) => x.Customer.CustomerAadhaarNumber == this.AadhaarForVerification
    );
    if (customers.length > 0) {
      let matchedCustomerGroups = this.FullDetailDtos.CustomerGroups.filter(
        (x) => x.CustomerGroupId == customers[0].ParentCustomerGroupId
      );

      if (matchedCustomerGroups.length > 0) {
        this.existingGroupName = matchedCustomerGroups[0].CustomerGroupName;
      }
      this.isAadhaarInUse = true;
    } else {
      this.customerService
        .getCustomersByAadhaar(this.AadhaarForVerification)
        .subscribe({
          next: (data) => {
            this.selectedCustomer = data;
            this.isAadhaarVerified = true;
            this.modalSubmitButtonText = 'Create';
            this.cdr.detectChanges();
            Swal.close();
          },
          error: (message) => {
            this.isAadhaarVerified = true;
            this.selectedCustomer.CustomerAadhaarNumber =
              this.AadhaarForVerification;
            this.modalSubmitButtonText = 'Create';
            this.cdr.detectChanges();
            Swal.close();
          },
        });
    }
  }

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
    this.modalSubmitButtonText = this.isAadhaarVerified
      ? 'Create'
      : 'Verify Aadhaar';
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

  @Output() addCustomer = new EventEmitter<CustomerDto>();
  @Output() addGroup = new EventEmitter<CustomerGroupDto>();
}
