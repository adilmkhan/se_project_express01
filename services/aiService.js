const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8001";

const summarizeArticleWithPython = ({ description }) => {
  return fetch(`${AI_SERVICE_URL}/summarize-article`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Python AI service failed: ${res.status}`);
  });
};

module.exports = {
  summarizeArticleWithPython,
};
