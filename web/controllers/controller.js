const db = require("./db");
const addResponse = require("./addResponse");

exports.login = function (req, res) {
  const { name, password } = req.body;
  const response_body = {};
  const query = "select * from user where username=? and password=sha1(?);";
  db.query(query, [name, password], function (err, results) {
    if (err) {
      addResponse(response_body, "400", err.message, undefined);
    } else {
      if (results.length == 0) {
        addResponse(response_body, "401", "User does not exist!", undefined);
      } else {
        addResponse(response_body, "200", "", results[0]);
      }
    }

    res.json(response_body);
  });
};
