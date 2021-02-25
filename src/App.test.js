import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Validation & wrong Name", async () => {
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

  const wrongName = "Stefan";
  userEvent.type(textInput, `{backspace}${wrongName}`);
  await act(async () => userEvent.click(submitBtn));
  // await waitFor(() =>
  //   expect(screen.queryByTestId(container, "api-error")).toBeInTheDocument()
  // );
  await waitFor(() => {
    expect(screen.getByTestId("api-error")).toBeInTheDocument();
  });

  expect(screen.getByTestId("api-error").textContent).toContain(
    `${wrongName}, you are not on the list`
  );
});
