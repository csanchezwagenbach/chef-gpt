const router = require("express").Router();
const userRoutes = require("./userRoutes");
const suggestionRoutes = require("./suggestionRoutes");
// fill in restrictions ect when files are created

router.use("/users", userRoutes);
router.use("/suggestions", suggestionRoutes);

module.exports = router;
