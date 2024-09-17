import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../employees';

@Component({
  selector: 'app-employee-edit-modal',
  templateUrl: './employee-edit-modal.component.html',
  styleUrls: ['./employee-edit-modal.component.css']
})
export class EmployeeEditModalComponent {

  employee: { name: string; office: number } = { name: '', office: 0 };

  constructor(
    public dialogRef: MatDialogRef<EmployeeEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.employee = { ...data }; // Копируем данные сотрудника
    }
  }
  onSave(): void {
    this.dialogRef.close(this.data.employee);
  }
  
  onCancel(): void {
    this.dialogRef.close(); // Закрываем модальное окно без передачи данных
  }

  onSubmit(): void {
    this.dialogRef.close(this.employee); // Закрываем модальное окно и передаем данные
  }
}