import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../services/student.service";
import {IStudent} from "../../models/IStudent";
import {CreateStudentComponent} from "./create-student/create-student.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  providers:[StudentService]
})
export class StudentsComponent implements OnInit {
  students: IStudent[];
  statusMessage: string= "Loading data. Please wait... ";
  constructor(private _studentServices: StudentService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
   this.fetchStudents();
  }
  fetchStudents(): void{
    this._studentServices.getStudentS().subscribe(
      studentsData=> this.students = studentsData, (error) =>{
      this.statusMessage="Problem with the service. Please try again after some time..!"
      });
  }
  createStudent(){
    const modalRef = this.modalService.open(CreateStudentComponent,{size:'lg'})
    modalRef.componentInstance.formTitle = "New Student";
  }
  manageStudent(student: IStudent) {
    const modalRef = this.modalService.open(CreateStudentComponent,{size:'lg'})
    modalRef.componentInstance.studentObj = student;
    modalRef.componentInstance.formTitle ="Edit Student";
   // modalRef.componentInstance.date = new Date(student.dob)
  }
}
