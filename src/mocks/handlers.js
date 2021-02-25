import { rest } from "msw";

const delay = process.env.NODE_ENV === "test" ? 0 : 1500;

let guests = [
  { name: "Thommy" },
  { name: "Theresa" },
  { name: "John" },
  { name: "Maria" },
];

const handlers = [
  rest.post("/lookup-name", async (req, res, ctx) => {
    const { name } = req.body;

    if (!name) {
      return res(
        ctx.delay(delay),
        ctx.status(400),
        ctx.json({
          authorized: false,
          message: `No name, no entry!`,
        })
      );
    }

    const guestInList = guests.find(
      (g) => g.name.toLowerCase() === name.toLowerCase()
    );
    if (guestInList) {
      return res(ctx.delay(delay), ctx.json({ authorized: true }));
    }

    return res(
      ctx.delay(delay),
      ctx.status(401),
      ctx.json({
        authorized: false,
        message: `${name}, you are not on the list! 😩`,
      })
    );
  }),
];

export { handlers };
