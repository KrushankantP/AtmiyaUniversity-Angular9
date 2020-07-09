import { Component, OnInit } from '@angular/core';
import{CourseService} from "../../services/course.service";
import{ICourse} from "../../models/ICourse";
import {ICourseSchedule} from "../../models/ICourse-schedule";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers:[CourseService]
})
export class CoursesComponent implements OnInit {

  courses:ICourse[];
  statusMessage: string= "Loading data. Please wait... ";
  constructor(private _courseServices: CourseService,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchCourse();
  }

  fetchCourse(): void{
    this._courseServices.getCourses().subscribe(
      courseData=> this.courses=courseData,(error)=>
        this.statusMessage="Problem with the service. Please try again after some time..!"
    );
  }

}
