import React from "react";

export function useGuest() {
  const [name, setName] = React.useState(null);
  const [status, setStatus] = React.useState("idle");
  const [data, setData] = React.useState([]);

  async function fetchData(name) {
    setStatus("loading");

    try {
      const response = await fetch("/lookup-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name }),
      });

      const json = await response.json();
      setData(json);
      setStatus(response.ok ? "fetched" : "error");

      return json;
    } catch (error) {
      setData(null);

      return error;
    }
  }

  async function checkGuestlist(name) {
    if (!name) return;
    const result = await fetchData(name);
    return result;
  }

  return {
    checkGuestlist,
    loading: status === "loading",
    error: status === "error",
    data,
  };
}
