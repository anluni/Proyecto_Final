
const request = require("supertest");
const app = require("../index");

describe("GET /items", () => {
  it("debería retornar 200", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
  });
});
