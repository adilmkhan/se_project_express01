const router = require("express").Router();
const {
  getnewsItems,
  createnewsItem,
  deletenewsItem,
} = require("../controllers/newsItems");

const { validateNewsItem, validateId } = require("../middlewares/validation");

const auth = require("../middlewares/auth");

router.get("/", getnewsItems);
router.post("/", validateNewsItem, auth, createnewsItem);
router.delete("/:itemId", validateId, auth, deletenewsItem);

module.exports = router;
