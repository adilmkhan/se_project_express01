const SCORE_SERVICE_URL =
  process.env.SCORE_SERVICE_URL || "http://localhost:8002";

const articlesWithScores = (articles) => {
  return fetch(`${SCORE_SERVICE_URL}/article-scores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articles),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Python AI service failed: ${res.status}`);
  });
};

module.exports = {
  articlesWithScores,
};
