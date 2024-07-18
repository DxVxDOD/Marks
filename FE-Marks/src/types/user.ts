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

type TCredentials = Pick<TUser, "username" | "password">;

export type { TUser, TNewUser, TCredentials };
