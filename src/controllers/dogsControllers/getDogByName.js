const axios = require("axios");
require("dotenv").config();
const { URL, API_KEY } = process.env;
const { Dog } = require("../../db");
const { Op } = require("sequelize");
const { infoApiCleaner } = require("../../utils/index");

const getDogByName = async (name) => {
  const lowercaseName = name.toLowerCase();

  const infoApi = (await axios(`${URL}?api_key=${API_KEY}`)).data;
  const dogsApi = infoApiCleaner(infoApi);

  const dogFiltered = dogsApi.filter((dog) =>
    dog.name.toLowerCase().includes(lowercaseName)
  );

  const dogDB = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]: `%${lowercaseName}%`,
      },
    },
  });

  return [...dogFiltered, ...dogDB];
};

module.exports = getDogByName;
