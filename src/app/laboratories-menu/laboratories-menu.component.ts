import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseAPIService } from '../Services/course-api.service';
import { ILaboratory } from '../Contracts/ILaboratory';

@Component({
  selector: 'app-laboratories-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './laboratories-menu.component.html',
  styleUrl: './laboratories-menu.component.css'
})
export class LaboratoriesMenuComponent implements OnInit {
  laboratories: ILaboratory[] | null = null;
  constructor(private courseAPI: CourseAPIService) { }


  private cleanAllBtn(buttons: NodeListOf<ChildNode>) {
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].nodeName.toLowerCase() === "button") {
        const labButton: HTMLButtonElement = buttons[i] as HTMLButtonElement;
        if (labButton.classList.contains("btn-primary")) {
          labButton.classList.toggle("btn-primary");
          labButton.classList.toggle("btn-light");
        }
      }
    }
  }


  activate(laboratoriesDiv: HTMLElement, lab: HTMLElement) {
    if(lab.classList.contains("btn-primary")) return;

    this.cleanAllBtn(laboratoriesDiv.childNodes);
    lab.classList.toggle("btn-light");
    lab.classList.toggle("btn-primary");

    // make the call to update the calendar
  }

  ngOnInit() {
    this.courseAPI.getLaboratory().subscribe(
      {
        next: (response) => this.laboratories = response,
        error: (err) => console.log(err)
      }
    );
  }
}
