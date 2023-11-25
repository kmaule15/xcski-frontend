import { TrailInterface } from "./trail.types";

export interface EventInterface {
  id: number;
  author: {
    username: string;
    email: string;
  };
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
  invitees?: {
    username: string;
    email: string;
  }[];
  participants?: {
    username: string;
    email: string;
  }[];
}
