const router = require("express").Router();
const userRoutes = require("./userRoutes");
// fill in restrictions ect when files are created

router.use("/users", userRoutes);

module.exports = router;
