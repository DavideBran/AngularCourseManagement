import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCalendarComponent } from '../item-calendar/item-calendar.component';
import { LaboratoriesMenuComponent } from '../laboratories-menu/laboratories-menu.component';

@Component({
  selector: 'app-laboratory',
  standalone: true,
  imports: [CommonModule, ItemCalendarComponent, LaboratoriesMenuComponent],
  templateUrl: './laboratory.component.html',
  styleUrl: './laboratory.component.css'
})
export class LaboratoryComponent {

}
