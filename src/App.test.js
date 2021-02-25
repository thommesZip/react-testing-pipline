import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders learn react link", async () => {
  const { container } = render(<App />);
  const textInput = screen.getByRole("textbox");
  const submitBtn = screen.getByRole("button", { name: /Let me in/i });

  await act(async () => userEvent.click(submitBtn));

  const alerts = screen.getAllByRole("alert");
  expect(alerts[0]).toHaveTextContent(/name is a required field/i);

  userEvent.type(textInput, "T");
  await act(async () => userEvent.click(submitBtn));
  expect(alerts[0]).toHaveTextContent(/Your name is too short!/i);
  expect(textInput).toBeInTheDocument();

  userEvent.type(textInput, "Stefan");
  await act(async () => userEvent.click(submitBtn));
  const form = container.querySelector(".api-error");
  //expect(form.textContent).toContain("you are not on the list");
});
