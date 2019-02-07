import { Routes, RouterModule, CanActivate} from '@angular/router';

// Main App: Ticket
import { TicketComponent } from "./component/ticket/ticket.component";
import { TicketDetailComponent } from "./component/ticket/ticket-detail.component";

// Main App: Task
import { CreatingComponent } from "./component/task/creating.component";
import { QualificationComponent} from "./component/task/qualification.component";
import { PlanificationComponent} from "./component/task/planification.component";
import { DevelopmentComponent} from "./component/task/development.component";
import { TestingComponent} from "./component/task/testing.component";
import { ValidationComponent} from "./component/task/validation.component";

// Main App: Profile
import { ProfileComponent } from './component/profile/profile.component';

// Main App: LogPackage
import { ConnectionComponent } from "./component/logpackage/connection.component";
import { RegistrationComponent } from "./component/logpackage/registration.component";

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {AuthGuard} from "./service/authGuard";

const appRoutes: Routes = [
  {
        path: '',
        redirectTo: '/authentication',
        pathMatch: 'full'
      },
      {
        path: 'ticket',
        component: TicketComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'details',
        component: TicketDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'creation',
        component: CreatingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'qualification',
        component: QualificationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'planification',
        component: PlanificationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'development',
        component: DevelopmentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'testing',
        component: TestingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'validate',
        component: ValidationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'authentication',
        component: ConnectionComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      }
];

export const Routing = RouterModule.forRoot(appRoutes);
