const express = require("express");
const app = express();

app.listen(process.env.PORT || 5001, function (err) {
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

app.post("/findUnicornByName", function (req, res) {
  console.log(req.body.unicornName);

  unicornModel.find({ name: req.body.unicornName }, function (err, unicorns) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Data " + unicorns);
    }
    res.send(unicorns);
  });
});

app.post("/findUnicornByWeight", function (req, res) {
  lowerWeight = req.body.lowerWeight;
  higherWeight = req.body.higherWeight;

  unicornModel.find(
    { weight: { $gt: lowerWeight }, weight: { $lt: higherWeight } },
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

app.post("/findUnicornByFood", function (req, res) {
  aList = [];
  if (req.body.carrotIsChecked == "checked") aList.push("carrot");
  if (req.body.appleIsChecked == "checked") aList.push("apple");

  unicornModel.find({ loves: { $all: aList } }, function (err, unicorns) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Data " + JSON.stringify(unicorns));
    }
    res.send(unicorns);
  });
});

app.post("/filter", function (req, res) {
  projection = {}
  Object.entries(req.body.unicornFilter).forEach(([key,val])=>{
    if (parseInt(val)) projection[key] = 1;
  })

  unicornModel.find({}, projection, function (err, unicorns) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Data " + JSON.stringify(unicorns));
    }
    res.send(unicorns);
  });
});
