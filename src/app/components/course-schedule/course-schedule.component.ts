import { Component, OnInit } from '@angular/core';
import {ICourseSchedule} from "../../models/ICourse-schedule";
import{CourseService} from "../../services/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import{IFaculty} from "../../models/IFaculty";
import{FacultyService} from "../../services/faculty.service";
import {ICourse} from "../../models/ICourse";

@Component({
  selector: 'app-course-schedule',
  templateUrl: './course-schedule.component.html',
  styleUrls: ['./course-schedule.component.css']
})
export class CourseScheduleComponent implements OnInit {

  courseSchedule: ICourseSchedule[];
  arrayOfCourses: ICourse[];
  courseID: number;
  arrayOfFaculties : IFaculty[];
  statusMessage: string= "Loading data. Please wait... ";


  constructor(private _courseServices: CourseService,
              private _facultyService: FacultyService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) { }

  ngOnInit(): void {
     this._activatedRoute.params.subscribe(routeparams=>{
      this.getSchedule(Number(routeparams.id));
      this.courseID= routeparams.id;
    })
  }
  getSchedule(courseID: number) {
    this._courseServices.getCourseSchedule(courseID).subscribe(
      courseSchedule => this.courseSchedule = courseSchedule,(error)=> {
        this.statusMessage = "Problem with the service. Please try again after some time..!"
      });
     this.fetchAllFaculty()
     this.fetchAllCourses()
  }

  fetchAllFaculty() {
    this._facultyService.getFaculties().subscribe(
      facultyData=>{
        this.arrayOfFaculties = facultyData
      })
  }

  fetchAllCourses(){
    this._courseServices.getCourses().subscribe(
      courseData=> {
        this.arrayOfCourses=courseData
        console.log(this.arrayOfCourses)
      })
  }

  onBackButtonClick(): void{
    this._router.navigate(['/courses']);
  }
}
