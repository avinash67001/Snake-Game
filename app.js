const express = require("express");
const ejs = require("ejs");
const collection = require("./config.js");
const app = express();
const PORT = process.env.PORT || 4500;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use("/public", express.static("public"));

app.get("/Signup", (req, resp) => {
  resp.render("Signup", { message: "*We never share your details with anyone" });
});


app.post("/Signup", async (req, resp) => {
  const data = {
    name: req.body.name,
  };

  try {
    const check = await collection.findOne({ name: req.body.name });
    if (data.name.trim() === "") {
      resp.render("Signup", { message: "Please enter a username." });
    } else if (check.name === req.body.name) {
      resp.render("Signup", { message: "This username already exists." });
    }
  } catch {
    await collection.insertMany([data]);
    resp.render('NewGame');
  }
});

app.get("/", (req, resp) => {
  resp.render("Login", { message: "*We never share your details with anyone" });
});

app.post("/Login", async (req, resp) => {
  const data = {
    name: req.body.name,
  };

  try {
    const check = await collection.findOne({ name: req.body.name });
    if (data.name.trim() === "") {
      resp.render("Login", { message: "Please enter a username." });
    } else if (check.name === req.body.name) {
      resp.render('NewGame');
    }
  } catch {
    resp.render("Login", { message: "This username does not exists." });
  }
});

app.get("/game", (req,resp)=>{
  resp.render('index');
})

app.get('/HowToPlay', (req,resp)=>{
  resp.render('HowToPlay');
})

app.get("/NewGame", (req,resp)=>{
  resp.render('NewGame', );
})

app.listen(4500);
