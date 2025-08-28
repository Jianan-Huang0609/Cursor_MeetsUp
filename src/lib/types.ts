export interface Event {
  title: string;
  date: string;
  place: string;
  agenda: string[];
}

export interface Talk {
  one_liner: string;
  highlights: string[];
  tips: string[];
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  summary: string;
  tags: string[];
  talk: Talk;
  practice: string[];
  albumId: string;
}

export interface Album {
  id: string;
  title: string;
  images: string[];
}

export interface MeetupData {
  event: Event;
  speakers: Speaker[];
  albums: Album[];
}
