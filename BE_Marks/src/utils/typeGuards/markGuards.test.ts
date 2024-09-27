import { describe, expect, test } from "vitest";
import { isMarkFromFE } from "./markGuards";
import { wrapInPromise } from "../promiseWrapper";

const test_object = {
  tag: "tag",
  url: "url",
  title: "title",
};
const bad_tag_test_object = {
  url: "url",
  title: "title",
};

describe("isMarkFromFe", () => {
  test("Valid object", () => {
    expect(isMarkFromFE(test_object)).toBe(true);
  });
});
