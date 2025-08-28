export interface Speaker {
  id: string;
  name: string;
  role: string;
  summary: string;
  tags: string[];
  talk: {
    one_liner: string;
    highlights: string[];
    tips: string[];
  };
  practice: string[];
  albumId: string;
}

export interface Album {
  id: string;
  title: string;
  images: string[];
}

export interface MeetupData {
  event: {
    title: string;
    date: string;
    place: string;
    agenda: string[];
  };
  speakers: Speaker[];
  albums: Album[];
}
