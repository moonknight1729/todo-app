const dotenv = require("dotenv");
dotenv.config();

const { PORT, SECRET_ACCESS_TOKEN } = process.env;
module.exports = { PORT, SECRET_ACCESS_TOKEN };
