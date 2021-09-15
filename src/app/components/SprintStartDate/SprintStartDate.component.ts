import { 
    Component, 
    EventEmitter, 
    Output, 
    ViewChild
} from '@angular/core';
import { constants } from 'src/app/constants';

@Component({
  selector: 'sprint-start-date',
  templateUrl: './SprintStartDate.component.html',
  styleUrls: ['./SprintStartDate.component.css']
})

export class SprintStartDateComponent {
  title = 'sprint-start-date'

  sprintDays: number

  @Output() dateApplied = new EventEmitter()
  @ViewChild('sprintStartDate') sprintStartDate

  ngOnInit(): void {
    this.sprintDays = constants.AVAILABLE_DAYS
  }

  applyStartDate(): void {
    this.dateApplied.emit({
      sprintStartDate: this.sprintStartDate.nativeElement.value,
      sprintDays: this.sprintDays,
    })
  }

  incrementDays(): void {
    this.sprintDays += 1
  }

  decrementDays(): void {
    this.sprintDays -= 1
  }
}
