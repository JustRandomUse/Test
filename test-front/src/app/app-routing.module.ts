import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InventoryComponent } 
from './inventory/inventory.component';

import { EmployeesComponent } 
from './employees/employees.component';

import { EmployeeEquipmentComponent } 
from './employee-equipment/employee-equipment.component';

import { TechniqueTypesComponent } 
from './technique-types/technique-types.component';

import { TechniquesComponent } 
from './techniques/techniques.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'inventory', component: InventoryComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'techniques', component: TechniquesComponent},
  {path: 'technique-types', component: TechniqueTypesComponent},
  {path: 'employee-equipment', component: EmployeeEquipmentComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
