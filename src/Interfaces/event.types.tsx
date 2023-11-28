import { TrailInterface } from "./trail.types";
import { UserInterface } from "./user.types";

export interface EventInterface {
  id: number;
  author: UserInterface;
  title: string;
  description: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  location: string;
  latitude: number;
  longitude: number;
  trail?: TrailInterface;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  invitees?: UserInterface[];
  participants?: UserInterface[];
}
