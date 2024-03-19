import { Component, OnInit } from '@angular/core';
import { CustomerGroupService } from 'src/app/services/customer-group.service';
import Swal from 'sweetalert2';
import { TransactionsDTO } from '../../interfaces/transaction-dto.interface';

@Component({
  templateUrl: 'customer.component.html',
})
export class CustomerComponent implements OnInit {
  constructor(private customerGroupService: CustomerGroupService) {}

  todayDate;
  CollectionTotal;
  LoanTotal;

  collectionDetails: TransactionsDTO[] = [];
  loanDetails: TransactionsDTO[] = [];
  ngOnInit(): void {
    this.todayDate = new Date();
    this.GetFullDetailsDtos();
  }

  GetFullDetailsDtos() {
    Swal.fire({
      title: 'Please wait...',
      allowOutsideClick: false,
      icon: 'info',
    });
    Swal.showLoading();

    return this.customerGroupService.getTodaysTransactions().subscribe({
      next: (data) => {
        this.collectionDetails = data[0];
        this.CollectionTotal = this.collectionDetails
          .map((p) => p.Amount)
          .reduce((sum, current) => sum + (current == null ? 0 : current), 0);

        this.loanDetails = data[1];
        console.log(this.loanDetails);
        this.LoanTotal = this.loanDetails
          .map((p) => p.Amount)
          .reduce((sum, current) => sum + (current == null ? 0 : current), 0);
        Swal.close();
      },
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }
}
