const axios = require("axios");
require("dotenv").config();
const { URL, API_KEY } = process.env;
const { Temperament } = require("../../db");

const getAllTemperaments = async () => {
  const { data } = await axios(`${URL}?api_key=${API_KEY}`);

  const temperamentsDB = await Temperament.findAll();

  if (!temperamentsDB.length) {
    const temperaments = data
      .filter((dog) => dog.temperament)
      .map((dog) => {
        return {
          name: dog.temperament,
        };
      });
    const allTemperaments = [
      ...new Set(
        temperaments
          .map((dog) => dog.name)
          .join(", ")
          .split(", ")
          .sort()
          .filter(Boolean)
      ),
    ];

    for (const temperament of allTemperaments) {
      await Temperament.create({ name: temperament });
    }
    return allTemperaments;
  }
  return temperamentsDB;
};

module.exports = {
  getAllTemperaments,
};
