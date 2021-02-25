import React from "react";

export function useGuest() {
  const [name, setName] = React.useState(null);
  const [status, setStatus] = React.useState("idle");
  const [data, setData] = React.useState([]);

  async function fetchData(name) {
    setStatus("loading");
    console.log("🥶 fetchData");

    try {
      const response = await fetch("/lookup-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name }),
      });

      const json = await response.json();
      setData(json);
      setStatus(response.ok ? "fetched" : "error");
      console.log("🥶 json", json);
      return json;
    } catch (error) {
      console.log("🥶 fetchData", error);
      setData(null);
      setStatus("error");
      return error;
    }

    console.log("🥶 fetchData ????");
  }

  async function checkGuestlist(name) {
    console.log("🥶 checkGuestlist name", name);
    if (!name) return;
    console.log("🥶 checkGuestlis try fetsching");
    const result = await fetchData(name);
    console.log("🥶 checkGuestlis result", result);
    return result;
  }

  console.log("😃", status, data);

  return {
    checkGuestlist,
    loading: status === "loading",
    error: status === "error",
    data,
  };
}
