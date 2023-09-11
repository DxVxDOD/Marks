import { User } from "./user";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type Blog = {
  title: string;
  author: string;
  url: string;
  likes: number;
  id: string;
  user: User;
};

type BlogT = Optional<Blog, "likes" | "id" | "user">;

export { BlogT };
