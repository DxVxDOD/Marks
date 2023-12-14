import { TUserMarks } from "./user";

export type TMark = {
  title: string;
  tag: string;
  url: string;
  likes: number;
  user: TUserMarks;
  createdAt: Date;
  id: string;
};

export type TNewMark = Pick<TMark, "title" | "tag" | "url">;
