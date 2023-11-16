const { Router } = require("express");
const dogsRouter = Router();
const {
  getDogsHandler,
  getBreedByIdHandler,
  createDogHandler,
  updateDogHandler,
  deleteDogHandler,
} = require("../handlers/dogsHandler");

dogsRouter.get("/", getDogsHandler);
dogsRouter.get("/:id", getBreedByIdHandler);
dogsRouter.post("/", createDogHandler);
dogsRouter.put("/:id", updateDogHandler);
dogsRouter.delete("/:id", deleteDogHandler);

module.exports = dogsRouter;
