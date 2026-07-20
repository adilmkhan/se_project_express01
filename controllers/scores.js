const { articlesWithScores } = require("../services/scoreService");

module.exports.getScore = (req, res, next) => {
  return articlesWithScores(req.body)
    .then((result) => {
      res.send({
        result,
      });
    })
    .catch(next);
};
