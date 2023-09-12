type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type Comment = {
  content: string;
  markId: string;
  id: string;
};

type TComment = Optional<Comment, "id">;

export { TComment };
