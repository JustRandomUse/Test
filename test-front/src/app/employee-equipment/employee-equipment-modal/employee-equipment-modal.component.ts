import { Component } from '@angular/core';
import { EmployeeEquipment } from '../employee-equipment';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-equipment-modal',
  templateUrl: './employee-equipment-modal.component.html',
  styleUrl: './employee-equipment-modal.component.css'
})
export class EmployeeEquipmentModalComponent {
  employee: EmployeeEquipment = { id: 0, employees_id: 0, technique_id: 0 };

  constructor(public dialogRef: MatDialogRef<EmployeeEquipmentModalComponent>) {}

  onSubmit(): void {
    this.dialogRef.close(this.employee);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
