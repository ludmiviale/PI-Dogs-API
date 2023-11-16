const { Router } = require("express");
const temperamentRouter = Router();
const { getTemperamentsHandler } = require("../handlers/temperamentsHandler");

temperamentRouter.get("/", getTemperamentsHandler);

module.exports = temperamentRouter;
