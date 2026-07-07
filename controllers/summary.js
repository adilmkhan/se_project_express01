const { summarizeArticleWithPython } = require("../services/aiService");

module.exports.getSummary = (req, res, next) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).send({
      message: "Description is required",
    });
  }

  return summarizeArticleWithPython({ description })
    .then((result) => {
      res.send({
        summary: result.summary,
      });
    })
    .catch(next);
};
