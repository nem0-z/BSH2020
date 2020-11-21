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
        addResponse(
          response_body,
          "401",
          "User name or password is incorrect.",
          undefined
        );
      } else {
        addResponse(response_body, "200", "", results[0]);
      }
    }

    res.json(response_body);
  });
};

exports.mytasks = function (req, res) {
  const response_body = {};

  const iduser = req.body.iduser;

  const query =
    "SELECT goal.*, task.*, user.username as taskCreator FROM goal INNER JOIN task " +
    "ON goal.idgoal = task.idgoal LEFT JOIN user on goal.creator=user.iduser WHERE assignee=?;";

  db.query(query, [iduser], function (err, results) {
    if (err) {
      addResponse(response_body, "400", err.message, undefined);
    } else {
      if (results.length === 0) {
        addResponse(response_body, "401", "No tasks", undefined);
      } else {
        addResponse(response_body, "200", "", results);
      }
    }
    res.json(response_body);
  });
};

exports.teamtasks = function (req, res) {
  const response_body = {};
  const query1 =
    "SELECT * FROM task INNER JOIN goal ON task.idgoal = goal.idgoal LEFT JOIN user ON task.assignee = user.iduser;";
  const query2 =
    "SELECT username FROM user INNER JOIN goal ON goal.creator = user.iduser ORDER BY goal.idgoal;";

  db.query(query1, (err, results) => {
    if (err) {
      addResponse(response_body, "400", err.message, undefined);
    } else if (results.length === 0) {
      addResponse(response_body, "401", "No tasks", undefined);
    } else {
      addResponse(response_body, "200", "", results);
      db.query(query2, (err, results) => {
        if (err) {
          addResponse(response_body, "402", "No creator", undefined);
        } else {
          for (let i = 0; i < results.length; ++i) {
            response_body.data[i].creatorName = results[i].username;
          }
        }
        res.json(response_body);
      });
    }
  });
};

exports.appendmytask = function (req, res) {
  const response_body = {};
  const { taskID, iduser } = req.body;
  const query = "UPDATE task SET assignee=? WHERE idtask=?;";

  db.query(query, [iduser, taskID], (err, results) => {
    if (err) {
      addResponse(response_body, "400", err.message, undefined);
    } else {
      addResponse(response_body, "200", "", results);
    }
    res.json(response_body);
  });
};

exports.solution = function (req, res) {
  const { comment, idtask } = req.body;
  const response_body = {};

  const query1 = "INSERT INTO solution VALUES(null,CURRENT_DATE,?);";
  const query2 = "UPDATE task SET resolved=LAST_INSERT_ID() WHERE idtask=?;";
  db.query(query1, [comment], (err, results) => {
    if (err) {
      addResponse(response_body, "400", err.message, undefined);
    } else {
      addResponse(response_body, "200", "", results);
      db.query(query2, [idtask], (err, results) => {
        if (err) {
          addResponse(response_body, "401", err.message, undefined);
        }
      });
    }
    res.json(response_body);
  });
};

exports.showsolution = function (req, res) {
  const response_body = {};

  const idtask = req.body.idtask;

  const query =
    "SELECT * FROM solution INNER JOIN task ON solution.idsolution = task.resolved INNER JOIN user ON task.assignee= user.iduser WHERE idtask=?;";

  db.query(query, [idtask], function (err, results) {
    if (err) {
      addResponse(response_body, "400", err.message, undefined);
    } else {
      if (results.length === 0) {
        addResponse(response_body, "401", "No solution", undefined);
      } else {
        addResponse(response_body, "200", "", results);
      }
    }
    res.json(response_body);
  });
};

exports.calendar = function (req, res) {
  const response_body = {};
  console.log("test");
  const query = "SELECT date, DAYNAME(timeBegin) AS day, "+
  "LPAD(HOUR(timeBegin), 2, 0) AS satPocetak, LPAD(MINUTE(timeBegin), 2, 0) as minPocetak, "+
  "LPAD(HOUR(timeEnd), 2, 0) AS satKraj, LPAD(MINUTE(timeEnd), 2, 0) as minKraj, "+
  "name, description FROM TimeMaster.event "+
  "INNER JOIN goal ON goal.idgoal = event.idgoal "+
  "WHERE creator = ?;";
  
  //const idUser = localStorage.getItem("id");
  const {idUser}  = req.body;

  db.query(query, [idUser], (err, result) => {
    if (err) {
      addResponse(response_body, "401", err.message, null);
    }
    else {
      addResponse(response_body, "200", "DBM", result);
      console.log(response_body);
    }
    res.json(response_body);
  });


}
