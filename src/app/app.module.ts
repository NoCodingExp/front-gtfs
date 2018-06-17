import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';



import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';



import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {MatSelectModule} from '@angular/material/select';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { notGuardAuthentificationService } from './auth/notauth-Guard';
import { GuardAuthentificationService } from './auth/auth-Guard';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
   
    MatSelectModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
 

  ],
  providers: [AuthService,notGuardAuthentificationService,GuardAuthentificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
