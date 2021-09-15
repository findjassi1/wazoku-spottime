import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'wazoku-spottime';

  sprintStartDate: string
  sprintDays: number

  dateApplied(value): void {
    this.sprintStartDate = value.sprintStartDate
    this.sprintDays = value.sprintDays
  }
}
