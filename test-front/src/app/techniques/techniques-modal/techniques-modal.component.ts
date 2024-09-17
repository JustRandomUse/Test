import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Techniques } from '../techniques';

@Component({
  selector: 'app-techniques-modal',
  templateUrl: './techniques-modal.component.html',
  styleUrl: './techniques-modal.component.css'
})
export class TechniquesModalComponent {
  employee: Techniques = { id: 0, name: '', type_id: 0 };

  constructor(public dialogRef: MatDialogRef<TechniquesModalComponent>) {}

  onSubmit(): void {
    this.dialogRef.close(this.employee);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
   