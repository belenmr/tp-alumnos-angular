import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StatusComponent } from './components/status/status.component';
import { StudentComponent } from './components/student/student.component';

import { LocalStorageService} from './services/local-storage.service';
import { QualificationComponent } from './components/qualification/qualification.component';
import { AverageComponent } from './components/average/average.component';
import { DisapprovedComponent } from './components/disapproved/disapproved.component';
import { UserManualComponent } from './components/user-manual/user-manual.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StatusComponent,
    StudentComponent,
    QualificationComponent,
    AverageComponent,
    DisapprovedComponent,
    UserManualComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
