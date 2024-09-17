import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EmployeeModalComponent } from './employees/employee-modal/employee-modal.component';
import { ConfrimDialogComponent } from './confrim-dialog/confrim-dialog.component';
import { EmployeeEditModalComponent } from './employees/employee-edit-modal/employee-edit-modal.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeModalComponent,
    ConfrimDialogComponent,
    EmployeeEditModalComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule { }
