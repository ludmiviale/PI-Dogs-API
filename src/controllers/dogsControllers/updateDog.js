const { Dog } = require("../../db");

const updateDog = async (id, newName) => {
  const dogFound = await Dog.findByPk(id);
  if (dogFound) {
    await Dog.update({ name: newName }, { where: { id: id } });
    return "Dog updated successfully";
  } else {
    return "Not found";
  }
};

module.exports = updateDog;
