import { EventInterface } from "./event.types";
import { TrailInterface } from "./trail.types";

export interface UserInterface {
  id: number;
  email: string;
  username: string;
  password: string;
  role: string;
  authoredEvents: EventInterface[];
  participatedEvents: EventInterface[];
  invitedEvents: EventInterface[];
  myTrails: TrailInterface[];
  // posts: PostInterface[];
}
