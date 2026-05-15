const path = require("path");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config({
  quiet: true,
  path: path.resolve(__dirname, "..", "..", ".env"),
});

function createToken(payload) {
    return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: Number(process.env.DEFAULT_EXPIRES_IN_SECONDS) }
  );
}

module.exports = {
  createToken,
};