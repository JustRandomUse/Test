import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-technique-types-edit-modal',
  templateUrl: './technique-types-edit-modal.component.html',
  styleUrl: './technique-types-edit-modal.component.css'
})
export class TechniqueTypesEditModalComponent {
  employee: { name: string} = { name: ''};

  constructor(
    public dialogRef: MatDialogRef<TechniqueTypesEditModalComponent>,
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
