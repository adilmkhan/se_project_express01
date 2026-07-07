const router = require("express").Router();

const { login, createUser } = require("../controllers/users");

const auth = require("../middlewares/auth");

const {
  validateUserRegistration,
  validateUserLogin,
} = require("../middlewares/validation");

const { getSummary } = require("../controllers/summary");

const NotFoundError = require("../errors/NotFoundError");

router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserRegistration, createUser);

router.use("/items", require("./newsItems"));
router.use("/users", auth, require("./users"));
//TODO: create summary route
router.post("/summary", auth, getSummary);

router.use((req, res, next) =>
  next(new NotFoundError("Requested resource not found")),
);

module.exports = router;
