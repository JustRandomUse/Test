import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } 
from './app-routing.module';

import { MatDialogModule } 
from '@angular/material/dialog';

import { SafeHtmlPipe } 
from './inventory/html.pipe';

import { MatButtonModule } 
from '@angular/material/button';

import { MatFormFieldModule } 
from '@angular/material/form-field';

import { MatInputModule } 
from '@angular/material/input';

import { BrowserAnimationsModule } 
from '@angular/platform-browser/animations';

import { provideAnimationsAsync } 
from '@angular/platform-browser/animations/async';

import { ConfrimDialogComponent } 
from './confrim-dialog/confrim-dialog.component';

import { InventoryComponent } from './inventory/inventory.component';

import { EmployeesComponent } 
from './employees/employees.component';
import { EmployeeEditModalComponent } 
from './employees/employee-edit-modal/employee-edit-modal.component';
import { EmployeeModalComponent } 
from './employees/employee-modal/employee-modal.component';

import { EmployeeEquipmentComponent } 
from './employee-equipment/employee-equipment.component';
import { EmployeeEquipmentEditModalComponent } 
from './employee-equipment/employee-equipment-edit-modal/employee-equipment-edit-modal.component';
import { EmployeeEquipmentModalComponent } 
from './employee-equipment/employee-equipment-modal/employee-equipment-modal.component';

import { TechniqueTypesComponent } 
from './technique-types/technique-types.component';
import { TechniqueTypesEditModalComponent } 
from './technique-types/technique-types-edit-modal/technique-types-edit-modal.component';
import { TechniqueTypesModalComponent } 
from './technique-types/technique-types-modal/technique-types-modal.component';

import { TechniquesComponent } 
from './techniques/techniques.component';
import { TechniquesEditModalComponent } 
from './techniques/techniques-edit-modal/techniques-edit-modal.component';
import { TechniquesModalComponent } 
from './techniques/techniques-modal/techniques-modal.component';


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
    SafeHtmlPipe,
    ConfrimDialogComponent,

    InventoryComponent,

    EmployeesComponent,
    EmployeeModalComponent,
    EmployeeEditModalComponent,

    EmployeeEquipmentComponent,
    EmployeeEquipmentEditModalComponent,
    EmployeeEquipmentModalComponent,

    TechniqueTypesComponent,
    TechniqueTypesEditModalComponent,
    TechniqueTypesModalComponent,

    TechniquesComponent,
    TechniquesEditModalComponent,
    TechniquesModalComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule { }
