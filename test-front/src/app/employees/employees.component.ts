import { Component, OnInit } from '@angular/core';
import { EmployeesService, EmployeeResponse } from './employees.service';
import { Employee } from './employees';

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


  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    this.loadEmployees();
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
    this.employees = this.employees.filter(h => h !== employee); // Удаляем сотрудника из локального массива
    this.employeesService.deleteEmployee(employee.id).subscribe();
  }


  edit(employee: Employee): void {
    this.employeesService.updateEmployee(employee)
      .subscribe(() => {
        this.loadEmployees();  // Обновляем список сотрудников после редактирования
      },
      (error: any) => console.log(error));  // Логируем ошибки, если есть
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