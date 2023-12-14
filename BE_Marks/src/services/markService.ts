import { Types } from "mongoose";
import Mark from "../models/markModel";
import { TMark, TNewMark } from "../types/mark";
import { TUser } from "../types/user";
import { markParser } from "../utils/parsers/markParser";
import { wrapInPromise } from "../utils/promiseWrapper";

export const postNewMark = async (obj: Partial<TNewMark>, user: TUser) => {
  const { data: markData, error: markError } = await wrapInPromise<TNewMark>(
    markParser(obj),
  );

  if (markError || !markData) {
    throw new Error(markError);
  }

  const mark = new Mark({
    title: markData.title,
    tag: markData.tag,
    url: markData.url,
    likes: 0,
    user: user.id,
  });

  const { data: savedMark, error: savedMarkError } = await wrapInPromise<
    TMark & { _id: Types.ObjectId }
  >(mark.save());

  if (!savedMark || savedMarkError) {
    throw new Error("Error while saving Marks to database: " + savedMarkError);
  }

  user.marks = user.marks.concat(savedMark._id);

  const { data: updatedUser, error: updatedUserError } = await wrapInPromise(
    user.save(),
  );

  if (updatedUserError || !updatedUser) {
    throw new Error("Error while updating user's Marks");
  }

  return savedMark;
};
