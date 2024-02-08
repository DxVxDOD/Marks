import Mark from "../models/markModel";

const mark = new Mark();

export type TMark = typeof mark & {
  id: string;
};

export type TNewMark = Pick<TMark, "title" | "tag" | "url">;

export type TMarkFE = Pick<TMark, "title" | "tag" | "url" | "likes">;
