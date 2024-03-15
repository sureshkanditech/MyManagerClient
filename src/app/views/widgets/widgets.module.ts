import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import {
  AvatarComponent,
  ButtonCloseDirective,
  ButtonGroupComponent,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ProgressModule,
  SharedModule,
  TableModule,
  WidgetModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { DocsComponentsModule } from '@docs-components/docs-components.module';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetsBrandComponent } from './widgets-brand/widgets-brand.component';
import {
  ChartSample,
  WidgetsDropdownComponent,
} from './widgets-dropdown/widgets-dropdown.component';
import { WidgetsEComponent } from './widgets-e/widgets-e.component';
import { SingleWidgetsComponent } from './single-widget/single-widget.component';
import '@angular/common/locales/global/en-IN';
import { FormsModule } from '@angular/forms';
import { ListCustomerGroupWidgetsComponent } from './list-customer-group/list-customer-group-widget.component';
import { AddNewWidgetsComponent } from './add-new-widget/add-new-widget.component';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { ManageCustomerGroupCustomerMapWidgetsComponent } from './manage-customer-group-customer-map/manage-customer-group-customer-map-widget.component';
import { ManageLoanWidgetsComponent } from './manage-loan/manage-loan-widget.component';

@NgModule({
  declarations: [
    WidgetsComponent,
    WidgetsBrandComponent,
    WidgetsDropdownComponent,
    ChartSample,
    WidgetsEComponent,
    SingleWidgetsComponent,
    ListCustomerGroupWidgetsComponent,
    AddNewWidgetsComponent,
    ManageCustomerGroupCustomerMapWidgetsComponent,
    ManageLoanWidgetsComponent,
  ],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    GridModule,
    WidgetModule,
    IconModule,
    DropdownModule,
    SharedModule,
    ButtonModule,
    ButtonGroupComponent,
    CardModule,
    DocsComponentsModule,
    ProgressModule,
    ChartjsModule,
    AvatarComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    // ThemeDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    FormModule,
    FormsModule,
    TableModule,
    FlexLayoutModule,
    FlexModule,
  ],
  exports: [
    WidgetsBrandComponent,
    WidgetsDropdownComponent,
    WidgetsComponent,
    WidgetsEComponent,
    SingleWidgetsComponent,
    ListCustomerGroupWidgetsComponent,
    AddNewWidgetsComponent,
    ManageCustomerGroupCustomerMapWidgetsComponent,
    ManageLoanWidgetsComponent,
  ],
  providers: [CurrencyPipe, { provide: LOCALE_ID, useValue: 'en-IN' }],
})
export class WidgetsModule {}
