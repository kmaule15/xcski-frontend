import { UserInterface } from "./user.types";

export interface TrailInterface {
  id: number;
  author: UserInterface;
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  difficulty: string;
  length: number;
  estimatedTime: number;
  typesAllowed: string[];
  events?: Event[];
}
