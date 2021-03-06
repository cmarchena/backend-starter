import supertest from "supertest";
import http, { Server } from "http";
import expressApp from "@/app";

let server: Server;
describe("Creates Swagger UI", () => {
  it("should create swagger UI", async () => {
    const request = supertest(expressApp.app);
    const swaggerUIroute = await request.get("/api-docs");
    expect(swaggerUIroute.status).toBe(301);
  });
});
describe("Server Status", () => {
  beforeAll(() => {
    server = http.createServer(expressApp.app);
  });
  afterEach(() => {
    server.close();
  });
  describe("Primary Course", () => {
    it("should return true if server is active", async () => {
      server.listen(3002);
      expect(server.listening).toBeTruthy();
    });
  });
  describe("Exception Course", () => {
    it("should return false if server is not active", async () => {
      expect(server.listening).toBeFalsy();
    });
  });
});
