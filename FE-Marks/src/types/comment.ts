// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type TComment = {
  content: string;
  markId: string;
  userId: string;
  id: string;
  numberOfLikes: number;
  like: boolean;
  createdAt: Date;
};

type TNewComment = Pick<TComment, "content" | "markId">;

export type { TComment, TNewComment };
