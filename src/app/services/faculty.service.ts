import { Injectable } from '@angular/core';
import {IFaculty} from "../models/IFaculty";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICourse} from "../models/ICourse";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  newList: IFaculty[];
  constructor(private _httpClient: HttpClient) { }

  getFaculties(): Observable<IFaculty[]>{
    return this._httpClient.get<IFaculty[]>(environment.baseUrl +"Faculties");
  }

  getFacultyCourses(facultyId:number): Observable<number[]>{
    return this._httpClient.get<number[]>(environment.baseUrl + "Faculties/"+facultyId+"/Courses");
  }

  createFaculty(faculty: IFaculty): Observable<IFaculty>{
    return this._httpClient.post<IFaculty>(environment.baseUrl + "Faculties", faculty);
  }

  updateFacultyCourses(courses): Observable<number[]>{
    return this._httpClient.put<number[]>(environment.baseUrl + "Faculties/"+courses.facultyId+"/Courses", courses);
  }

  refreshList() {
    this._httpClient.get(environment.baseUrl + "Faculties")
      .toPromise().then(res=> this.newList = res as IFaculty[]);
  }
}
