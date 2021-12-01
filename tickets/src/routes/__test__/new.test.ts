import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("Has a route handler listening to api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("Can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("Returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it("Returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});
it("Returns an error if an invalid price is provides", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "123123sdasd",
      price: -10,
    })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "aasdad231afg",
    })
    .expect(400);
});
it("creates a ticket with valid inputs ", async () => {
  // Add in a check to make sure a ticket was saved
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "asdffwe",
      price: 10,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});
