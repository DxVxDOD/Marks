import { TMark } from "./mark";

// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type TUser = {
  username: string;
  name: string;
  password: string;
  marks: TMark[];
  id: string;
};

type TNewUser = Omit<TUser, "marks" | "id">;

export type { TUser, TNewUser };
