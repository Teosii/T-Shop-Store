const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const sequelize = require("./models/database");
sequelize.sync();

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the Sequelize database");
  })
  .catch((error) => {
    console.error(
      "Unable to connect to the Sequelize database:",
      error.message
    );
  });

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use("/public", express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {});
});

app.get("/new", function (req, res) {
  res.render("new", {});
});

app.get("/women", function (req, res) {
  res.render("women", {});
});

app.get("/men", function (req, res) {
  res.render("men", {});
});

app.get("/login", function (req, res) {
  res.render("login", {});
});

app.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // res.send(`User ${newUser.username} created successfully.`);
    res.redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    res.send("Error creating user. Please try again.");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


