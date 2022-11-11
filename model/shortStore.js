const mongoose = require('mongoose');
const shortId = require('shortid');
const schema = mongoose.Schema;

const shortSchema = schema({
    full: {
      type: String,
      required: true
    },
    short: {
      type: String,
      required: true,
      default: shortId.generate
    }
  });

  const ShortUrl = mongoose.model(
    "ShortUrl",
    shortSchema,
    "ShortUrlCollection"
  );
  module.exports = ShortUrl;
  
