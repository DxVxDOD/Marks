// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type TComment = {
  content: string;
  markId: string;
  id: string;
};

type TNewComment = Omit<TComment, "id">;

export type { TComment, TNewComment };
