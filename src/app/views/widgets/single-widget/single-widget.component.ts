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

@Component({
  selector: 'app-single-widget',
  templateUrl: './single-widget.component.html',
  styleUrls: ['./single-widget.component.scss'],
  // changeDetection: ChangeDetectionStrategy.Default,
})
export class SingleWidgetsComponent implements OnInit {
  icons = { cilList, cilShieldAlt, cilPlus, cilMinus };

  @Input()
  WidgetData: any;

  @Input()
  amount: string | undefined;

  @Input()
  WidgetTitle: string | undefined;

  @Input()
  widgetText: string | undefined;

  @Input()
  progressPercentage: string | undefined;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.amount = this.applyCurrentPipe(String(this.amount));
    this.WidgetData = this.WidgetData.map((el: any) => {
      return {
        ...el,
        Amount: this.applyCurrentPipe(el.Amount),
        Text: '',
      };
    });
  }

  // ngAfterContentInit(): void {
  //   this.amount = this.applyCurrentPipe(String(this.amount));
  //   this.WidgetData = this.WidgetData.map((el: any) => {
  //     return {
  //       ...el,
  //       Amount: this.applyCurrentPipe(el.Amount),
  //       Text: '',
  //     };
  //   });

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

  public visible = false;
  public modalTitle = '';
  public modalSubmitButtonText = '';
  public modalTextboxPlaceholder = '';
  public action = '';
  public modifiedInvestment = 0;

  toggleLiveDemo() {
    this.visible = !this.visible;
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
