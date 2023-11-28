import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { IUser } from '../Contracts/IUser';
import { CostumerNavbarComponent } from '../costumer-navbar/costumer-navbar.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, CostumerNavbarComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  
}