// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type TComment = {
  content: string;
  markId: string;
  id: string;
};

// type TComment = Optional<Comment, "id">;

export type { TComment };
