require("./config/config.js");

const {ObjectId} = require("mongodb");
const port = process.env.PORT;
const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");

const {mongoose} = require("./db/mongoose");
const {Brew} = require("./models/brew");

const app = express();

app.use(bodyParser.json());

// add base recipe
app.post("/recipe", (req, res) => {
  console.log("Adding base recipe");
  // let nowTS = moment();

  let brew = new Brew({
    name: req.body.name,
    type: "base",
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

  brew.save().then((rec) => {
    res.send(rec);
  }, (e) => {
    res.status(400).send(e);
  });
});

// add varietal brew
app.post("/varietal", (req, res) => {
  console.log("Adding new varietal brew");

  let brew = new Brew({
    name: req.body.name,
    type: "varietal",
    _base: req.body.baseID,
    batch: req.body.batch,
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

  brew.save().then((rec) => {
    res.send(rec);
  }, (e) => {
    res.status(400).send(e);
  });
});

// get all brews
app.get("/brews", (req, res) => {
  Brew.find().then((brews) => {
    res.send({brews});
  }, (e) => {
    res.status(400).send(e);
  });
});


// get all brews for a base recipe
app.get("/brews/:id", (req, res) => {
  let id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }
  // find with id = _id and/or _base
  Brew.find({$or: [{_id: id}, {_base: id}]
  }).then((brews) => {
    if (!brews) {
      return res.status(404).send();
    }
    res.send({brews});
  }).catch((e) => res.status(400).send());
});

app.listen(port, () => {
  console.log(`BIRCH started at port ${port}`);
});
