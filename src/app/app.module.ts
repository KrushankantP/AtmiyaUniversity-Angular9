import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import { CoursesComponent } from './components/courses/courses.component';
import { FacultiesComponent } from './components/faculties/faculties.component';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from "@angular/router";
import { CourseScheduleComponent } from './components/course-schedule/course-schedule.component';
import { AllListComponent } from './components/all-list/all-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import {CourseScedulePipe} from "./components/course-schedule/CourseScedule.pipe";
import { CreateStudentComponent } from './components/students/create-student/create-student.component';
import {ReactiveFormsModule} from "@angular/forms";
import { EnrolledCoursesForStudentsComponent } from './components/students/enrolled-courses-for-students/enrolled-courses-for-students.component';
import { CreateCourseComponent } from './components/courses/create-course/create-course.component';
import { CreateFacultyComponent } from './components/faculties/create-faculty/create-faculty.component';
import { CreateCourseScheduleComponent } from './components/course-schedule/create-course-schedule/create-course-schedule.component';
import { CourseAssignToFacultyComponent } from './components/faculties/course-assign-to-faculty/course-assign-to-faculty.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    CoursesComponent,
    FacultiesComponent,
    CourseScheduleComponent,
    AllListComponent,
    PageNotFoundComponent,
    HomeComponent,
    CourseScedulePipe,
    CreateStudentComponent,
    EnrolledCoursesForStudentsComponent,
    CreateCourseComponent,
    CreateFacultyComponent,
    CreateCourseScheduleComponent,
    CourseAssignToFacultyComponent

  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        NgbModule
    ],
  entryComponents: [ CreateStudentComponent ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
