import { Component, OnInit } from '@angular/core'
import{ICourse} from "../../../models/ICourse";
import{StudentService} from "../../../services/student.service";
import {ActivatedRoute, Router} from "@angular/router";
import {formatNumber} from "@angular/common";
import {CourseService} from "../../../services/course.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {IStudent} from "../../../models/IStudent";

@Component({
  selector: 'app-enrolled-courses-for-students',
  templateUrl: './enrolled-courses-for-students.component.html',
  styleUrls: ['./enrolled-courses-for-students.component.css']
  // animations:[
  //  trigger('fade',[
  //    transition(':leave',[
  //      style({opacity:1}),
  //      animate(600, style({opacity:0}))
  //    ])
  //  ])
  // ]
})
export class EnrolledCoursesForStudentsComponent implements OnInit {

  arrayOfCourseList: ICourse[] =[];
  enrolledCourseIDs: number[]=[];
  arrayOfEnrolledCoursesList: ICourse[]=[];
  students: IStudent[]
  studentId: number;
  statusMessage: string="Loading data, Please wait.."
  successMsg: boolean = false;
  errorMsg: boolean =false;
  Message:string


  constructor(private _studentService: StudentService,
              private _activatedRoute: ActivatedRoute,
              private _courseService: CourseService,
              private _router: Router)
              { }

  ngOnInit(): void {
    this.getStudentID();

  }

  getStudentID(): void{
    this._activatedRoute.params.subscribe(routeparams=>{
      this.fetchEnrolledCourses(routeparams.id);
      this.studentId= parseInt(routeparams.id);

    })
  }
  //Get all Enrolled Student Course
  fetchEnrolledCourses(studId: number): void{
    this._studentService.getEnrolledCourses(studId).subscribe(
      enrolledCourseData=> {
        this.enrolledCourseIDs = enrolledCourseData;
        console.log(this.enrolledCourseIDs)
        this.getAllCourses();
      },
      error=> {
         this.statusMessage = "Problem with the service. Please try again after some time..!"
       }
      );
  }
  //fetch all Students Records
  fetchAllStudents(): void{
    this._studentService.getStudentS().subscribe(
      studentsData=>{this.students= studentsData
    // (error)=>{
    //   this.statusMessage="Problem with the service. Please try again after some time..!"
      });

  }
  //get All Courses from the Array of Course Object
  getAllCourses():void
  {
    //Service call to get all course Data.
    this._courseService.getCourses().subscribe(allCourseData=>{
      this.arrayOfCourseList=allCourseData
      console.log(this.arrayOfCourseList)
      //Created new Array of "arrayOfEnrolledCoursesList" which store matched element of object.
      this.arrayOfEnrolledCoursesList = this.arrayOfCourseList.filter(obj=> this.enrolledCourseIDs.some(id=> obj.courseId === id))
      console.log(this.arrayOfEnrolledCoursesList)
      this.fetchAllStudents()
    })
  }
  //This will store checked item into the "arrayOfEnrolledCourseList"
  checked(item)
  {
    return this.arrayOfEnrolledCoursesList.includes(item);
  }

  onChange(checkedItem, item) {
    console.log(checkedItem,item)
    if(checkedItem) {
      this.arrayOfEnrolledCoursesList.push(item);
      console.log(this.arrayOfEnrolledCoursesList);
    }
    else {
      this.arrayOfEnrolledCoursesList.splice(this.arrayOfEnrolledCoursesList.indexOf(item), 1)
    }
  }

  onSave(){
    let coursesEnrolled = this.arrayOfEnrolledCoursesList.map(a=>a.courseId);
    let studentCourseSchema ={
      studentId: this.studentId,
      coursesEnrolled
    };
    console.log(coursesEnrolled)
    this._studentService.updateStudentCourses(studentCourseSchema).subscribe(res=>{
     // console.log(res)
      this.successMsg=true
      this.Message ="Course Update Successful."
    },
      (error) => {
        this.errorMsg =true
        this.Message=  "Something went wrong. Please try again after some time..!"
        setTimeout(msg=> {this.errorMsg=false}, 5000)
      })

    setTimeout(msg=> {
      this.successMsg = false;
    },4000);
  }
  onBackButtonClick(): void{
    this._router.navigate(['/students']);
  }
}
