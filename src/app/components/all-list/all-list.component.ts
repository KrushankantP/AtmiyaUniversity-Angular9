import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-list',
  templateUrl: './all-list.component.html',
  styleUrls: ['./all-list.component.css']
})
export class AllListComponent implements OnInit {

  courseList: boolean = false
  studentList: boolean = false
  facultyList: boolean = false
  courseListBtn: string ="Course List"
  studentListBtn: string ="Student List"
  facultyListBtn: string ="Faculty List"

  constructor() { }

  ngOnInit(): void {

  }

  courseListComponent(){
    this.courseList =! this.courseList;
    if(this.courseList)
    {
      this.courseListBtn = "Close";
      this.studentListBtn ="Student List";
      this.facultyListBtn ="Faculty List";
      this.courseList=true
      this.studentList=false
      this.facultyList=false
    }
    else {
      this.courseListBtn ="Course List";
    }
  }
  studentListComponent(){
    this.studentList =! this.studentList;
    if(this.studentList)
    {
      this.studentListBtn = "Close"
      this.facultyListBtn ="Faculty List";
      this.courseListBtn ="Course List";
      this.studentList= true
      this.courseList = false
      this.facultyList= false
    }
    else {
      this.studentListBtn ="Student List";
    }
  }
  facultyListComponent(){
    this.facultyList =! this.facultyList;
    if(this.facultyList)
    {
      this.facultyListBtn = "Close";
      this.studentListBtn ="Student List";
      this.courseListBtn ="Course List";
      this.facultyList =true
      this.studentList=false
      this.courseList=false
    }
    else {
      this.facultyListBtn ="Faculty List";
    }
  }
}
