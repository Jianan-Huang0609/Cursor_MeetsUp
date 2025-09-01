export interface Speaker {
  id: string;
  name: string;
  role: string;
  summary: string;
  tags: string[];
  talk: {
    one_liner: string;
  };
  personal_practice: string[];
  personal_development: string[];
  albumId: string;
}

export interface Album {
  id: string;
  title: string;
  images: string[];
  speakerId: string;
}

export interface MeetupData {
  event: {
    title: string;
    date: string;
    time: string;
    place: string;
    agenda: string[];
  };
  speakers: Speaker[];
  albums: Album[];
}
