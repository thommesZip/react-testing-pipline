import React from "react";
import { Link } from "react-router-dom";
import Gify from "../components/gify";

export default function Authorized() {
  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-3" style={{ maxWidth: "400px" }}>
            <Gify embedUrl="https://giphy.com/embed/s2qXK8wAvkHTO" />
          </div>
        </div>
        <div className="container">
          <div className="has-text-centered has-text-white">
            <h1 className="title has-text-white mb-0">🎉 Yay!</h1>
            <p className="mb-5">Come in!</p>
            <Link to="/" className="button is-rounded">
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
