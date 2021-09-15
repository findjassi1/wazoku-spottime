import { Component, Inject, Input, OnChanges } from '@angular/core';
import { Member } from 'src/app/models/member';
import { constants } from '../../constants';
import { filterDevsAndQA, getMembers, MembersService } from '../../services/members.service';
import { getSprintDaysDates, getTimeOff, TimeOffService } from '../../services/timeoff.service';

@Component({
  selector: 'members-list',
  templateUrl: './MembersList.component.html',
  styleUrls: ['./MembersList.component.css'],
})

export class MembersListComponent implements OnChanges {
  title = 'members-list'

  @Input() sprintStartDate: string
  @Input() sprintDays: number

  allDevsAndQA: []
  membersWithTimeOff: Member[]

  constructor(
    @Inject(MembersService) public membersService: MembersService,
    @Inject(TimeOffService) public timeoffService: TimeOffService,
  ) {}

  ngOnInit(): void {
    // the next line should be removed, just for mocking
    this.allDevsAndQA = getMembers()

    // the next 2 lines should be removed as well
    const devsAndQAWithDaysOffMap = getTimeOff('2021-09-08', 20)

    this.setMembersWithTimeOff(this.allDevsAndQA, devsAndQAWithDaysOffMap)

    this.membersService.getMembers().subscribe(
      (members) => {
        this.allDevsAndQA = filterDevsAndQA(members.employees)
      },
      error => {
        console.log(error)
      },
      () => {

      }
    )
  }

  ngOnChanges(changes): void {
    if ((changes.sprintStartDate && this.sprintStartDate)
      || (changes.sprintDays && this.sprintDays)) {
        // the next 2 lines should be removed
      const devsAndQAWithDaysOffMap = getTimeOff(this.sprintStartDate, this.sprintDays)

      this.setMembersWithTimeOff(this.allDevsAndQA, devsAndQAWithDaysOffMap)


      const sprintDatesList = getSprintDaysDates(this.sprintStartDate, this.sprintDays)

      this.timeoffService.getTimeOff().subscribe(
        () => {
          
        },
        error => {
          console.log(error)
        },
        () => {
  
        }
      )
    }
  }

  setMembersWithTimeOff(allDevsAndQA, devsAndQAWithDaysOffMap): void {
    this.membersWithTimeOff = allDevsAndQA.map(member => ({
      id: member.id,
      email: member.email,
      displayName: member.displayName,
      title: member.work.title,
      department: member.work.department,
      avatarUrl: member.avatarUrl,
      isManager: member.work.isManager,
      daysOff: devsAndQAWithDaysOffMap[member.id] || 0,
      availableDays: constants.AVAILABLE_DAYS - (devsAndQAWithDaysOffMap[member.id] || 0)
    }))
  }

  memberRemoved(memberId): void {
    this.membersWithTimeOff = this.membersWithTimeOff.filter(x => x.id !== memberId)
  }
}
