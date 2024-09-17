import { Component, OnInit } from '@angular/core';
import { EmployeesService, EmployeeResponse } from './employees.service';
import { Employee } from './employees';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfrimDialogComponent } from '../confrim-dialog/confrim-dialog.component';
import { EmployeeEditModalComponent } from './employee-edit-modal/employee-edit-modal.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {
  
  employees: Employee[] = []; // Определяем массив сотрудников отдельно от EmployeeResponse

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
searchTerm: any;
  // dialog: any;


  constructor(private employeesService: EmployeesService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadEmployees();
  }

  openAddEmployeeModal(): void {
    const dialogRef = this.dialog.open(EmployeeModalComponent);

    dialogRef.afterClosed().subscribe((result: { name: string; office: number; }) => {
      if (result) {
        this.add(result.name, result.office);
      }
    });
  }

  getEmployees(): void {
    this.employeesService.getEmployee()
      .subscribe((response: EmployeeResponse) => {
        this.employees = response.items;  // Извлекаем массив сотрудников из ответа
      });
  }

  loadEmployees(): void {
    this.employeesService.getEmployee()
      .subscribe((response: EmployeeResponse) => {
        this.employees = response.items;  // Заполняем массив сотрудников
        this.totalItems = response.total;  // Обновляем общее количество элементов для пагинации
      },
      (error: any) => console.log(error));  // Логируем ошибки, если есть
  }

  add(name: string, office: number): void {
    name = name.trim();
    if (!name || !office) { return; }
    const newEmployee: Employee = {
      id: 0,
      name: name,
      office: office
    };
    this.employeesService.addEmployee(newEmployee)
      .subscribe(employee => {
        this.employees.push(employee);  // Добавляем нового сотрудника в массив
      });
  }

  delete(employee: Employee): void {
    const dialogRef = this.dialog.open(ConfrimDialogComponent, {
      data: { message: `Вы уверены, что хотите удалить сотрудника ${employee.name}?` }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employees = this.employees.filter(h => h !== employee); // Удаляем сотрудника из локального массива
        this.employeesService.deleteEmployee(employee.id).subscribe();
      }
    });
  }


 edit(employee: Employee): void {
  const dialogRef = this.dialog.open(EmployeeEditModalComponent, {
    data: { employee: { ...employee } }  // Передаем копию сотрудника для редактирования
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.employeesService.updateEmployee(result)
        .subscribe(() => {
          this.loadEmployees();  // Обновляем список сотрудников после редактирования
        },
        (error: any) => console.log(error));  // Логируем ошибки, если есть
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