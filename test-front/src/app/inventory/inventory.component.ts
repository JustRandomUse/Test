import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-inventory-component',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  officeNumber: number | null = null;
  reportHtml: SafeHtml | null = null;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  generateReport(): void {
    if (this.officeNumber !== null) {
      this.http.get<{ inventory: any[], office: string }>(`http://localhost:8080/inventory/${this.officeNumber}`)
        .subscribe(response => {
          this.reportHtml = this.createReportHtml(response);
        }, error => {
          console.error('Ошибка при получении отчета', error);
        });
    }
  }

  private createReportHtml(data: { inventory: any[], office: string }): SafeHtml {
    let html = `<h1>Отчет по офису ${data.office}</h1>`;
    html += '<table border="1" cellspacing="0" cellpadding="5">';
    html += '<thead><tr><th>ФИО</th><th>ID Сотрудника</th><th>Тип техники</th><th>Название техники</th><th>Таб № техники</th></tr></thead>';
    html += '<tbody>';

    data.inventory.forEach(item => {
      html += `<tr>
        <td>${item.employee_name}</td>
        <td>${item.employee_id}</td>
        <td>${item.technique_type}</td>
        <td>${item.technique_name}</td>
        <td>${item.technique_tab_number}</td>
      </tr>`;
    });

    html += '</tbody></table>';
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}