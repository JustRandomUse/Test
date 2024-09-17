import { Component } from '@angular/core';
import { EmployeeEquipmentEditModalComponent } 
from './employee-equipment-edit-modal/employee-equipment-edit-modal.component';

import { EmployeeEquipment, EmployeeEquipmentResponse } from './employee-equipment';

import { EmployeeEquipmentService } from './employee-equipment.service';

import { ConfrimDialogComponent } from '../confrim-dialog/confrim-dialog.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-equipment',
  templateUrl: './employee-equipment.component.html',
  styleUrl: './employee-equipment.component.css'
})
export class EmployeeEquipmentComponent {
  employees: EmployeeEquipment[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
searchTerm: any;
  // dialog: any;


  constructor(private employeesService: EmployeeEquipmentService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadEmployees();
  }

  openAddEmployeeModal(): void {
    const dialogRef = this.dialog.open(EmployeeEquipmentEditModalComponent);

    dialogRef.afterClosed().subscribe((result: { employees_id: number; technique_id: number; }) => {
      if (result) {
        this.add(result.employees_id, result.technique_id);
      }
    });
  }

  getEmployees(): void {
    this.employeesService.getEmployee()
      .subscribe((response: EmployeeEquipmentResponse) => {
        this.employees = response.items;  // Извлекаем массив сотрудников из ответа
      });
  }

  loadEmployees(): void {
    this.employeesService.getEmployee()
      .subscribe((response: EmployeeEquipmentResponse) => {
        this.employees = response.items;  // Заполняем массив сотрудников
        this.totalItems = response.total;  // Обновляем общее количество элементов для пагинации
      },
      (error: any) => console.log(error));  
  }

  add(employees_id: number, technique_id: number): void {
    if (!employees_id || !technique_id) { return; }
    const newEmployee: EmployeeEquipment = {
      id: 0,
      employees_id: employees_id,
      technique_id: technique_id
    };
    this.employeesService.addEmployee(newEmployee)
      .subscribe(employee => {
        this.employees.push(employee);  // Добавляем нового сотрудника в массив
      });
  }

  delete(employee: EmployeeEquipment): void {
    const dialogRef = this.dialog.open(ConfrimDialogComponent, {
      data: { message: `Вы уверены, что хотите удалить технику ${employee.employees_id}?` }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employees = this.employees.filter(h => h !== employee); // Удаляем сотрудника из локального массива
        this.employeesService.deleteEmployee(employee.id).subscribe();
      }
    });
  }


 edit(employee: EmployeeEquipment): void {
  const dialogRef = this.dialog.open(EmployeeEquipmentEditModalComponent, {
    data: { employee: { ...employee } }  // Передаем копию сотрудника для редактирования
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.employeesService.updateEmployee(result)
        .subscribe(() => {
          this.loadEmployees();  // Обновляем список сотрудников после редактирования
        },
        (error: any) => console.log(error));  
    }
  });
}

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadEmployees();  // Загружаем сотрудников для предыдущей страницы
    }
  }
  
  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.totalItems) {
      this.currentPage++;
      this.loadEmployees();  // Загружаем сотрудников для следующей страницы
    }
  }

  searchEmployees(term: string): void {
    if (!term.trim()) {
      this.getEmployees(); // Возвращаем все сотрудники, если поисковый запрос пустой
      return;
    }
  }

}