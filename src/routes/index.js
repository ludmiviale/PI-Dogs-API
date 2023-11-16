const { Router } = require("express");
const router = Router();

const dogsRouter = require("./dogsRouter");
const temperamentRouter = require("./temperamentsRouter");

router.use("/dogs", dogsRouter);
router.use("/temperaments", temperamentRouter);

module.exports = router;
