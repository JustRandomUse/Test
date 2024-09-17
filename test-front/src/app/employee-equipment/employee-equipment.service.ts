import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EmployeeEquipment, EmployeeEquipmentResponse } from './employee-equipment';
import { MessageService } from '../message.service';

@Injectable({ providedIn: 'root' })
export class EmployeeEquipmentService {
  getEmployees(currentPage: number, itemsPerPage: number) {
    throw new Error('Method not implemented.');
  }

  private employeesUrl = 'http://localhost:8080/employee_equipments';  // URL для API

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
  

  /** GET: получить всех сотрудников с сервера */
  getEmployee(): Observable<EmployeeEquipmentResponse> {
    return this.ajaxRequest('GET', this.employeesUrl).pipe(
      tap(response => this.log('fetched employees')),
      map((data: any) => {
        if (Array.isArray(data)) {
          return {
            items: data,
            limit: data.length,
            page: 1,
            total: data.length
          };
        }
        return data as EmployeeEquipmentResponse;
      }),
      catchError(this.handleError<EmployeeEquipmentResponse>('getEmployee'))
    );
  }

  /** GET: получить сотрудника по ID. Вернёт 404, если не найден */
  getEmployeeById(id: number): Observable<EmployeeEquipment> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<EmployeeEquipment>(url).pipe(
      tap(_ => this.log(`fetched employee id=${id}`)),
      catchError(this.handleError<EmployeeEquipment>(`getEmployee id=${id}`))
    );
  }

  /* GET: поиск сотрудников по имени */
  // searchEmployees(term: string): Observable<Employee[]> {
  //   if (!term.trim()) {
  //     // если поисковый запрос пуст, возвращаем пустой массив
  //     return of([]);
  //   }
  //   return this.http.get<Employee[]>(`${this.employeesUrl}/?name=${term}`).pipe(
  //     tap(x => x.length ?
  //       this.log(`found employees matching "${term}"`) :
  //       this.log(`no employees matching "${term}"`)),
  //     catchError(this.handleError<Employee[]>('searchEmployees', []))
  //   );
  // }

  //////// Методы сохранения данных //////////

  /** POST: добавить нового сотрудника на сервер */
  addEmployee(employee: EmployeeEquipment): Observable<EmployeeEquipment> {
    return this.http.post<EmployeeEquipment>(this.employeesUrl, employee, this.httpOptions).pipe(
      tap((newEmployee: EmployeeEquipment) => this.log(`added employee w/ id=${newEmployee.id}`)),
      catchError(this.handleError<EmployeeEquipment>('addEmployee'))
    );
  }

  /** DELETE: удалить сотрудника с сервера */
  deleteEmployee(id: number): Observable<EmployeeEquipment> {
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete<EmployeeEquipment>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted employee id=${id}`)),
      catchError(this.handleError<EmployeeEquipment>('deleteEmployee'))
    );
  }

  /** PUT: обновить данные сотрудника на сервере */
  updateEmployee(employee: EmployeeEquipment): Observable<any> {
    return this.http.put(this.employeesUrl, employee, this.httpOptions).pipe(
      tap(_ => this.log(`updated employee id=${employee.id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }


  /**
   * Выполнение AJAX-запроса
   */
  private ajaxRequest(method: string, url: string, body?: any): Observable<any> {
    return new Observable(observer => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            observer.next(response);
            observer.complete();
          } catch (e) {
            observer.error('Error parsing response');
          }
        } else {
          observer.error(`HTTP error ${xhr.status}`);
        }
      };

      xhr.onerror = () => {
        observer.error('Network error');
      };

      xhr.send(body ? JSON.stringify(body) : null);
    });
  }


  /**
   * Обработка ошибок HTTP операций.
   * Позволяет приложению продолжить работу.
   *
   * @param operation - имя операции, которая вызвала ошибку
   * @param result - необязательное значение, возвращаемое как результат
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

     // TODO: отправить ошибку в удалённую систему логирования
      console.error(error); // пока выводим ошибку в консоль

     // TODO: преобразовать ошибку для лучшего восприятия пользователем
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a message with the MessageService */
  private log(message: string) {
    this.messageService.add('EmployeesService: ${message}');
  }
}

export { EmployeeEquipmentResponse };
