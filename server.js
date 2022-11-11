const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const shortUrl = require('./model/shortStore.js');

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
const connectDB = require("./db/db");

app.get('/', (req, res) => {
  res.send('Hello There!');
});

app.post('/short', async (req, res) => {
    await shortUrl.create({full: req.body.full});
    const foundNow = await shortUrl.find({full: req.body.full});
    res.send(foundNow);
});

app.get('/:shortUrl', async (req, res) => {
  const short = await shortUrl.findOne({ short: req.params.shortUrl });
  if (short == null) return res.sendStatus(404);
  res.redirect(`${short.full}`);
});

connectDB()
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log("Server-ON");
    })
  )
  .catch((e) => console.log(e, " err-index.js"));
