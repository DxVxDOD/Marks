import Mark from "../models/markModel";
import { TMarkFE, TNewMark } from "../types/mark";
import { TUser } from "../types/user";
import { stringParser } from "../utils/parsers/generalParsers";
import { markParser, newMarkParser } from "../utils/parsers/markParser";
import { wrapInPromise } from "../utils/promiseWrapper";

export const getAllMarks = async () => {
	const { data: allMarks, error: allMarksError } = await wrapInPromise(
		Mark.find({}).populate("user", { username: 1, name: 1 })
	);

	if (!allMarks || allMarksError) {
		throw new Error(
			"Error while fetching all Marks from database: " +
				allMarksError.message
		);
	}

	return allMarks;
};

export const getMarkById = async (id: string | undefined) => {
	const { data, error } = await wrapInPromise(
		Mark.findById(stringParser(id))
	);

	if (!data || error) {
		throw new Error(
			"Error while fetching mark from database with provided id: " + error
		);
	}

	return data;
};

export const postNewMark = async (obj: Partial<TNewMark>, user: TUser) => {
	const { data: markData, error: markError } = await wrapInPromise(
		newMarkParser(obj)
	);

	if (!markData || markError) {
		throw new Error(markError.message);
	}

	const mark = new Mark({
		title: markData.title,
		tag: markData.tag,
		url: markData.url,
		likes: 0,
		user: user.id,
	});

	const { data: savedMark, error: savedMarkError } = await wrapInPromise(
		mark.save()
	);

	if (!savedMark || savedMarkError) {
		throw new Error(
			"Error while saving Marks to database: " + savedMarkError
		);
	}

	user.marks = user.marks.concat(savedMark._id);

	const { data: updatedUser, error: updatedUserError } = await wrapInPromise(
		user.save()
	);

	if (updatedUserError || !updatedUser) {
		throw new Error(
			"Error while saving user's Mark: " + updatedUserError.message
		);
	}

	return savedMark;
};

export const deleteMark = async (user: TUser, markId: string | undefined) => {
	const { data: mark, error: markError } = await wrapInPromise(
		Mark.findById(stringParser(markId))
	);

	if (!mark || markError) {
		throw new Error(
			"Error while trying to fetch Mark with provided id from database: " +
				markError.message
		);
	}

	if (mark.user.toString() !== user.id.toString()) {
		throw new Error("You do not have the permission to delete this Mark");
	}

	const { data: deleteData, error: deleteError } = await wrapInPromise(
		Mark.findByIdAndDelete(markId)
	);

	if (!deleteData || deleteError) {
		throw new Error(
			"Error while finding and deleting Mark: " + deleteError.message
		);
	}

	user.marks = user.marks.filter(
		(m) => m._id.toString() !== mark._id.toString()
	);

	const updatedUser = await wrapInPromise(user.save());

	if (!updatedUser.data || updatedUser.error) {
		throw new Error(
			"Error while updating user after Mark's deletion: " +
				updatedUser.error.message
		);
	}

	return true;
};

export const updateMark = async (
	mark: Partial<TMarkFE>,
	user: TUser,
	markId: string | undefined
) => {
	const { data: markData, error: markError } = await wrapInPromise(
		markParser(mark)
	);

	if (!markData || markError) {
		throw new Error(markError.message);
	}

	const { data: oldMark, error: oldMarkError } = await wrapInPromise(
		Mark.findById(stringParser(markId))
	);

	if (!oldMark || oldMarkError) {
		throw new Error(
			"Cannot find Mark with given id in data base: " +
				oldMarkError.message
		);
	}

	if (oldMark.user.toString() !== user.id) {
		throw new Error("You do not have permission to update this Mark");
	}

	const { data: updatedMark, error: updatedMarkError } = await wrapInPromise(
		Mark.findByIdAndUpdate(oldMark.id, markData, { new: true })
	);

	if (!updatedMark || updatedMarkError) {
		throw new Error(
			"Error while trying to update Mark: " + updatedMarkError.message
		);
	}
	user.marks = user.marks
		.filter((m) => m.id !== oldMark.id)
		.concat(updatedMark.id);

	const updatedUser = await wrapInPromise(user.save());

	if (!updatedUser.data || updatedUser.error) {
		throw new Error(
			"Error while updating user's Mark array with updated Mark: " +
				updatedUser.error.message
		);
	}

	return updatedMark;
};
