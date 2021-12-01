import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

it("Returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "asdasd",
      price: 40,
    })
    .expect(404);
});

it("Returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "asdasd",
      price: 40,
    })
    .expect(401);
});

it("Returns a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "asdffwe",
      price: 10,
    })
    .expect(201);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "asdasd",
      price: 40,
    })
    .expect(401);
});

it("Returns a 400 if the user provided an invalid title or price", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "asdffwe",
      price: 10,
    })
    .expect(201);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 40,
    })
    .expect(400);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "123123",
      price: -40,
    })
    .expect(400);
});

it("Updates the tickt provided valid inputs", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "asdffwe",
      price: 10,
    })
    .expect(201);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "new title",
      price: 40,
    })
    .expect(200);
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(201);
  expect(ticketResponse.body.title).toEqual("new title");
  expect(ticketResponse.body.price).toEqual(40);
});
