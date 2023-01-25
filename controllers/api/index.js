const router = require("express").Router();
const userRoutes = require("./userRoutes");
const suggestionRoutes = require("./suggestionRoutes");

// Back end API routes directing to userRoutes or suggestionRoutes, respectively

router.use("/users", userRoutes);
router.use("/suggestions", suggestionRoutes);

module.exports = router;
