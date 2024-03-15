import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
  // changeDetection: ChangeDetectionStrategy.Default,
})
export class WidgetsComponent implements OnInit {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.changeDetectorRef.detectChanges();
  }
}
