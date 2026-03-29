import Mark from "../models/markModel";
import User from "../models/userModel";
import { TMarkFE, TNewMark } from "../types/mark";
import { TUser } from "../types/user";
import { stringParser } from "../utils/parsers/generalParsers";
import { markParser, newMarkParser } from "../utils/parsers/markParser";
import { wrapInPromise } from "../utils/promiseWrapper";

export const getAllMarks = async (user: TUser) => {
	const { data: allMarks, error: allMarksError } = await wrapInPromise(
		Mark.find({ user: user._id }).populate("user", { username: 1, name: 1 }),
	);
	if (allMarksError) {
		throw allMarksError;
	}
	if (!allMarks) {
		throw new Error("No marks returned");
	}

	console.log(allMarks.length);

	return allMarks;
};

export const getMarkById = async (id: string | undefined) => {
	const { data, error } = await wrapInPromise(
		Mark.findById(stringParser(id)).populate("user", {
			username: 1,
			name: 1,
		}),
	);
	if (error) throw error;
	if (!data) {
		throw new Error("No mark returned from database with provided id");
	}

	return data;
};

export const postNewMark = async (obj: Partial<TNewMark>, user: TUser) => {
	const { data: markData, error: markError } = await wrapInPromise(
		newMarkParser(obj),
	);
	if (markError) throw markError;

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
	if (savedMarkError) {
		throw new Error(
			`Error while saving Marks to database: ${savedMarkError.message}`,
		);
	}

	user.marks = user.marks.concat(savedMark._id);

	const { error: updatedUserError } = await wrapInPromise(user.save());
	if (updatedUserError) {
		throw new Error(
			`Error while saving user's Mark: ${updatedUserError.message}`,
		);
	}

	return savedMark;
};

export const deleteMark = async (
	user: TUser,
	markId: string | undefined,
): Promise<true> => {
	const { data: mark, error: markError } = await wrapInPromise(
		Mark.findById(stringParser(markId)),
	);
	if (markError) {
		throw markError;
	}
	if (!mark) {
		throw new Error("There was no mark with provided id.");
	}

	if (mark.user.toString() !== user.id.toString()) {
		throw new Error("You do not have the permission to delete this Mark");
	}

	const { data: deleteData, error: deleteError } = await wrapInPromise(
		Mark.findByIdAndDelete(markId),
	);
	if (deleteError) {
		throw deleteError;
	}
	if (!deleteData) {
		throw new Error("There was no mark to delete.");
	}

	user.marks = user.marks.filter(
		(m) => m._id.toString() !== mark._id.toString(),
	);

	const updatedUser = await wrapInPromise(user.save());

	if (!updatedUser.data || updatedUser.error) {
		throw new Error(
			"Error while updating user after Mark's deletion: " +
				updatedUser.error.message,
		);
	}

	return true;
};

export const updateMark = async (
	mark: Partial<TMarkFE>,
	userId: string,
	markId: string | undefined,
) => {
	const { data: markData, error: markError } = await wrapInPromise(
		markParser(mark),
	);
	if (markError) {
		throw markError;
	}

	const { data: oldMark, error: oldMarkError } = await wrapInPromise(
		Mark.findById(stringParser(markId)),
	);
	if (oldMarkError) {
		throw oldMarkError;
	}
	if (!oldMark) {
		throw new Error("Cannot find Mark with given id in data base: ");
	}

	const { data: user, error: userError } = await wrapInPromise(
		User.findById(userId),
	);
	if (userError) {
		throw userError;
	}
	if (!user) {
		throw new Error("Cannot find user in data base based on provided id.");
	}

	if (oldMark.user.toString() !== user.id) {
		throw new Error("You do not have permission to update this Mark");
	}

	const { data: updatedMark, error: updatedMarkError } = await wrapInPromise(
		Mark.findByIdAndUpdate(oldMark.id, markData, { new: true }),
	);
	if (updatedMarkError) {
		throw updatedMarkError;
	}
	if (!updatedMark) {
		throw new Error("Error while trying to update Mark: ");
	}

	user.marks = user.marks
		.filter((m) => m.id !== oldMark.id)
		.concat(updatedMark.id);

	const { error: updatedUser } = await wrapInPromise(user.save());
	if (updatedUser) {
		throw new Error(
			`Error while updating user's Mark array with updated Mark: ${updatedUser.message}`,
		);
	}

	return updatedMark;
};
