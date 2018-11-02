import { Ticket } from './tickets';

export class Comment {
  id: number;
  content: string;
  ticket: Ticket;
}
