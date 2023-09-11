type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type UserT = {
  username: string;
  name: string;
  password: string;
  blogs: Blogs[];
  id: string;
};

type User = Optional<UserT, "blogs", "id">;

export { User };
