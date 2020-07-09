import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CoursesComponent} from "./components/courses/courses.component";
import {StudentsComponent} from "./components/students/students.component";
import{FacultiesComponent} from "./components/faculties/faculties.component";
import {CourseScheduleComponent} from "./components/course-schedule/course-schedule.component";
import{AllListComponent} from "./components/all-list/all-list.component";
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {EnrolledCoursesForStudentsComponent} from "./components/students/enrolled-courses-for-students/enrolled-courses-for-students.component";
import {CourseAssignToFacultyComponent} from "./components/faculties/course-assign-to-faculty/course-assign-to-faculty.component";
import {CreateFacultyComponent} from "./components/faculties/create-faculty/create-faculty.component";

const routes: Routes=[
  {path: "",  component: HomeComponent},
  {path: "courses", component: CoursesComponent},
  {path: "students", component: StudentsComponent},
  {path: "faculties", component: FacultiesComponent},
  {path: "courses/:id", component: CourseScheduleComponent},
  {path: "students/:id", component: EnrolledCoursesForStudentsComponent},
  {path: "faculties/:id", component:CourseAssignToFacultyComponent},
  {path: "allList", component: AllListComponent},
  {path:'', redirectTo:"", pathMatch:"full"},
  {path:"**", component: PageNotFoundComponent},
  ];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
