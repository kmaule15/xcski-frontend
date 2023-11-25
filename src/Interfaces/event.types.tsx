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
  trail?: {
    name: string;
    location: string;
    longitude: number;
    latitude: number;
  };
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
