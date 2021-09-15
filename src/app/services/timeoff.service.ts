import { isDevOrQA, makeRequest } from '../utils'
import timeoff1 from '../mocks/timeoff-1'
import timeoff2 from '../mocks/timeoff-2'
import timeoff3 from '../mocks/timeoff-3'
import timeoff4 from '../mocks/timeoff-4'
import timeoff5 from '../mocks/timeoff-5'
import timeoff6 from '../mocks/timeoff-6'
import timeoff7 from '../mocks/timeoff-7'
import timeoff8 from '../mocks/timeoff-8'
import timeoff9 from '../mocks/timeoff-9'
import timeoff10 from '../mocks/timeoff-10'
import timeoff11 from '../mocks/timeoff-11'
import timeoff12 from '../mocks/timeoff-12'
import timeoff13 from '../mocks/timeoff-13'
import timeoff14 from '../mocks/timeoff-14'
import timeoff15 from '../mocks/timeoff-15'
import timeoff16 from '../mocks/timeoff-16'
import timeoff17 from '../mocks/timeoff-17'
import timeoff18 from '../mocks/timeoff-18'
import timeoff19 from '../mocks/timeoff-19'
import timeoff20 from '../mocks/timeoff-20'

import members from '../mocks/members'
import {constants} from '../constants/index'

const timeoffUrl = 'https://api.hibob.com/v1/timeoff/outtoday'

// export const getTimeOff = () => {
//     makeRequest(timeoffUrl).subscribe({
//     next(response) { console.log(response); },
//     error(err) { console.error('Error: ' + err); },
//     complete() { console.log('Completed'); }
//     });
// }

export const getTimeOff = (startDate, sprintDays) => {
    // getSprintDaysDates(startDate, sprintDays) first //e.g. '2021-09-08', 20
    return getMembersIdsAndDaysOffMap()
}

/**
 * 1- concatenate responses
 * 2- filter the concatenated response to have only devs & qa
 * 3- reduce this one response to a new map with members ids and days off
 */
const getDaysOffForMembers = () => {
        
 const allDaysOffMembers = timeoff1.outs.concat(
    timeoff2.outs,
    timeoff3.outs,
    timeoff4.outs,
    timeoff5.outs,
    timeoff6.outs,
    timeoff7.outs,
    timeoff8.outs,
    timeoff9.outs,
    timeoff10.outs,
    timeoff11.outs,
    timeoff12.outs,
    timeoff13.outs,
    timeoff14.outs,
    timeoff15.outs,
    timeoff16.outs,
    timeoff17.outs,
    timeoff18.outs,
    timeoff19.outs,
    timeoff20.outs
 )

 return allDaysOffMembers
}

const filterDevsAndQAByID = () => {
    return getDaysOffForMembers().filter(dayOff => {
        return members.employees.findIndex(member => (
            member.id == dayOff.employeeId
            && isDevOrQA(member)
        )) !== -1
    })
}


const getMembersIdsAndDaysOffMap = () => {
    const map = {}
    filterDevsAndQAByID().forEach(x => map[x.employeeId] = (map[x.employeeId] || 0) + 1 )

    return map
}

const isWeekend = (date) => {
    const dt = new Date(date)
         
    return dt.getDay() == 6 || dt.getDay() == 0
}

const getStringFromDate = (date) => date.toISOString().split('T')[0]

const getNextDate = date => {
    date.setDate(new Date(date).getDate() + 1)

    return date
}

const getSprintDaysDates = (startDate, sprintDays) => {
    let date = new Date(startDate)
    let sprintDaysCounter = 0
    let dates = []

    do {
        if (!isWeekend(date)) {
            dates.push(getStringFromDate(date))
            sprintDaysCounter++
        }
        date = getNextDate(date)
    } while(sprintDaysCounter < sprintDays)

    return dates
}

// import {Inject, Injectable} from '@angular/core'
// import {HttpClient, HttpHeaders} from '@angular/common/http'
// import {Observable} from 'rxjs'
// import {take} from 'rxjs/operators'

// @Injectable({
//   providedIn: 'root',
// })
// export class MembersService {
//   private readonly membersUrl = 'https://api.hibob.com/v1/members'

//   private readonly headers = {
//     headers: new HttpHeaders(),
//   }

//   constructor(
//     @Inject(HttpClient) private http: HttpClient,
//   ) {}

//   ngOnInit(): void {
//       this.headers['Authentication'] = constants.hibobToken
//       this.headers['mode'] = 'no-cors'
//       this.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200/'
//       this.headers['Access-Control-Allow-Credentials'] = 'true'
//       this.headers['Access-Control-Allow-Methods'] = 'GET, DELETE, HEAD, OPTIONS'
//   }

//   getMembers(): Observable<any> {
//     return this.http.get<any>(this.membersUrl, this.headers).pipe(take(1))
//   }
// }
