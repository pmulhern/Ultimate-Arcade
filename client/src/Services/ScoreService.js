export default {
  // By default this is a GET request
  getScores: () => {
    return fetch("/user/scores").then((response) => {
      // Passport automatically sends a 401 if the user is not Authorized
      if (response.status !== 401) {
        // If Authorized, will return the data
        return response.json().then((data) => data);
      }
      // Otherwise a message of "Unauthorized" will display
      else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },
  // Since POST request, method, body and header must be used
  postScore: (score) => {
    return fetch("/user/score", {
      method: "post",
      body: JSON.stringify(score),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      // Passport automatically sends a 401 if the user is not Authorized
      if (response.status !== 401) {
        // If Authorized, will return the data
        return response.json().then((data) => data);
      }
      // Otherwise a message of "Unauthorized" will display
      else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
};
