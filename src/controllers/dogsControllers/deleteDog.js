const { Dog } = require("../../db");

const deleteDog = async (id) => {
  await Dog.destroy({ where: { id: id } });
};

module.exports = deleteDog;
