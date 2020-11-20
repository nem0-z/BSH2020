module.exports = (response_body, status, message, data) => {
  response_body.status = status;
  response_body.message = message;
  response_body.data = data;
};
