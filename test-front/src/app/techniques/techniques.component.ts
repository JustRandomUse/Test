import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Techniques } from './techniques';
import { TechniquesService, TechniquesResponse } 
from './techniques.service';
import { TechniqueTypesModalComponent } 
from '../technique-types/technique-types-modal/technique-types-modal.component';
import { ConfrimDialogComponent } 
from '../confrim-dialog/confrim-dialog.component';
import { TechniqueTypesEditModalComponent } 
from '../technique-types/technique-types-edit-modal/technique-types-edit-modal.component';

@Component({
  selector: 'app-techniques',
  templateUrl: './techniques.component.html',
  styleUrls: ['./techniques.component.css']
})

export class TechniquesComponent implements OnInit {
  
  employees: Techniques[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchTerm: any;


  constructor(private employeesService: TechniquesService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadEmployees();
  }

  openAddEmployeeModal(): void {
    const dialogRef = this.dialog.open(TechniqueTypesModalComponent);

    dialogRef.afterClosed().subscribe((result: { name: string; type_id: number; }) => {
      if (result) {
        this.add(result.name, result.type_id);
      }
    });
  }

  getEmployees(): void {
    this.employeesService.getEmployee()
      .subscribe((response: TechniquesResponse) => {
        this.employees = response.items;  // Извлекаем массив сотрудников из ответа
      });
  }

  loadEmployees(): void {
    this.employeesService.getEmployee()
      .subscribe((response: TechniquesResponse) => {
        this.employees = response.items;  // Заполняем массив сотрудников
        this.totalItems = response.total;  // Обновляем общее количество элементов для пагинации
      },
      (error: any) => console.log(error));  
  }

  add(name: string, type_id: number): void {
    name = name.trim();
    if (!name || !type_id) { return; }
    const newEmployee: Techniques = {
      id: 0,
      name: name,
      type_id: type_id
    };
    this.employeesService.addEmployee(newEmployee)
      .subscribe(employee => {
        this.employees.push(employee);  // Добавляем нового сотрудника в массив
      });
  }

  delete(employee: Techniques): void {
    const dialogRef = this.dialog.open(ConfrimDialogComponent, {
      data: { message: `Вы уверены, что хотите удалить технику ${employee.name}?` }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employees = this.employees.filter(h => h !== employee); // Удаляем сотрудника из локального массива
        this.employeesService.deleteEmployee(employee.id).subscribe();
      }
    });
  }


 edit(employee: Techniques): void {
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