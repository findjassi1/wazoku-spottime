import members from '../mocks/members'
import { isDevOrQA, makeRequest } from '../utils'
import { constants } from '../constants'

const membersUrl = 'https://api.hibob.com/v1/members'

// export const getMembers = () => {
//     makeRequest(membersUrl).subscribe({
//     next(response) { console.log(response); },
//     error(err) { console.error('Error: ' + err); },
//     complete() { console.log('Completed'); }
//     });
// }

export const getMembers = () => {
    return filterDevsAndQA(members.employees)
}

export const filterDevsAndQA = members => members.filter(isDevOrQA)



import {Inject, Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import {take} from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private readonly membersUrl = 'https://api.hibob.com/v1/people'

  private readonly headers = {
    headers: new HttpHeaders(),
  }

  constructor(
    @Inject(HttpClient) private http: HttpClient,
  ) {}

  ngOnInit(): void {
      this.headers['Authentication'] = constants.hibobToken
      this.headers['mode'] = 'no-cors'
      this.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200/'
      this.headers['Access-Control-Allow-Credentials'] = 'true'
      this.headers['Access-Control-Allow-Methods'] = 'GET, DELETE, HEAD, OPTIONS'
  }

  getMembers(): Observable<any> {
    return this.http.get<any>(this.membersUrl, this.headers).pipe(take(1))
  }
}
