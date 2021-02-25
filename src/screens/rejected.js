import React from "react";
import { Link } from "react-router-dom";
import Gify from "../components/gify";

export default function Rejected() {
  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-3" style={{ maxWidth: "400px" }}>
            <Gify embedUrl="https://giphy.com/embed/QsVg6pTcqBPwhd0dvE" />
          </div>
        </div>
        <div className="container">
          <div className="has-text-centered has-text-white">
            <h1 className="title has-text-white mb-0">No!</h1>
            <p className="mb-5">You can´t come in!</p>
            <Link to="/" className="button is-rounded">
              Try again
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
