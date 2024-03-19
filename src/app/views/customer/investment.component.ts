import { Component, OnInit } from '@angular/core';
import { InvestmentDto } from '../../interfaces/investment-dto';
import { InvestmentService } from '../../services/investment.service';
import Swal from 'sweetalert2';
import { InvestmentMasterDto } from 'src/app/interfaces/investment-master-dto.interface';

@Component({
  templateUrl: 'investment.component.html',
})
export class InvestmentComponent implements OnInit {
  constructor(private investmentService: InvestmentService) {}
  amount: string = String(1234);
  WidgetTitle: string = 'Total Invested Amount';
  widgetText: string = 'This is the amount total invested';
  progressPercentage: string = '80';
  WidgetData: any;

  addInvestment($event: any) {
    console.log($event.addedInvestment);
    let investmentDto: InvestmentDto = new InvestmentDto();
    investmentDto.InvestmentAmount = $event.addedInvestment;
    investmentDto.InvestmentBy = 1;
    this.addInvestmentToServer(investmentDto);
  }
  deductInvestment($event: any) {
    console.log($event);
  }

  ngOnInit(): void {
    this.GetInvestments();
  }

  addInvestmentToServer(investmentDto: InvestmentDto) {
    this.investmentService.addInvestment(investmentDto).subscribe({
      next: (data) => {
        Swal.close();
      },
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }

  Investments: InvestmentMasterDto[] | undefined;

  GetInvestments() {
    Swal.fire({
      title: 'Please wait...',
      allowOutsideClick: false,
      icon: 'info',
    });
    Swal.showLoading();

    return this.investmentService.GetInvestments().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.Investments = data;
        } else {
          this.Investments = [
            {
              InvestmentAmount: 0,
              LoanAmount: 0,
              OutstandingInvestment: 0,
              InvestmentMasterId: 0,
            },
          ];
        }

        this.WidgetData = [
          {
            Id: 1,
            Color: 'primary',
            Title: 'Total Invested Amount',
            Text: 'This is the amount total invested',
            Amount: String(this.Investments[0].InvestmentAmount),
          },
          {
            Id: 2,
            Color: 'warning',
            Title: 'Total Loaned Amount',
            Text: 'This is the amount total given as loan',
            Amount: String(this.Investments[0].LoanAmount),
          },
          {
            Id: 3,
            Color: 'danger',
            Title: 'Outstanding Amount',
            Text: 'This is the amount Outstanding amount',
            Amount: String(this.Investments[0].OutstandingInvestment),
          },
        ];

        Swal.close();
      },
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }
}
