import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../services/course.service";
import validate = WebAssembly.validate;


@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  showForm: boolean=false;
  addBtnName: string ="+ New Course";
  courseFormModel: FormGroup;
  Message: string
  errorMsg: boolean=false
  successMsg: boolean=false

  constructor(private fb: FormBuilder,
              private _coursesServices: CourseService) { }

  ngOnInit(): void {
    this.createCoursesForm();
  }

  showCourseForm(){
    this.showForm =! this.showForm;
    if(this.showForm)
    {
      this.addBtnName = "Close";
    }
    else {
      this.addBtnName ="+ New Course";
    }
  }
  createCoursesForm(): void{
    this.courseFormModel = this.fb.group({
      courseCode:['',[Validators.required, Validators.minLength(3),
                      Validators.maxLength(10)]],
      title:['', [Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50)]
            ]
    });
  }

  onSubmit(): void {
    // this._studentService.CreateStudent(this.StudentFormModel.value).subscribe((student:IStudent) => {
    this._coursesServices.createCourse(this.courseFormModel.value).subscribe(res=> {
      this.courseFormModel.reset();
      this.showForm =true;
      this._coursesServices.refreshList();
      this.successMsg =true
      this.Message="Course Created Successful"
    },
      (error)=>{
      this.errorMsg= true
        this.Message="Something went wrong. Please try again after some time..!"
        setTimeout(msg=>{this.errorMsg=false}, 5000)
      })

    setTimeout(msg=>{
      this.successMsg=false;
    }, 4000);
  }

}
