const NewsItem = require("../models/newsItem");

const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

module.exports.getnewsItems = (req, res, next) => {
  NewsItem.find({})
    .then((items) => res.send({ data: items }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

module.exports.createnewsItem = (req, res, next) => {
  const { title, description, urlToImage, publishedAt, source, keyword } =
    req.body;
  const owner = req.user._id;
  NewsItem.create({
    title,
    description,
    urlToImage,
    publishedAt,
    source,
    keyword,
    owner,
  })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

module.exports.deletenewsItem = (req, res, next) => {
  NewsItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError("Operation not allowed");
      }
      return NewsItem.findByIdAndDelete(req.params.itemId);
    })
    .then((deletedItem) => {
      res.send({ data: deletedItem });
    })
    .catch((err) => {
      if (err.message === "Operation not Allowed") {
        next(new ForbiddenError("Operation not allowed"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(err);
      }
    });
};
