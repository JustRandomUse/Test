import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfrimDialogComponent } 

from '../confrim-dialog/confrim-dialog.component';
import { TechniqueTypes } from './technique-types';

import { TechniqueTypesService, TechniqueTypesResponse } 
from './technique-types.service';

import { TechniqueTypesEditModalComponent } 
from './technique-types-edit-modal/technique-types-edit-modal.component';

import { TechniqueTypesModalComponent } 
from './technique-types-modal/technique-types-modal.component';


@Component({
  selector: 'app-technique-types',
  templateUrl: './technique-types.component.html',
  styleUrl: './technique-types.component.css'
})
export class TechniqueTypesComponent {
  employees: TechniqueTypes[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
searchTerm: any;


  constructor(private employeesService: TechniqueTypesService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadEmployees();
  }

  openAddEmployeeModal(): void {
    const dialogRef = this.dialog.open(TechniqueTypesModalComponent);

    dialogRef.afterClosed().subscribe((result: { name: string}) => {
      if (result) {
        this.add(result.name);
      }
    });
  }

  getEmployees(): void {
    this.employeesService.getEmployee()
      .subscribe((response: TechniqueTypesResponse) => {
        this.employees = response.items;  // Извлекаем массив сотрудников из ответа
      });
  }

  loadEmployees(): void {
    this.employeesService.getEmployee()
      .subscribe((response: TechniqueTypesResponse) => {
        this.employees = response.items;  // Заполняем массив сотрудников
        this.totalItems = response.total;  // Обновляем общее количество элементов для пагинации
      },
      (error: any) => console.log(error));  
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    const newEmployee: TechniqueTypes = {
      id: 0,
      name: name
    };
    this.employeesService.addEmployee(newEmployee)
      .subscribe(employee => {
        this.employees.push(employee);  // Добавляем нового сотрудника в массив
      });
  }

  delete(employee: TechniqueTypes): void {
    const dialogRef = this.dialog.open(ConfrimDialogComponent, {
      data: { message: `Вы уверены, что хотите удалить тип техники ${employee.name}?` }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employees = this.employees.filter(h => h !== employee); // Удаляем сотрудника из локального массива
        this.employeesService.deleteEmployee(employee.id).subscribe();
      }
    });
  }


 edit(employee: TechniqueTypes): void {
  const dialogRef = this.dialog.open(TechniqueTypesEditModalComponent, {
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
