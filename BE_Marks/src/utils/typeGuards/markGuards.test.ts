import { describe, expect, test } from "vitest";
import { isMarkFromFE } from "./markGuards";

const test_object = {
  tag: "tag",
  url: "url",
  title: "title",
};
const bad_tag_test_object = {
  tag: 10,
  url: "url",
  title: "title",
};

describe("isMarkFromFe", () => {
  test("Valid object", () => {
    expect(isMarkFromFE(test_object)).toBe(true);
  });

  test("number in tag field ", () => {
    expect(isMarkFromFE(bad_tag_test_object)).toThrowError();
  });
});
