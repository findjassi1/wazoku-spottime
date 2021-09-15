import { 
    Component, 
    EventEmitter,
    Input, 
    Output 
} from '@angular/core';

@Component({
  selector: 'jira-card-label',
  templateUrl: './JiraCardLabel.component.html',
  styleUrls: ['./JiraCardLabel.component.css']
})

export class JiraCardLabelComponent {
  title = 'jira-card-label'

  @Input() cardNumber: string
  @Output() cardRemoved = new EventEmitter()

  removeCard(): void {
    this.cardRemoved.emit(this.cardNumber)
  }
}
