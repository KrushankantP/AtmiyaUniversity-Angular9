import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../services/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ICourse} from "../../../models/ICourse";


@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  showForm: boolean=false;
  addBtnName: string ="+ New Course";
  courseId: number;
  @Input() inputCourseObj:ICourse;
  course: ICourse;
  courseFormModel: FormGroup;
  Message: string
  errorMsg: boolean=false
  successMsg: boolean=false
  pageTitle: string;

  constructor(private fb: FormBuilder,
              private _coursesServices: CourseService,
              private _route: ActivatedRoute,
              private _router: Router,) { }

  ngOnInit(): void {
    this.createCoursesForm();
    this._route.paramMap.subscribe(params=> {
      this.courseId = +params.get('id');
      if(this.courseId != undefined) {
        this.pageTitle = 'Edit Course'
        console.log(this.courseId)
        console.log(this._coursesServices.ServiceCourseObj)
        this.editCourse(this._coursesServices.ServiceCourseObj)

      } else {
        this.pageTitle = 'Create Course'
        this.course={
          courseId: null,
          courseCode:'',
          title:''
        };

      }
    });
  }

  // showCourseForm(){
  //   this.showForm =! this.showForm;
  //   if(this.showForm)
  //   {
  //     this.addBtnName = "Close";
  //   }
  //   else {
  //     this.addBtnName ="+ New Course";
  //   }
  // }

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

  editCourse(course) {
    this.courseFormModel.patchValue({
      courseCode: course.courseCode,
      title: course.title
    });
  }
}
