// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type TMark = {
  title: string;
  tags: string[];
  url: string;
  favourite: boolean;
  id: string;
  user: {
    username: string;
    name: string;
  };
  createdAt: Date;
};

type TNewMark = Pick<TMark, "title" | "tags" | "url">;

// type TMark = Optional<Mark, "likes" | "id" | "user">;

export type { TMark, TNewMark };
