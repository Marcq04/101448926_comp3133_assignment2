import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    LoginComponent,
    SignupComponent,
    AddEmployeeComponent,
    EmployeeDetailsComponent,
    UpdateEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
