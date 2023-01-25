const router = require("express").Router();

// This page serves to direct route traffic. Users are either directed to homeroutes, holding all front-end routes, or apiRoutes, where the user is directed to the index folder within the api folder. 

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
