const mysqlConnection = require("../utils/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const{ SECRET_ACCESS_TOKEN}=require('../config/index')
const jwt = require("jsonwebtoken");

const generateAccessJWT = (user) => {
  let payload = {
    id: user.user_id,
  };
  return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
    expiresIn: "20m",
  });
};

const Register = async (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  try {
    const read_query = "SELECT * FROM USERS WHERE USERNAME=?";
    const insert_query = "INSERT INTO USERS VALUES (UUID(),?,?,?,?)";

    mysqlConnection.query(
      read_query,
      [username],
      async (error, results, fields) => {
        if (results[0]) {
          res.status(400).json({
            status: "failed",
            message:
              "It seems you already have an account, please log in instead.",
            data: results[0],
          });
        } else {
          const encryptedPassword = await bcrypt.hash(password, saltRounds);
          mysqlConnection.query(
            insert_query,
            [first_name, last_name, username, encryptedPassword],
            (error, results, fields) => {
              res.json({
                status: "success",
                data: results,
                message:
                  "Thank you for registering with us. Your account has been successfully created.",
              });
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const Login = (req, res) => {
  try {
    const { username } = req.body;
    const read_query = "SELECT * FROM USERS WHERE USERNAME=?";
    mysqlConnection.query(
      read_query,
      [username],
      async (error, results, fields) => {
        if (!results[0])
          return res.status(401).json({
            status: "failed",
            data: [],
            message:
              "Invalid email or password. Please try again with the correct credentials.",
          });
        else {
          const isPasswordValid = await bcrypt.compare(
            `${req.body.password}`,
            results[0].password
          );
          // if not valid, return unathorized response
          if (!isPasswordValid)
            return res.status(401).json({
              status: "failed",
              data: [],
              message:
                "Invalid email or password. Please try again with the correct credentials.",
            });

          let options = {
            maxAge: 20 * 60 * 1000, // would expire in 20minutes
            httpOnly: true, // The cookie is only accessible by the web server
            secure: true,
            sameSite: "None",
          };

          const token = generateAccessJWT(results[0]); // generate session token for user
          res.cookie("SessionID", token, options);

          res.status(200).json({
            status: "success",
            data: results[0],
            message: "You have successfully logged in.",
          });
        }
      }
    );
  } catch (err) {
    res.tatus(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
};

module.exports = Register;
module.exports = Login;
