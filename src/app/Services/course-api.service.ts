import { Injectable } from '@angular/core';
import { GenericAPIService } from './GenericAPI.service';
import { Subject } from 'rxjs';
import { ILaboratory } from '../Contracts/ILaboratory';

@Injectable({
  providedIn: 'root'
})
export class CourseAPIService {
  private laboratoryURL = "http://localhost:5228/Course/GetLaboratories";
  private itemURL = "";
  private reservationURl = "";

  constructor(private APICaller: GenericAPIService) { }

  getLaboratory() {
    return this.APICaller.get<ILaboratory[]>(this.laboratoryURL);
  }

  getItems() { }

  getUserReservation(email: string) { }
}
