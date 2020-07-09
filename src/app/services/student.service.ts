import { Injectable } from '@angular/core';
import {IStudent} from "../models/IStudent";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ICourse} from "../models/ICourse";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  edit;
  newList:IStudent[];
  constructor(private _httpClient: HttpClient) { }

  getStudentS(): Observable<IStudent[]>{
      return this._httpClient.get<IStudent[]>(environment.baseUrl + "Students");
  }

  getEnrolledCourses(studentId:number): Observable<number[]>{
    return this._httpClient.get<number[]>(environment.baseUrl + "Students/"+studentId+"/Courses");
  }

  CreateStudent(student: IStudent): Observable<IStudent>{
    return this._httpClient.post<IStudent>(environment.baseUrl + "Students", student);
  }
  updateStudentCourses(courses): Observable<number[]>{
    return this._httpClient.put<number[]>(environment.baseUrl + "Students/"+courses.studentId+"/Courses", courses);
  }

  refreshList() {
    this._httpClient.get(environment.baseUrl + "Students")
      .toPromise().then(res=> this.newList = res as IStudent[]);
  }
}
