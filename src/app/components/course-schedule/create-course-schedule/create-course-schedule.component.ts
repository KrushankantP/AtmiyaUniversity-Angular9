import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../services/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ICourseSchedule} from "../../../models/ICourse-schedule";
import {FacultyService} from "../../../services/faculty.service";
import {IFaculty} from "../../../models/IFaculty";
import set = Reflect.set;

@Component({
  selector: 'app-create-course-schedule',
  templateUrl: './create-course-schedule.component.html',
  styleUrls: ['./create-course-schedule.component.css']
})
export class CreateCourseScheduleComponent implements OnInit {

  showForm: boolean = false;
  addBtnName: string = "+ New Schedule";
  courseScheduleFromModel: FormGroup;
  courseId: number;
  dayOfWeek: any=[1,2,3,4,5,6,7];
  faculties:IFaculty[]
  Message: string
  errorMsg: boolean=false
  successMsg: boolean= false

  constructor(private fb: FormBuilder,
              private _courseServices: CourseService,
              private _activatedRoute: ActivatedRoute,
              private _facultyService: FacultyService,
              private _router: Router) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(routerparams=>{
      this.courseId=Number(routerparams.id)
      console.log(typeof (routerparams.id))
    });
    this.CreateScheduleFrom()
  }

  showScheduleFrom(){
    this.showForm =! this.showForm;
    if(this.showForm)
    {
      this.addBtnName = "Close";
    }
    else
    {
      this.addBtnName= "+ New Schedule";
    }
  }

  CreateScheduleFrom() : void{
    this.courseScheduleFromModel = this.fb.group({
      dayOfWeek:['', [Validators.required,
                      Validators.max(7),
                      Validators.min(1)]],
      startTime:['', [Validators.required]],
      endTime: ['', [Validators.required]],
      facultyId: ['', [Validators.required]],
      courseId: this.courseId
      });
     this.fetchAllFaculty()
  }

  fetchAllFaculty() {
    this._facultyService.getFaculties().subscribe(
      facultyData=>{
        this.faculties = facultyData
      })
  }

  onSubmit(): void {
    this._courseServices.createCourseSchedule(this.courseScheduleFromModel.value).subscribe(res=>{
      this.courseScheduleFromModel.value.courseId
      this.courseScheduleFromModel.reset();
      this.showForm=true;
      this._courseServices.refreshList();
      this.successMsg = true;
      this.Message = "Schedule Created Successfully"
    },
      (error)=>{
        this.errorMsg =true
        this.Message ="Something went wrong. Please Try again after some time..!"
        setTimeout(msg=>{ this.errorMsg = false}, 5000)
      })
    setTimeout(msg=>{
      this.successMsg = false;
    },4000);
  }
}
