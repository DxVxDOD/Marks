// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type TUser = {
  username: string;
  name: string;
  password: string;
  email: string;
  createdAt: Date;
  marks: string[];
  id: string;
};

type TNewUser = Pick<TUser, "username" | "name" | "password" | "email">;

export type { TUser, TNewUser };
