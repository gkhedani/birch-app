require("./config/config.js");

const port = process.env.PORT;
const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");

const {mongoose} = require("./db/mongoose");
const {Recipe, Brew} = require("./models/recipe");

const app = express();

app.use(bodyParser.json());

app.post("/recipe", (req, res) => {
  console.log("Adding recipe");
  // let nowTS = moment();

  let recipe = new Recipe({
    name: req.body.name,
    BJCPStyle: req.body.BJCPStyle,
    ingredients: [{
      ingredient: req.body.ingredient,
      amt: req.body.amt,
      unit: req.body.unit
    },
    ],
    notes: req.body.notes,
    createdAt: moment().valueOf()
  });

  recipe.save().then((rec) => {
    res.send(rec);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post("/brew", (req, res) => {
  console.log("Adding new brew");
  const name = "Homebrew in Paradise";
  let brew = new Brew({
    name:  name,
    brewName: req.body.brewName,
    batch: req.body.batch,
    ingredients: [{
      ingredient: req.body.ingredient,
      amt: req.body.amt,
      unit: req.body.unit
    },
    ],
    notes: req.body.notes,
    createdAt: moment().valueOf()
  });

  brew.save().then((rec) => {
    res.send(rec);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`BIRCH started at port ${port}`);
});
