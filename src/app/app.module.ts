import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MembersListComponent } from './components/MembersList/MembersList.component';
import { MemberCardComponent } from './components/MemberCard/MemberCard.component';
import { MemberInfoComponent } from './components/MemberInfo/MemberInfo.component';
import { NumberCounterComponent } from './components/NumberCounter/NumberCounter.component';
import { JiraCardInputComponent } from './components/JiraCardInput/JiraCardInput.component';
import { JiraCardLabelComponent } from './components/JiraCardLabel/JiraCardLabel.component';
import { SprintStartDateComponent } from './components/SprintStartDate/SprintStartDate.component';
import { TooltipModule } from 'ng2-tooltip-directive'

@NgModule({
  declarations: [
    AppComponent,
    MembersListComponent,
    MemberCardComponent,
    MemberInfoComponent,
    NumberCounterComponent,
    JiraCardInputComponent,
    JiraCardLabelComponent,
    SprintStartDateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
