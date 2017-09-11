// Brew collection
const mongoose = require("mongoose");

const brewSchema = mongoose.Schema( {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  type: {
    type: String,
    enum: ['base', 'varietal']
  },
  batch: {
    type: Number,
    default: null,
  },
  batchSize: {
    type: Number
  },
  _base: {
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
      dateProcured: {
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
        dateProcured: {
          type: Date
        }
      }
    ],
    notes: {
      type: String
    }
  },
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

const Brew = mongoose.model("Brew", brewSchema);

module.exports = {Brew};
