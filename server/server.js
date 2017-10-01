require("./config/config.js");

const {ObjectId} = require("mongodb");
const port = process.env.PORT;
const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");

const {mongoose} = require("./db/mongoose");
const {Recipe} = require("./models/recipe");

const app = express();

app.use(bodyParser.json());

// add base recipe
app.post("/recipe", (req, res) => {
  console.log("Adding original recipe");
  // let nowTS = moment();

  let recipe = new Recipe({
    name: req.body.name,
    share: req.body.share,
    type: "original",
    group: req.body.group,
    method: req.body.method,
    BJCPStyle: req.body.BJCPStyle,
    ingredients: [{
      ingredient: req.body.ingredient,
      amt: req.body.amt,
      unit: req.body.unit,
      price: req.body.price,
      datePurchased: req.body.datePurchased
    },
    ],
    yeastStarter: {
      ingredients: [{
        ingredient: req.body.ysIngredient,
        amt: req.body.ysAmt,
        unit: req.body.ysUnit
      }],
      price: req.body.ysPrice,
      datePurchased: req.body.ysDatePurchased,
      notes: req.body.ysnotes
    },
    notes: req.body.notes,
    createdAt: moment().valueOf()
  });

  recipe.save().then((rec) => {
    res.send(rec);
  }, (e) => {
    res.status(400).send(e);
  });
});

// add adaptation
app.post("/adaptation", async (req, res) => {
  console.log("Adding new adapted recipe");

  let recipe = new Recipe({
    name: req.body.name,
    share: req.body.share,
    type: "adaptation",
    group: req.body.group,
    _original: req.body.originalID,
    batch: req.body.batch,
    batchSize: req.body.batchSize,
    // method should come from originalID
    method: req.body.method,
    BJCPStyle: req.body.BJCPStyle,
    ingredients: [{
      ingredient: req.body.ingredient,
      amt: req.body.amt,
      unit: req.body.unit,
      price: req.body.price,
      dateProcured: req.body.datePurchased
    },
    ],
    yeastStarter: {
      ingredients: [{
        ingredient: req.body.ysIngredient,
        amt: req.body.ysAmt,
        unit: req.body.ysUnit
      }],
      price: req.body.ysPrice,
      dateProcured: req.body.ysDatePurchased,
      notes: req.body.ysnotes
    },
    notes: req.body.notes,
    createdAt: moment().valueOf()
  });

  try {
    const rec = await recipe.save();
    if (!rec) {
      return res.status(400).send(e);
    }
    res.send(rec);
  } catch (e) {
    return res.status(400).send(e);
  }
  // brew.save().then((rec) => {
  //   res.send(rec);
  // }, (e) => {
  //   res.status(400).send(e);
  // });
});

// get all recipes
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    if (!recipes) {
      return res.status(400).send(e);
    }
    res.send({recipes});
  } catch (e) {
    return res.status(400).send(e);
  }
});

// app.get("/brews", (req, res) => {
//   Brew.find().then((brews) => {
//     res.send({brews});
//   }, (e) => {
//     res.status(400).send(e);
//   });
// });

// add an ingredient to a recipe
app.patch("/ingredient/add/:id", (req, res) => {
  let id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  // add the ingredient to the ingredients array
  Recipe.updateOne({
    _id: id
  }, {$push: {
    ingredients: {
      ingredient: req.body.ingredient,
      amt: req.body.amt,
      unit: req.body.unit
    }
  }, $set: {
      updatedAt: moment().valueOf()
    }
  }).then((recipe) => {
    if (!recipe) {
      return res.status(404).send();
    }

    // success
    res.send({recipe});
  }).catch((e) => res.status(400).send());
});


// delete an ingredient from a recipe
app.patch("/ingredient/delete/:id", (req, res) => {
  let id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  // delete the ingredient from the ingredients array
  // WARNING: returns 200 if a non-existent ingredient is deleted
  Recipe.updateOne({
    _id: id
  }, {$pull: {
    ingredients: {
      // ingredient: req.body.ingredient
      _id: req.body.id
    }
  }, $set: {
      updatedAt: moment().valueOf()
    }
  }).then((recipe) => {
    if (!recipe) {
      return res.status(404).send();
    }

    // success
    res.send({recipe});
  }).catch((e) => res.status(400).send());
});


// get all adaptations for the original recipe
app.get("/adaptations/:id", (req, res) => {
  let id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }
  // find with id = _id and/or _original
  Recipe.find({$or: [{_id: id}, {_original: id}]
  }).then((recipes) => {
    if (!recipes) {
      return res.status(404).send();
    }
    res.send({recipes});
  }).catch((e) => res.status(400).send());
});

app.listen(port, () => {
  console.log(`BIRCH started at port ${port}`);
});
