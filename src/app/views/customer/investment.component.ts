import { Component } from '@angular/core';

@Component({
  templateUrl: 'investment.component.html',
})
export class InvestmentComponent {
  constructor() {}
  amount: string = String(1234);
  WidgetTitle: string = 'Total Invested Amount';
  widgetText: string = 'This is the amount total invested';
  progressPercentage: string = '80';
  WidgetData = [
    {
      Id: 1,
      Color: 'primary',
      Title: 'Total Invested Amount',
      Text: 'This is the amount total invested',
      Amount: String(456462345),
      ProgressPercentage: 80,
    },
    {
      Id: 2,
      Color: 'warning',
      Title: 'Total Loaned Amount',
      Text: 'This is the amount total given as loan',
      Amount: String(3434),
      ProgressPercentage: 60,
    },
    {
      Id: 3,
      Color: 'danger',
      Title: 'Outstanding Amount',
      Text: 'This is the amount Outstanding amount',
      Amount: String(4354535),
      ProgressPercentage: 30,
    },
  ];

  addInvestment($event: any) {
    console.log($event);
  }
  deductInvestment($event: any) {
    console.log($event);
  }
}
