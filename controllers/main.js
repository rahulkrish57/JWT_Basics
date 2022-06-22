const {BadRequest} = require("../errors");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest("please provide username and password");
  }
  // just for demo, normally provided by database
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  //   console.log(username, password);
  res.status(200).json({ msg: "User created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `hello, ${req.user.username}`,
      secret: `here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  
};

module.exports = { login, dashboard };
