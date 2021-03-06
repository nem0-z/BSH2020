const db = require("./db");
const addResponse = require("./addResponse");

exports.login = function (req, res) {
  const { name, password } = req.body;
  const response_body = {};
  const query = "SELECT * FROM user WHERE username=? AND password=SHA1(?);";
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
  const iduser = req.query.iduser;

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
          for (let i = 0; i < response_body.data.length; ++i) {
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
  const response_body = {};
  const { comment, idtask } = req.body;

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
  const idtask = req.query.idtask;

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

exports.makenewtask = function (req, res) {
  const response_body = {};
  const { title, urgent, assignee, description, iduser, type } = req.body;
  const assigneeName = assignee ? assignee : null;

  let assigneeID = null;
  const query1 = "SELECT iduser FROM user WHERE username=?;";
  //First fetch user ID
  db.query(query1, [assigneeName], (err, results) => {
    if (err) {
      addResponse(response_body, "400", err.message, undefined);
    } else {
      const noResults = results.length === 0;
      const noUser = noResults && assignee != "";
      const noAssignee = noResults && assignee == "";
      if (noUser) {
        addResponse(
          response_body,
          "401",
          "User with that name does not exist.",
          undefined
        );
        res.json(response_body);
      } else if (noAssignee || !noResults) {
        if (!noAssignee) {
          assigneeID = results[0].iduser;
        }
        //Insert goal and task
        const query2 = "INSERT INTO goal VALUES(null,?,?,?);";
        db.query(
          query2,
          [title, description, parseInt(iduser)],
          (err, results) => {
            if (err) {
              addResponse(response_body, "402", err.message, undefined);
            } else {
              const query3 =
                "INSERT INTO task VALUES(null,?,null,CURRENT_DATE,LAST_INSERT_ID(),?,?);";
              db.query(query3, [type, assigneeID, urgent], (err, results) => {
                if (err) {
                  addResponse(response_body, "403", err.message, undefined);
                } else {
                  addResponse(response_body, "200", "", results);
                }
                res.json(response_body);
              });
            }
          }
        );
      } else {
        addResponse(response_body, "405", "End of the world.", undefined);
      }
    }
  });
};

exports.getOnetimeReminders = function (req, res) {
  const response_body = {};
  const creator = req.query.creator;

  const query =
    "SELECT reminder.*, onetime.idonetime FROM reminder INNER JOIN onetime ON reminder.idreminder = onetime.idreminder WHERE reminder.creator=?;";
  db.query(query, [creator], function (err, results) {
    if (err) {
      addResponse(response_body, "400", err.message, undefined);
    } else {
      addResponse(response_body, "200", "success", results);
    }
    res.json(response_body);
  });
};

exports.getRepeatingReminders = function (req, res) {
  const response_body = {};
  const creator = req.query.creator;

  const query =
    "SELECT reminder.*, repeating.idrepeating, repeating.time, repeating.active FROM reminder INNER JOIN repeating ON repeating.idreminder = reminder.idreminder WHERE reminder.creator=?;";
  db.query(query, [creator], function (err, results) {
    if (err) {
      addResponse(response_body, "400", err.message, undefined);
    } else {
      addResponse(response_body, "200", "success", results);
    }
    res.json(response_body);
  });
};

exports.addReminder = function (req, res) {
  const response_body = {};
  const { type, creator, name, description, dateBegin, time } = req.body;

  let query =
    "INSERT INTO reminder (idreminder, dateCreated, creator, name, description, dateBegin) VALUES(null, NOW(), ?, ?, ?, ?);";

  db.query(
    query,
    [creator, name, description, dateBegin],
    function (err, results) {
      if (err) {
        addResponse(response_body, "400", err.message, undefined);
        res.json(response_body);
      } else {
        if (type) {
          //onetime
          query =
            "INSERT INTO onetime (idonetime, idreminder) VALUES (null, LAST_INSERT_ID());";
          db.query(query, function (err1, results1) {
            if (err1) {
              addResponse(response_body, "401", err.message, undefined);
            } else {
              addResponse(response_body, "200", "successful", undefined);
            }
            res.json(response_body);
          });
        } else {
          //repeating
          query =
            "INSERT INTO repeating (idrepeating, time, idreminder, active) VALUES (null, ?, LAST_INSERT_ID(), 1);";
          db.query(query, [time], function (err1, results1) {
            if (err1) {
              addResponse(response_body, "401", err1.message, undefined);
            } else {
              addResponse(response_body, "200", "successful", undefined);
            }
            res.json(response_body);
          });
        }
      }
    }
  );
};
exports.calendar = function (req, res) {
  const response_body = {};

  const query =
    "SELECT date, DAYNAME(timeBegin) AS day, " +
    "LPAD(HOUR(timeBegin), 2, 0) AS satPocetak, LPAD(MINUTE(timeBegin), 2, 0) as minPocetak, " +
    "LPAD(HOUR(timeEnd), 2, 0) AS satKraj, LPAD(MINUTE(timeEnd), 2, 0) as minKraj, " +
    "name, description, urgency FROM TimeMaster.event " +
    "INNER JOIN goal ON goal.idgoal = event.idgoal " +
    "INNER JOIN task ON task.idgoal = goal.idgoal " +
    "WHERE assignee = ? AND " +
    "YEARWEEK(timeBegin)=YEARWEEK(NOW()) " +
    "AND WEEKDAY(timeBegin) IN (0,1,2,3,4);";

  const { idUser } = req.query;

  db.query(query, [idUser], (err, result) => {
    if (err) {
      addResponse(response_body, "401", err.message, null);
    } else {
      addResponse(response_body, "200", "DBM", result);
    }
    res.json(response_body);
  });
};

exports.changeReminderActivity = function (req, res) {
  const response_body = {};
  const { idrepeating, active } = req.body;

  let query = "UPDATE repeating SET active = ? WHERE idrepeating = ?;";

  db.query(query, [active, idrepeating], function (err, result) {
    if (err) {
      addResponse(response_body, "400", err.message, undefined);
    } else {
      addResponse(response_body, "200", "successful", undefined);
    }
    res.json(response_body);
  });
};

exports.addtasktocalendar = function (req, res) {
  const response_body = {};
  const { eventdate, eventbegin, eventend, idtask } = req.body;

  // converting to datetimes for mysql
  const eventbegin_ = eventdate + " " + eventbegin;
  const eventend_ = eventdate + " " + eventend;

  const query1 = "SELECT idgoal FROM task WHERE idtask=?;";
  const query2 = "INSERT INTO event VALUES(null,?,?,?,?);";

  db.query(query1, [idtask], (err, result) => {
    if (err) {
      addResponse(response_body, "400", err.message, undefined);
    } else {
      const idgoal = result[0].idgoal;
      db.query(
        query2,
        [eventdate, eventbegin_, eventend_, idgoal],
        (err, results) => {
          if (err) {
            addResponse(response_body, "401", err.message, undefined);
          } else {
            addResponse(response_body, "200", "successful", undefined);
          }
          res.json(response_body);
        }
      );
    }
  });
};

exports.editReminder = function (req, res) {
  const response_body = {};
  const { idreminder, name, description } = req.body;

  const query =
    "UPDATE reminder SET name = ?, description = ? WHERE idreminder = ?;";

  db.query(query, [name, description, idreminder], function (err, result) {
    if (err) {
      addResponse(response_body, "400", err.message, undefined);
    } else {
      addResponse(response_body, "200", "successful", undefined);
    }
    res.json(response_body);
  });
};

exports.calendarReminder = function (req, res) {
  const response_body = {};

  const query =
    "SELECT DAYNAME(dateBegin) AS day, LPAD(HOUR(dateBegin),2,0) as satPocetak, " +
    "LPAD(MINUTE(dateBegin),2,0) as minPocetak, " +
    "LPAD(HOUR(DATE_ADD(dateBegin, INTERVAL 5 MINUTE)),2,0) as satKraj, " +
    "LPAD(MINUTE(DATE_ADD(dateBegin, INTERVAL 5 MINUTE)),2,0) as minKraj, " +
    "name, description, 3 as urgency FROM onetime INNER JOIN reminder ON reminder.idreminder = onetime.idreminder " +
    "WHERE creator = ? AND " +
    "YEARWEEK(dateBegin)=YEARWEEK(NOW()) " +
    "AND WEEKDAY(dateBegin) IN (0,1,2,3,4);";

  const idUser = req.query.idUser;

  db.query(query, [idUser], (err, result) => {
    if (err) {
      addResponse(response_body, "401", err.message, null);
    } else {
      addResponse(response_body, "200", "DBM", result);
    }
    res.json(response_body);
  });
};

exports.checktaskincalendar = function (req, res) {
  const response_body = {};
  const { idtask } = req.body;

  const query1 = "SELECT idgoal FROM task WHERE idtask=?;";
  const query2 = "SELECT idgoal FROM event WHERE idgoal=?;";

  db.query(query1, [idtask], (err, result) => {
    if (err) {
      addResponse(response_body, "401", err.message, null);
    } else {
      const idgoal = result[0].idgoal;
      db.query(query2, [idgoal], (err, result) => {
        if (err) {
          addResponse(response_body, "401", err.message, null);
        }
        if (result.length === 0) {
          addResponse(response_body, "200", "No tasks", undefined);
        } else {
          addResponse(response_body, "200", "", result);
        }
        res.json(response_body);
      });
    }
  });
};
