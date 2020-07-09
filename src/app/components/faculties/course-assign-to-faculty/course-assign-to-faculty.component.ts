import { Component, OnInit } from '@angular/core';
import {ICourse} from "../../../models/ICourse";
import {ActivatedRoute, Router} from "@angular/router";
import {FacultyService} from "../../../services/faculty.service";
import {CourseService} from "../../../services/course.service";
import {filter} from "rxjs/operators";
import {IFaculty} from "../../../models/IFaculty";

@Component({
  selector: 'app-course-assign-to-faculty',
  templateUrl: './course-assign-to-faculty.component.html',
  styleUrls: ['./course-assign-to-faculty.component.css']
})
export class CourseAssignToFacultyComponent implements OnInit {
  AssignedCourseIdList: number[]=[];
  courseObjList:ICourse[]=[];
  assignedCoursesObjList: ICourse[]=[];
  faculties: IFaculty[];
  facultyId: number;
  statusMessage: string="Loading data, Please wait.."
  successMsg: boolean= false;
  errorMsg: boolean=false;
  Message: string;


  constructor(private _facultyService: FacultyService,
              private _courseService: CourseService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router)
  { }
  ngOnInit(): void {
    this.getFacultyID();
  }

  // Get faculty ID Here
  getFacultyID(): void{
    this._activatedRoute.params.subscribe(routeparams=>{
      this.fetchAssignedCourses(routeparams.id);
      this.facultyId= parseInt(routeparams.id);

    })
  }
  // Get all Assigned Faculty Course
  fetchAssignedCourses(facId: number): void{
    this._facultyService.getFacultyCourses(facId).subscribe(
      AssignedCourseData=> {
        this.AssignedCourseIdList = AssignedCourseData;
        console.log(this.AssignedCourseIdList)
        //get All Courses from the Course Object
        this.getAllCourses();
      },
        (error)=> {
          this.statusMessage = "Problem with the service. Please try again after some time..!"
        }
      );
  }
  //fetch all faculties Records
  fetchAllFaculties(): void{
    this._facultyService.getFaculties().subscribe(
      facultiesData=> {this.faculties = facultiesData
      // (error)=>{
      //   this.statusMessage="Problem with the service. Please try again after some time..!"
      });
  }

  //get All Courses from the Array of Course Object
  getAllCourses(): void{
    //Service call for all courses
    this._courseService.getCourses().subscribe(courseData=>{
      this.courseObjList=courseData
      console.log(this.courseObjList)
      //created new Array "assignedCoursesObjList" which store matched element of object.
      this.assignedCoursesObjList = this.courseObjList.filter(obj => this.AssignedCourseIdList.some(id => obj.courseId === id ))
      console.log(this.assignedCoursesObjList);
      this.fetchAllFaculties()
    })

  }
//This will store checked Item into the "assignedCoursesObjList"
  checked(item) {
    return this.assignedCoursesObjList.includes(item);
  }

  onChange(checkedItem, item){
    console.log(checkedItem, item)
    if(checkedItem){
      this.assignedCoursesObjList.push(item);
      console.log(this.assignedCoursesObjList);
    } else {
      this.assignedCoursesObjList.splice(this.assignedCoursesObjList.indexOf(item), 1)
    }
  }

  onSave() {
    let coursesTaught = this.assignedCoursesObjList.map(a => a.courseId);
    let facultyCourseSchema = {
      facultyId: this.facultyId,
      coursesTaught
    };
    console.log(coursesTaught)
    this._facultyService.updateFacultyCourses(facultyCourseSchema).subscribe(res=>{
      console.log(res)
      this.successMsg=true
      this.Message="Course Update Successful"
    },
      (error) => {
        this.errorMsg = true
        this.Message= "Something went wrong. Please try again after some time..!"
        setTimeout(msg=> {this.errorMsg =false}, 5000)
      })
    setTimeout(msg=> {
      this.successMsg = false;
    },4000);
  }

  onBackButtonClick(): void{
    this._router.navigate(['/faculties']);
  }
}
