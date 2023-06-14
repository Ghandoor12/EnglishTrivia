import http from "./httpService";

const apiEndpoint = "http://127.0.0.1:5000";

// get random question function is used to call the words endpoint from the backend and returns the questions to the game file.

export async function getRandomQuestions() {
  return await http.get(apiEndpoint + "/quiz", {});
}

// get rank is used to call the rank endpoint from the bankend it sends the user correct answers in the body and wait for the response with the rank calculated and then it returns it
export async function getRank(summary) {
  let answers = { answers: summary };
  let res = await http.post(apiEndpoint + "/rank", {
    answers,
  });
  return res;
}
