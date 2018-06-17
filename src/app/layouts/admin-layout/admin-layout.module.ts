import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';

import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule

} from '@angular/material';
import { ScheduleComponent } from '../../schedule/schedule.component';
import { RoutesComponent } from '../../routes/routes.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDx7dJTgxCGQIhKt6yw050J4bc-bUocTN8'
    }),
    AgmDirectionModule
  ],
  declarations: [
    DashboardComponent,
ScheduleComponent,
RoutesComponent
   

  ]
})

export class AdminLayoutModule {}
