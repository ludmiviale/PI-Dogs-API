const {
  getAllTemperaments,
} = require("../controllers/temperamentControllers/getAllTemperaments");

const getTemperamentsHandler = async (req, res) => {
  try {
    const allTemperaments = await getAllTemperaments();
    res.status(200).json(allTemperaments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTemperamentsHandler,
};
