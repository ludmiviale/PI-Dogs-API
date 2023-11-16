const axios = require("axios");
require("dotenv").config();
const { URL, API_KEY, IMAGE_URL } = process.env;
const { Dog, Temperament } = require("../../db");

const getBreedById = async (id, source) => {
  if (source === "api") {
    const { data } = await axios(`${URL}/${id}/?api_key=${API_KEY}`);
    const imageId = data.reference_image_id;
    const imageURL = `${IMAGE_URL}/${imageId}.jpg`;
    return {
      key: data.id,
      id: data.id,
      name: data.name,
      height: data.height.metric,
      weight: data.weight.metric,
      life_span: data.life_span,
      temperament: data.temperament,
      reference_image_id: imageURL,
    };
  } else {
    const dog = await Dog.findByPk(id, {
      include: [{ model: Temperament, attributes: ["name"] }],
    });
    return {
      key: dog.id,
      id: dog.id,
      name: dog.name,
      height: dog.height,
      weight: dog.weight,
      life_span: dog.life_span,
      temperament: dog.temperaments
        .map((temperament) => temperament.name)
        .join(", "),
      reference_image_id: dog.reference_image_id,
    };
  }
};

module.exports = getBreedById;
