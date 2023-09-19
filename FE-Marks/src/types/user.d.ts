import { MarkT } from "./mark";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type UserT = {
  username: string;
  name: string;
  password: string;
  marks: MarkT[];
  id: string;
};

type User = Optional<UserT, "marks", "id">;

export { User };
