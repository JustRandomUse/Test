import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-techniques-edit-modal',
  templateUrl: './techniques-edit-modal.component.html',
  styleUrl: './techniques-edit-modal.component.css'
})
export class TechniquesEditModalComponent {
  employee: { name: string; type_id: number } = { name: '', type_id: 0 };

  constructor(
    public dialogRef: MatDialogRef<TechniquesEditModalComponent>,
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


