// Recipe collection
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  share: {
    type: Boolean,
    required: true,
    default: false
  },
  type: {
    type: String,
    enum: ['original', 'adaptation']
  },
  group: {
    type: String,
    enum: ['beef', 'beer',
            'chicken', 'cider',
            'mead',
            'pork',
            'vegetable',],
    required: true
  },
  batch: {
    type: Number,
    default: null,
  },
  batchSize: {
    type: Number
  },
  _original: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  method: {
    type: String
  },
  BJCPStyle: {
    type: String,
    enum: ['BJCP 2015 1A - American Light Lager',
           'BJCP 2015 1B - American Lager',
           'BJCP 2015 1C - Cream Ale',
           'BJCP 2015 1D - American Wheat Bear']
  },
  ingredients: [
    {
      ingredient: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
      },
      amt: {
        type: Number,
        required: true
      },
      unit: {
        type: String,
        enum: ['bag', 'bottle', 'bucket', 'cap', 'cup', 'gal', 'kit',
              'lb', 'oz', 'pint', 'pkg', 'roll', 'tbl', 'tsp']
      },
      price: {
        type: Number,
        default: 0.00
      },
      datePurchased: {
        type: Date
      }
    }
  ],
  yeastStarter: {
    ingredients: [
      {
        ingredient: {
          type: String,
          required: true,
          minlength: 1,
          trim: true
        },
        amt: {
          type: Number,
          required: true
        },
        unit: {
          type: String,
          enum: ['bag', 'bottle', 'bucket', 'cap', 'cup', 'gal', 'kit',
                'lb', 'oz', 'pint', 'pkg', 'roll', 'tbl', 'tsp']
        },
        price: {
          type: Number,
          default: 0.00
        },
        datePurchased: {
          type: Date
        }
      }
    ],
    notes: {
      type: String
    }
  },
  process: [
    {
      type: {
        type: String,
        enum: ['Prior to Boil', 'Boil Day', 'Fermentation', 'Bottling']
      },
      steps: [
        {
          instruction: {
            type: String,
            required:  true,
            minlength: 1,
            trim: true
          }
        }
      ]
    }
  ],
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    default: null
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = {Recipe};
