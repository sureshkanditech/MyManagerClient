import { CommonModule } from '@angular/common';
import { NgModule, importProvidersFrom } from '@angular/core';

import {
  CardModule,
  GridModule,
  NavModule,
  UtilitiesModule,
  TabsModule,
  TableModule,
  AvatarModule,
  ProgressModule,
  AccordionModule,
  InputGroupComponent,
  ModalToggleDirective,
  ModalModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { GroupComponent, ThemeColorComponent } from './group.component';
import { CustomerComponent } from './customer.component';

// Theme Routing
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomSharedModule } from '../../shared.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { InvestmentComponent } from './investment.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { CustomerService } from '../../services/customer.service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { CustomerGroupService } from '../../services/customer-group.service';
import { LoanDetailsComponent } from './loan-details.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { LoanDetailService } from 'src/app/services/loan-detail.service';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule,
    TableModule,
    CustomSharedModule,
    AvatarModule,
    ProgressModule,
    AccordionModule,
    NgbAccordionModule,
    WidgetsModule,
    HttpClientModule,
    InputGroupComponent,
    ModalToggleDirective,
    ModalModule,
    FlexLayoutModule,
    FlexModule,
    FormsModule,
  ],
  declarations: [
    GroupComponent,
    ThemeColorComponent,
    CustomerComponent,
    InvestmentComponent,
    LoanDetailsComponent,
  ],
  providers: [
    CustomerService,
    CustomerGroupService,
    provideHttpClient(),
    DataService,
    LoanDetailService,
  ],
})
export class CustomerModule {}
