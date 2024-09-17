import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../employees';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent {
  employee: Employee = { id: 0, name: '', office: 0 };

  constructor(public dialogRef: MatDialogRef<EmployeeModalComponent>) {}

  onSubmit(): void {
    this.dialogRef.close(this.employee);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}