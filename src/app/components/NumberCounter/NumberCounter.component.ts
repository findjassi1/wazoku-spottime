import { Component, Input } from '@angular/core';

@Component({
  selector: 'number-counter',
  templateUrl: './NumberCounter.component.html',
  styleUrls: ['./NumberCounter.component.css']
})

export class NumberCounterComponent {
  title = 'number-counter'

  @Input() counterNumber: number
  @Input() counterLabel: string

  getNumber = (value): string => (
    value.toString().length === 1 ? '0' + value.toString(): value
  )

}
