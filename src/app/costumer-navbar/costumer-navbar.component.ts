import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IUser } from '../Contracts/IUser';

@Component({
  selector: 'app-costumer-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './costumer-navbar.component.html',
  styleUrl: './costumer-navbar.component.css'
})
export class CostumerNavbarComponent {
  private userInfo: IUser;

  private clearAllFeaturesLink() {
    for (let i = 0; i < this.linkClasses.length; i++) {
      this.linkClasses[i] = this.linkClasses[i].replace(' active', '');
    }
    this.administratorLinkClasses = this.administratorLinkClasses.replace(' active', '');
  }

  administratorLinkClasses = "nav-link";

  linkClasses = [
    "nav-link",
    "nav-link active",
    "nav-link"
  ];

  features = [
    ["Book Item", "Items"],
    ["Book Computer", "./"],
    // idk if that works, the idea for Reserv is a possible dropDown with all the reservation
    ["Reserv", "./"],
  ];

  constructor() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  }

  checkRole() {
    return this.userInfo.role.toLowerCase() === "labadmin";
  }

  navigationSelected(linkSelected: number) {
    this.clearAllFeaturesLink();

    if (linkSelected === -1) this.administratorLinkClasses += " active";
    else this.linkClasses[linkSelected] += " active";

  }

}
