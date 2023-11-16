const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "Pug",
  height: "6 - 8",
  weight: "25 - 30",
  life_span: "12 - 14 years",
  reference_image_id:
    "https://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg",
  temperaments: ["Sociable", "Playful", "Quiet"],
};

describe("Dogs routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));

  describe("GET /dogs", () => {
    it("should get 200", () => agent.get("/dogs").expect(200));
  });

  describe("GET /dogs/:id", () => {
    it("Respond with status: 200", async () => {
      await agent.get("/dogs/135").expect(200);
    });
    it("Respond with an object with the properties: 'key', 'id', 'name', 'height', 'weight', 'life_span', 'temperament' and 'reference_image_id'", async () => {
      const response = await agent.get("/dogs/135");
      const props = [
        "key",
        "id",
        "name",
        "height",
        "weight",
        "life_span",
        "temperament",
        "reference_image_id",
      ];
      props.forEach((prop) => {
        expect(response.body).to.have.property(prop);
      });
    });
    it("If there is an error respond with status: 500", async () => {
      await agent.get("/dogs/999").expect(500);
    });
  });
});
