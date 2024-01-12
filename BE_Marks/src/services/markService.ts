import Mark from "../models/markModel";
import User from "../models/userModel";
import { TMarkFE, TNewMark } from "../types/mark";
import { TUser } from "../types/user";
import { stringParser } from "../utils/parsers/generalParsers";
import { markParser, newMarkParser } from "../utils/parsers/markParser";
import { wrapInPromise } from "../utils/promiseWrapper";

export const getAllMarks = async () => {
  const { data: allMarks, error: allMarksError } = await wrapInPromise(
    Mark.find({}).populate("user", { username: 1, name: 1 }),
  );

  if (!allMarks || allMarksError) {
    throw new Error(
      "Error while fetching all Marks from database: " + allMarksError,
    );
  }

  return allMarks;
};

export const postNewMark = async (obj: Partial<TNewMark>, user: TUser) => {
  const { data: markData, error: markError } = await wrapInPromise(
    newMarkParser(obj),
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

  const { data: savedMark, error: savedMarkError } = await wrapInPromise(
    mark.save(),
  );

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

export const getMarkById = async (id: string | undefined) => {
  const { data, error } = await wrapInPromise(Mark.findById(stringParser(id)));

  if (!data || error) {
    throw new Error(
      "Error while fetching user from database with provided id: " + error,
    );
  }

  return data;
};

export const deleteMark = async (
  userId: string | undefined,
  markId: string | undefined,
) => {
  const { data: user, error: userError } = await wrapInPromise(
    User.findById(stringParser(userId)),
  );
  const { data: mark, error: markError } = await wrapInPromise(
    Mark.findById(stringParser(markId)),
  );

  if (!mark || markError) {
    throw new Error(
      "Error while trying to fetch Mark with provided id from database: " +
        markError,
    );
  }

  if (!user || userError) {
    throw new Error(
      "Error while trying to fetch user with provided id from database: " +
        userError,
    );
  }

  if (mark.user.toString() !== user.id.toString()) {
    throw new Error("You do not have the permission to delete this Mark");
  }

  await Mark.findByIdAndDelete(markId);
};

export const updateMark = async (
  mark: Partial<TMarkFE>,
  userId: string | undefined,
  markId: string | undefined,
) => {
  const { data: newMarkData, error: newMarkError } = await wrapInPromise(
    markParser(mark),
  );

  if (!newMarkData || newMarkError) {
    throw new Error(newMarkError);
  }

  const user = await wrapInPromise(User.findById(stringParser(userId)));

  if (!user.data || user.error) {
    throw new Error("Token is invalid" + user.error);
  }

  const { data: oldMark, error: oldMarkError } = await wrapInPromise(
    Mark.findById(stringParser(markId)),
  );

  if (!oldMark || oldMarkError) {
    throw new Error(
      "Cannot find Mark with given id in data base" + oldMarkError,
    );
  }

  if (oldMark.user.toString() !== user.data.id) {
    throw new Error("You do not have permission to update this Mark");
  }

  const updatedMark = await wrapInPromise(
    Mark.findByIdAndUpdate(oldMark.id, newMarkData, { new: true }),
  );

  if (!updatedMark.data || updatedMark.error) {
    throw new Error("Error while trying to update Mark" + updatedMark.error);
  }

  return updatedMark.data;
};
