import { EventInterface } from "./event.types";

export interface UserInterface {
  id: number;
  email: string;
  username: string;
  password: string;
  role: string;
  authoredEvents: EventInterface[];
  participatedEvents: EventInterface[];
  invitedEvents: EventInterface[];
  // posts: PostInterface[];
}
