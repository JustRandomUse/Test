import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './employees.service';
import { Employee } from './employees';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  
  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    this.getEmployee();
  }

  employees: Employee[] = [];

  

  getEmployee(): void {
    this.employeesService.getEmployee()
    .subscribe(response =>
     this.employees = response.items);
  }

  add(Name: string, Office: number): void {
    Name = Name.trim();
    Office = Office;
    if (!Name || !Office) { return; }
    const newEmloyee: Employee ={
      id: 0,
      Name: Name,
      Office: Office
    }
    this.employeesService.addEmployee(newEmloyee)
      .subscribe(employees => {
        this.employees.push(employees);
      });
  }

  delete(employee: Employee): void {
    this.employees = this.employees.filter(h => h !== employee);
    this.employeesService.deleteEmployee(employee.id).subscribe();
  }


  // employees: Employee[] = [];
  // submitted = false;
  // paginatedEmployees: any[] = [];
  // currentPage: number = 1;
  // itemsPerPage: number = 5;
  // totalItems: number = 0;
  // searchQuery: string = ''; 

  // onSearch(event: any) {
  //   this.searchQuery = event.target.value;
  //   this.getHeroes();
  // }

  // loadEmployees() {
  //   this.employeesService.getEmployees(this.currentPage, this.itemsPerPage, this.searchQuery).subscribe(response => {
  //     this.employees = response.class; // Предположим, что данные приходят в виде "content"
  //     this.totalItems = response.totalElements; // Общее количество элементов
  //   });
  // }

  // addEmployee(Employees: any) {
  //   this.employeesService.addEmployee(this.employees).subscribe(() => {
  //     this.loadEmployees();
  //   });
  //   (error: any) => console.log(error);
  // }

  // editEmployee(employee: any) {
  //   this.employeesService.updateEmployee(employee.id, employee).subscribe(() => {
  //     this.loadEmployees();
  //   });
  //   (error: any) => console.log(error);
  // }

  // deleteEmployee(employee: any) {
  //   this.employeesService.deleteEmployee(employee.id).subscribe(() => {
  //     this.loadEmployees();
  //   });
  //   (error: any) => console.log(error);
  // }

  // previousPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.loadEmployees();
  //   }
  // }

  // nextPage() {
  //   if (this.currentPage * this.itemsPerPage < this.totalItems) {
  //     this.currentPage++;
  //     this.loadEmployees();
  //   }
  // }

}