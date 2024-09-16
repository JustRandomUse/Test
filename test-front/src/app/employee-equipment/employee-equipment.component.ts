import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechniquesComponent } from '../techniques/techniques.component';

@Component({
  selector: 'app-employee-equipment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-equipment.component.html',
  styleUrl: './employee-equipment.component.css'
})
export class EmployeeEquipmentComponent {
  employee_equipment = [
    { id: 1, name: 'Иван Иванович Иванов', office: 101, Techniques: 'Монитор/Samsung'},
    { id: 2, name: 'Ольга Ивановна Петрова', office: 102, Techniques: 'Принтер/HP laserjet 5200'}
  ];

  onSearch(event: any) {
    const searchValue = event.target.value;
    
  }

  openAddEmployeeEquipmentModal() {
    
  }

  editEmployeeEquipment(employee: any) {
    
  }

  deleteEmployeeEquipment(employee: any) {
    if (confirm(`Вы уверены, что хотите удалить ${employee.name}?`)) {
      
    }
  }
}