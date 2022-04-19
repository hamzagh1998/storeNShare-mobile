export function requestHandler(error, res) {
  if (error) {
    if (error.response) {
      // The client was given an error response (5xx, 4xx)
      return error.response.data;
    } else if (error.request) {
        // The client never received a response, and the request was never left
      return error.request;
    } else {
      // Anything else
      return "Error", error.message;
    };
  };return res.data;
};