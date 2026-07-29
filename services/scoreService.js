const SCORE_SERVICE_URL =
  process.env.SCORE_SERVICE_URL || "http://localhost:8002";

const articlesWithScores = (articles) =>
  fetch(`${SCORE_SERVICE_URL}/article-scores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articles),
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    }

    const body = await res.text();
    const error = new Error(
      `Java scoring service failed: ${res.status}${body ? ` ${body}` : ""}`,
    );
    error.statusCode = 502;
    throw error;
  });

module.exports = {
  articlesWithScores,
};
