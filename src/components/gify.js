import React from "react";

export default function Gify({ embedUrl }) {
  // <div style="width:100%;height:0;padding-bottom:100%;position:relative;">

  return (
    <div className="mb-5">
      <div
        className="has-shadow"
        style={{
          border: "5px solid white",
          boxSizing: "border-box",
          overflow: "hidden",
          borderRadius: "50%",
          maxWidth: "310px",
          margin: "0 auto",
        }}
      >
        <div
          className="has-background-white"
          style={{
            width: "100%",
            height: 0,
            paddingBottom: "100%",
            position: "relative",
          }}
        >
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ position: "absolute" }}
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="is-flex is-justify-content-center is-full m-2">
        <p className="py-1 px-3 has-background-white is-inline-block is-roundish has-shadow">
          <a href="https://giphy.com/gifs/BVG-berlin-latex-bvg-l4dLyz1rYq1eK2AIsD">
            via GIPHY
          </a>
        </p>
      </div>
    </div>
  );
}
