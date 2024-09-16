import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-technique-types',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './technique-types.component.html',
  styleUrl: './technique-types.component.css'
})
export class TechniqueTypesComponent {
  technique_types = [
    { id: 1, name: 'Принтер'},
    { id: 2, name: 'Монитор'}
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
