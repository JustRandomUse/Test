import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TechniqueTypes } from '../technique-types';

@Component({
  selector: 'app-technique-types-modal',
  templateUrl: './technique-types-modal.component.html',
  styleUrl: './technique-types-modal.component.css'
})
export class TechniqueTypesModalComponent {
  employee: TechniqueTypes = { id: 0, name: ''};

  constructor(public dialogRef: MatDialogRef<TechniqueTypesModalComponent>) {}

  onSubmit(): void {
    this.dialogRef.close(this.employee);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
