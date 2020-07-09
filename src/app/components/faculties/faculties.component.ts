import { Component, OnInit } from '@angular/core';
import {FacultyService} from "../../services/faculty.service";
import {IFaculty} from "../../models/IFaculty";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateFacultyComponent} from "./create-faculty/create-faculty.component";

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.css'],
  providers:[FacultyService]
})
export class FacultiesComponent implements OnInit {

  faculties: IFaculty[];
  statusMessage: string= "Loading data. Please wait... ";

  constructor(private _facultyService: FacultyService,
              private _modalService: NgbModal) { }

  ngOnInit(): void {
  this.fetchFaculties();
  }

  fetchFaculties(): void{
    this._facultyService.getFaculties().subscribe(
      facultiesData=> this.faculties = facultiesData,(error)=>{
        this.statusMessage="Problem with the service. Please try again after some time..!"
      });
  }

  createFaculty() {
    const modalRef = this._modalService.open(CreateFacultyComponent, {size:'lg'})
    modalRef.componentInstance.formTitle = "New Faculty";
  }

  editFaculty(faculty: IFaculty) {
    const modalRef = this._modalService.open(CreateFacultyComponent, {size: 'lg'})
    modalRef.componentInstance.facultyObj = faculty;
    modalRef.componentInstance.formTitle ="Edit Faculty"
  }


}
