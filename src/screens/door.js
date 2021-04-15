import React from "react";
import Gify from "../components/gify";
import { Form, TextField, SubmitButton } from "../components/form";
import { useGuest } from "../hooks/use-guest";
import { useHistory } from "react-router-dom";

const fieldSettings = {
  name: {
    initialValue: "",
    required: true,
    validations: [
      {
        type: "min",
        args: [2, "Your name is too short!"],
      },
      {
        type: "max",
        args: [40, "Your name is too long!"],
      },
    ],
  },
};

const gifyUrl = {
  door: "https://giphy.com/embed/l4dLyz1rYq1eK2AIsD",
  rejected: "https://giphy.com/embed/QsVg6pTcqBPwhd0dvE",
};

function setTemporaryValue(
  orgValue = null,
  tempValue = null,
  setterFn = () => {},
  time = 1000
) {
  setterFn(tempValue);
  setTimeout(() => {
    setterFn(orgValue);
  }, time);
}

export default function Door() {
  const { checkGuestlist, loading } = useGuest();
  const [gify, setGify] = React.useState(gifyUrl.door);
  const [errorMessage, setErrorMessage] = React.useState(null);
  let history = useHistory();

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-3">
            <Gify embedUrl={gify} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-6 box p-5 os-rounded">
            <Form
              fields={fieldSettings}
              disabled={loading}
              onSubmit={async ({ name }, { resetForm }) => {
                const result = await checkGuestlist(name);
                if (result.authorized) {
                  history.push("/come-in");
                } else {
                  setTemporaryValue(
                    null,
                    result.message,
                    setErrorMessage,
                    7000
                  );
                  setTemporaryValue(
                    gifyUrl.door,
                    gifyUrl.rejected,
                    setGify,
                    7000
                  );
                  resetForm();
                }
              }}
            >
              <div className="columns is-centered">
                <div className="column">
                  <TextField name="name" placeholder="Name please..." />
                </div>
                <div className="column is-3 is-flex is-justify-content-center">
                  <SubmitButton>Let me in</SubmitButton>
                </div>
              </div>
            </Form>

            {errorMessage ? (
              <div className="columns is-centered">
                <div className="column">
                  <div
                    className="has-text-danger"
                    role="alert"
                    data-testid="api-error"
                  >
                    {errorMessage}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
