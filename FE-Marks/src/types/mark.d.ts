import { User } from "./user";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type Mark = {
  title: string;
  author: string;
  url: string;
  likes: number;
  id: string;
  user: User;
};

type MarkT = Optional<Mark, "likes" | "id" | "user">;

export { MarkT };
