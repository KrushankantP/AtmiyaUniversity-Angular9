import { Injectable } from '@angular/core';
import{ICourse} from "../models/ICourse";
import{HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, pipe, throwError} from "rxjs";
import{catchError} from "rxjs/operators";
import {ICourseSchedule} from "../models/ICourse-schedule";
import {environment} from "../../environments/environment";
import {IStudent} from "../models/IStudent";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private newList: ICourse[];

  constructor(private _httpClient: HttpClient) { }

  getCourses(): Observable<ICourse[]>{
        return this._httpClient.get<ICourse[]>(environment.baseUrl + "Courses");
        //.pipe(catchError(this.handleError));
  }

  getCourseSchedule(courseId:number): Observable<ICourseSchedule[]>{
    return this._httpClient.get<ICourseSchedule[]>(environment.baseUrl + "Courses/"+courseId+"/schedule");
  }

  createCourseSchedule(courseSchedule: ICourseSchedule): Observable<ICourseSchedule> {
    return this._httpClient.post<ICourseSchedule>(environment.baseUrl + "Courses/"+courseSchedule.courseId+"/schedule", courseSchedule);
  }

  createCourse(course: ICourse): Observable<ICourse>{
    return this._httpClient.post<ICourse>(environment.baseUrl + "Courses", course);
  }

  refreshList() {
    this._httpClient.get(environment.baseUrl + "Students")
      .toPromise().then(res=> this.newList = res as ICourse[]);
  }
  private handleError(errorResponse:HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
      console.error('client side Error: ', errorResponse.error.message);
    }
    else
    {
      console.error('Server side Error: ', errorResponse);
    }
   return throwError('There is a problem with the service. we will notified and working on it');
  }


}

