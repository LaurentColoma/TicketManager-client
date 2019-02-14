import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import {DragDropModule} from "@angular/cdk/drag-drop";

// Component
import { AppComponent } from './app.component';

import { TicketComponent } from './component/ticket/ticket.component';
import { TicketDetailComponent } from './component/ticket/ticket-detail.component';

import { CreatingComponent } from './component/task/creating.component';
import { DevelopmentComponent } from './component/task/development.component';
import { PlanificationComponent } from './component/task/planification.component';
import { QualificationComponent } from './component/task/qualification.component';
import { TestingComponent } from './component/task/testing.component';
import { ValidationComponent} from './component/task/validation.component';

import { HomeComponent } from './component/button/home.component';
import { MainComponent } from './component/button/main.component';
import { TaskComponent } from './component/button/task.component';

import { ProfileComponent } from './component/profile/profile.component';

import { AlertComponent } from './component/alert/alert.component';

import { ConnectionComponent } from './component/logpackage/connection.component';
import { RegistrationComponent } from './component/logpackage/registration.component';

// Services
import { TicketService } from './service/ticket.service';
import { AlertService } from './service/alert.service';
import { DataService } from './service/data.service';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { SprintService } from './service/sprint.service';
import { CommentService } from './service/comment.service';
import { DataTransferService } from "./service/dataTransfer.service";
import { AuthGuard } from './service/authGuard';

// Routing
import { Routing } from './app.routing';

import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,

    TicketComponent,
    TicketDetailComponent,

    CreatingComponent,
    DevelopmentComponent,
    PlanificationComponent,
    QualificationComponent,
    TestingComponent,
    ValidationComponent,

    HomeComponent,
    MainComponent,
    TaskComponent,

    ProfileComponent,

    AlertComponent,

    ConnectionComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    DndModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
        }
      }
    }),
  ],
  providers: [
    TicketService,
    AlertService,
    DataService,
    AuthenticationService,
    UserService,
    SprintService,
    CommentService,
    DataTransferService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

