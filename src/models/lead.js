const mongoose = require('mongoose');
const errors = require('http-errors');

/**
 * Lead Schema
 */
const LeadSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

LeadSchema.statics = {
  get(id) {
    return this.findById(id)
      .exec()
      .then((lead) => {
        if (lead) {
          return lead;
        }
        throw new errors.NotFound('No lead found');
      });
  },

  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

module.exports = mongoose.model('Lead', LeadSchema);
