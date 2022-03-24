export interface Video {
  name: string;
  id: string;
  ytUrl: string;
  creators: [string];
  docId: string;
}
export interface Comment {
  commentTxt: string;
  id: string;
  userId: string;
  videoTime: number;
  date: unknown;
}
export interface User {
  name: string;
  id: string;
  creator: boolean;
  password: string;
  email: string;
}
