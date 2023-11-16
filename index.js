const server = require("./src/app.js");
const {
  getAllTemperaments,
} = require("./src/controllers/temperamentControllers/getAllTemperaments.js");
const { conn } = require("./src/db.js");

conn.sync({ force: false }).then(() => {
  getAllTemperaments();
  server.listen(3001, () => {
    console.log("listening at 3001");
  });
});
