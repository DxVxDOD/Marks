import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Blog from "./Blogs.tsx";

describe("Blog tests", () => {
  const blog = {
    title: "MIDDELWARE USER EXTRACTION 1001",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 17,
    user: {
      username: "David",
      name: "David Orban Jozsef",
    },
    id: "64b5a7eea29f66d8f8d5f3ca",
  };

  let container: HTMLElement;
  const mockHandler: jest.Mock = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog blog={blog} updateLikes={mockHandler} />,
    ).container;
  });

  test("renders content", async () => {
    const div = container.querySelector(".blog");

    expect(div).toHaveTextContent("MIDDELWARE USER EXTRACTION 1001");
    expect(div).toHaveTextContent("Michael Chan");
  });

  test("url and likes shown after button click", async () => {
    const div = container.querySelector(".blog");
    const user = userEvent.setup();

    let buttonText: string;
    if (screen.getByText("view")) {
      buttonText = "view";
    } else buttonText = "hide";

    const button = screen.getByText(`${buttonText}`);
    await user.click(button);

    expect(div).toHaveTextContent("17");
    expect(div).toHaveTextContent("https://reactpatterns.com/");
  });

  test("event handler respondes to button click", async () => {
    const user = userEvent.setup();

    let buttonText: string;
    if (screen.getByText("view")) {
      buttonText = "view";
    } else buttonText = "hide";

    const buttonView = screen.getByText(`${buttonText}`);
    await user.click(buttonView);

    const buttonLike = screen.getByText("like");
    await user.click(buttonLike);
    await user.click(buttonLike);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
