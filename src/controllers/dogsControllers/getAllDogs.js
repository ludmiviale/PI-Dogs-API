const axios = require("axios");
require("dotenv").config();
const { URL, API_KEY } = process.env;
const { Dog, Temperament } = require("../../db");
const { infoApiCleaner, infoDBCleaner } = require("../../utils/index");

const getAllDogs = async () => {
  const infoApi = (await axios(`${URL}?api_key=${API_KEY}`)).data;
  const dogApi = infoApiCleaner(infoApi);

  const infoDB = await Dog.findAll({
    include: [{ model: Temperament, attributes: ["name"] }],
  });
  const dogDB = infoDBCleaner(infoDB);

  return [...dogApi, ...dogDB];
};

module.exports = getAllDogs;
