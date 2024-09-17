import { Component, Inject } from '@angular/core';
import { EmployeeEquipment } from '../employee-equipment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-equipment-edit-modal',
  templateUrl: './employee-equipment-edit-modal.component.html',
  styleUrl: './employee-equipment-edit-modal.component.css'
})
export class EmployeeEquipmentEditModalComponent {
  employee: EmployeeEquipment = { id: 0, employees_id: 0, technique_id: 0 };

  constructor(
    public dialogRef: MatDialogRef<EmployeeEquipmentEditModalComponent>,
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
