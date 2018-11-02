import { Routes, RouterModule } from '@angular/router';

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

const appRoutes: Routes = [
  {
        path: '',
        redirectTo: '/connection',
        pathMatch: 'full'
      },
      {
        path: 'ticket',
        component: TicketComponent,
      },
      {
        path: 'details/:id',
        component: TicketDetailComponent,
      },
      {
        path: 'creating',
        component: CreatingComponent,
      },
      {
        path: 'qualification',
        component: QualificationComponent,
      },
      {
        path: 'planification',
        component: PlanificationComponent,
      },
      {
        path: 'development',
        component: DevelopmentComponent,
      },
      {
        path: 'testing',
        component: TestingComponent,
      },
      {
        path: 'validate',
        component: ValidationComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'connection',
        component: ConnectionComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      }
];

export const Routing = RouterModule.forRoot(appRoutes);
