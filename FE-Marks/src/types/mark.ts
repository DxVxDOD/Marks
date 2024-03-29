// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type TMark = {
  title: string;
  tag: string;
  url: string;
  likes: number;
  id: string;
  user: {
    username: string;
    name: string;
  };
  createdAt: Date;
};

type TNewMark = Pick<TMark, "title" | "tag" | "url">;

// type TMark = Optional<Mark, "likes" | "id" | "user">;

export type { TMark, TNewMark };
