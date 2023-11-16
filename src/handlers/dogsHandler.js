const getAllDogs = require("../controllers/dogsControllers/getAllDogs");
const getDogByName = require("../controllers/dogsControllers/getDogByName");
const getBreedById = require("../controllers/dogsControllers/getBreedById");
const createDog = require("../controllers/dogsControllers/createDog");
const updateDog = require("../controllers/dogsControllers/updateDog");
const deleteDog = require("../controllers/dogsControllers/deleteDog");

const getDogsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const dogByName = await getDogByName(name);
      res.status(200).json(dogByName);
    } else {
      const allDogs = await getAllDogs();
      if (allDogs.length > 0) {
        res.status(200).json(allDogs);
      } else {
        res.status(404).json({ message: "Dogs not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBreedByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const source = isNaN(id) ? "db" : "api";
    const dogByBreed = await getBreedById(id, source);
    if (dogByBreed) {
      res.status(200).json(dogByBreed);
    } else {
      res.status(404).json({ message: "Breed not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDogHandler = async (req, res) => {
  const { name, height, weight, life_span, reference_image_id, temperament } =
    req.body;
  try {
    const newDog = await createDog(
      name,
      height,
      weight,
      life_span,
      reference_image_id,
      temperament
    );
    res.status(201).json(newDog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDogHandler = async (req, res) => {
  const { id } = req.params;
  const { name, newName } = req.body;
  try {
    const updatedDog = await updateDog(id, name, newName);
    res.status(200).json(updatedDog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDogHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteDog(id);
    res.status(200).json({ message: "Dog deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDogsHandler,
  getBreedByIdHandler,
  createDogHandler,
  updateDogHandler,
  deleteDogHandler,
};
