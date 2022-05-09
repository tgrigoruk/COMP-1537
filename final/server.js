const express = require("express");
const app = express();

//process.env.PORT || 
app.listen(5001, function (err) {
  if (err) console.log(err);
});
app.use(express.static("./public"));

const bodyparser = require("body-parser");
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

const cors = require('cors');
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://tgrigoruk:comp1537@cluster0.zvy6j.mongodb.net/A3?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const unicornSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  loves: [String],
});
const unicornModel = mongoose.model("unicorns", unicornSchema);

app.post("/getAllUnicorns", function (req, res) {
  // console.log(req);

  unicornModel.find({}, function (err, unicorns) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Data OK");// + unicorns);
    }
    res.send(unicorns);
  });
});

app.post("/displayUnicorn", function (req, res) {
  unicornName = req.body.unicornName;
  console.log("name " + unicornName)
  unicornModel.find(
    { name:  unicornName },
    function (err, unicorns) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Data " + JSON.stringify(unicorns));
      }
      res.send(unicorns);
    }
  );
});

