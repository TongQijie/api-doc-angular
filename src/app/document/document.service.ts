import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProjectCatalog, ApiInfo } from './document.service.model'

@Injectable()
export class DocumentService {

  constructor(private http: HttpClient) { }

  getProjectCatalog(organization: string, project: string): Observable<ProjectCatalog> {
    return this.http.post<ProjectCatalog>("http://192.168.0.106:5000/api/CommonService/GetProjectCatalog", {
      organization: organization,
      project: project
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  getApiInfo(api: string): Observable<ApiInfo> {
    return this.http.post<ApiInfo>("http://192.168.0.106:5000/api/CommonService/GetApiInfo", {
          api: api
      }, {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      })
  }
}
