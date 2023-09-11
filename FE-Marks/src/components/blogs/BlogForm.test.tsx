import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import BlogsForm from "./BlogsForm";

describe("Blog form tests", () => {
  test("update blog state and clicks onSubmit", async () => {
    const createBlog = jest.fn().mockImplementation((e) => e.preventDefault());
    render(<BlogsForm handleNewBlog={createBlog} />);

    const inputAuthor = screen.getByPlaceholderText("Author");
    const inputTitle = screen.getByPlaceholderText("Title");
    const inputUrl = screen.getByPlaceholderText("Url");
    const sendButton = screen.getByText("Add blog");

    await userEvent.type(inputAuthor, "testing Author");
    await userEvent.type(inputTitle, "testing Title");
    await userEvent.type(inputUrl, "testing Url");
    await userEvent.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][1].author).toBe("testing Author");
    expect(createBlog.mock.calls[0][1].title).toBe("testing Title");
    expect(createBlog.mock.calls[0][1].url).toBe("testing Url");
  });
});
