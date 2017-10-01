// Event collection
const mongoose = require("mongoose");

const eventSchema = mongoose.Schema( {
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
  _brew: {
    type: mongoose.Schema.Types.ObjectId
  },
  events: [
    {
      event: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
      },
      category: {
        type: String,
        enum: ['Prior to Boil', 'Boil Day', 'Fermentation', 'Bottling']
      }
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

const Event = mongoose.model("Event", eventSchema);

module.exports = {Event};
