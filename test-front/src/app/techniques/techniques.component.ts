import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-techniques',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './techniques.component.html',
  styleUrl: './techniques.component.css'
})
export class TechniquesComponent {

  techniques = [
    { id: 1, name: 'Intelcore i3', type: 'Принтер'},
    { id: 2, name: 'Samsung', type: 'Монитор'}
  ];

  onSearch(event: any) {
    const searchValue = event.target.value;
   
  }

  openAddEmployeeModal() {
    
  }

  editEmployee(employee: any) {
   
  }

  deleteEmployee(employee: any) {
    if (confirm(`Вы уверены, что хотите удалить ${employee.name}?`)) {
    
    }
  }

}
