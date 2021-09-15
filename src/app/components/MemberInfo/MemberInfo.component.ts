import { Component, Input } from '@angular/core';

@Component({
  selector: 'member-info',
  templateUrl: './MemberInfo.component.html',
  styleUrls: ['./MemberInfo.component.css']
})

export class MemberInfoComponent {
  title = 'member-info'

  @Input() name: string
  @Input() jobTitle: string
  @Input() avatar: string
}
