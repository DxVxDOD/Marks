import { describe, expect, test } from "vitest";
import { wrapInPromise } from "../../promiseWrapper";
import { newMarkParser } from "../markParser";
import { TNewMark } from "../../../types/mark";

const good_obj = {
  title: "test",
  url: "test",
  tag: "test",
};

const title_number_object = {
  title: 20,
  url: "test",
  tag: "test",
};

describe("newMarkParser", async () => {
  describe("Correct object format", async () => {
    const { data: _correct, error: correct_error } = await wrapInPromise(
      newMarkParser(good_obj),
    );

    test("success", () => {
      expect(correct_error).toBeNull();
    });
  });

  describe("Wrong object formats", async () => {
    const { data: title_number, error: title_number_error } =
      await wrapInPromise(newMarkParser(title_number_object));
    test("title is number", () => {
      expect(title_number).toBeNull;
      console.log(title_number_error);
      expect(title_number_error).toBeInstanceOf(Error);
    });
  });
});
