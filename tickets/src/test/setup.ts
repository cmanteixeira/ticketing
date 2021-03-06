import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "proj2021";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const colections = await mongoose.connection.db.collections();
  for (const colection of colections) {
    await colection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  // BUild a JWT payload { id, email }
  const id = new mongoose.Types.ObjectId().toHexString();
  const payload = {
    id,
    email: "teste@teste.com",
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build the session object { jwt:MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const sessionBase64 = Buffer.from(sessionJSON).toString("base64");
  // Return a string thats the cookie with encoded data

  return [`express:sess=${sessionBase64}`];
};
