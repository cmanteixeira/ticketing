import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

it("Returns a status 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404);
});

it("Returns the ticket if the ticket is found", async () => {
  // Add in a check to make sure a ticket was saved
  const title = "concert";
  const price = 20;
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    })
    .expect(201);
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(201);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
