import { 
    Component, 
    EventEmitter, 
    Input, 
    Output 
} from '@angular/core';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'member-card',
  templateUrl: './MemberCard.component.html',
  styleUrls: ['./MemberCard.component.css']
})

export class MemberCardComponent {
  title = 'member-card'

  @Input() member: Member
  @Output() memberRemoved = new EventEmitter<string>()

  jiraCards = ['IS-12121', 'IS-12939','IS-12121']

  addJiraCard(value): void {
    // Make the request to get the card estimate here,
    // mocking the estimate to 5 days for now
    let estimatedFor = 5
    this.jiraCards.push(value)
    this.member.availableDays -= estimatedFor
  }

  removeMember(): void {
    if (!this.jiraCards.length) {
      this.memberRemoved.emit(this.member.id)
    } else {
      // TODO: handle if member is assigned with an error message
      console.log("You can't remove a member already assigned to cards.")
    }
  }

  removeJiraCard(cardNumber): void {
    this.jiraCards = this.jiraCards.filter(x => x !== cardNumber)
  }
}
