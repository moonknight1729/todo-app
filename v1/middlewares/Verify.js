const mysqlConnection = require("../utils/db");
const jwt = require("jsonwebtoken");
const { SECRET_ACCESS_TOKEN } = require("../config/index");

const Verify = (req, res, next) => {
  const authHeader = req.headers["cookie"];
  if (!authHeader) return res.sendStatus(401);
  const cookie = authHeader.split("=")[1];

  jwt.verify(cookie, SECRET_ACCESS_TOKEN, async (err, decoded) => {
    if (err)
      // if token has been altered or has expired, return an unauthorized error
      return res
        .status(401)
        .json({ message: "This session has expired. Please login" });

    const { id } = decoded;
    const read_query = "select * from users where user_id=?";
    mysqlConnection.query(read_query, [id], (error, results, fields) => {
      const { password, ...data } = results[0];
      req.user = data;
     
    });
    next();
  });
};

module.exports = Verify;
