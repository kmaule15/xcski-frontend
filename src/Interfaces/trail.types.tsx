export interface TrailInterface {
  id: number;
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
