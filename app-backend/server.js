require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

let Availability = require("./models/availability.model");
let HistoricalAvailability = require("./models/historicalAvailability.model");
let HourlyPredictions = require("./models/hourlyPredictions.model");

app.use(cors());
app.use(bodyParser.json());

//currently setup so that mongo connects to whichever DB is selected in .env (using UNH to test atm)
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DATABASE}`, {
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB connection established");
});

//router acts as middleware and will take care of requests starting with /availability
const availabilityRoutes = express.Router();
app.use("/availability", availabilityRoutes);

//return all availability
availabilityRoutes.route("/").get(function (req, res) {
  console.log("Getting all availabilities");
  Availability.find(function (err, availability) {
    if (err) {
      console.log(err);
    } else {
      res.json(availability);
    }
  });
});

availabilityRoutes.route("/add").post(function (req, res) {
  let avail = new Availability(req.body);
  avail
    .save()
    .then((avail) => {
      res.status(200).json({ avail: "availability added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new availability failed");
    });
});

/*Expected format in body: 
{
  "lotName": "NAME",
  "openSpots": "NUMBER",
  "lastUpdated": "TIME"
} */
availabilityRoutes.route("/updateLotStatus").post(async function (req, res) {
  // console.log(req.body);
  try {
    if (req.body.lotName) {
      await Availability.updateOne(
        { lotName: req.body.lotName },
        {
          openSpots: req.body.openSpots,
          lastUpdated: req.body.lastUpdated,
        }
      );
      //TODO: Does not work if coming from PAR as numbers have leading zeros. The fix to remove
      //      leading zeroes is OS dependent - so either switch based on OS, or make function
      //      to remove the zeroes in the PAR
      req.body.date = req.body.lastUpdated.split(" ")[0]; //remove the time from the date
      let resMsg = await addHistory(req, res);
      return res.status(200).send(`Updated lot status for ${req.body.lotName}`);
    } else {
      res.json({ error: "No lotName query found inside request" });
    }
  } catch (error) {
    throw error;
  }
});

const historicalAvailabilityRoutes = express.Router();
app.use("/historicalAvailability", historicalAvailabilityRoutes);

//get all history
historicalAvailabilityRoutes.route("/").get(function (req, res) {
  console.log("Getting all availability history");
  HistoricalAvailability.find(function (err, historicalAvailability) {
    if (err) {
      console.log(err);
    } else {
      res.json(historicalAvailability);
    }
  });
});

historicalAvailabilityRoutes.route("/add").post(async function (req, res) {
  let resMsg = await addHistory(req, res);
  return res.status(resMsg.status).send(resMsg.message);
});

historicalAvailabilityRoutes.route("/update").post(async function (req, res) {
  let resMsg = await updateHistory(req, res);
  res.status(resMsg.status).send(resMsg.message);
});

historicalAvailabilityRoutes
  .route("/lotHistory")
  .get(async function (req, res) {
    try {
      if (req.body.lotName && req.body.day) {
        let hist = await HistoricalAvailability.find({
          lotName: req.body.lotName,
          day: req.body.day,
        }).exec();
        if (hist.length == 0) {
          res.status(400).json({ error: "No match found" });
        } else {
          console.log(hist);
          res.status(200).send(hist);
        }
      } else {
        res.status(400).json({ error: "Lot name or day not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Error finding matching lot" });
    }
  });

async function addHistory(req, res) {
  let checkHistory = await HistoricalAvailability.exists({
    lotName: req.body.lotName,
    date: req.body.date,
  });
  if (checkHistory) {
    let resMsg = await updateHistory(req, res);
    return { status: resMsg.status, message: resMsg.message };
  } else {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    //TODO: this does not take into account the date passed in, this will fill in with current date - may need to change this, but should theoretically
    ///     work for real data coming in
    if (!req.body.day) {
      //if day of the week is not given
      let d = new Date();
      req.body.day = weekday[d.getDay()];
    }
    let history = new HistoricalAvailability(req.body);
    try {
      await history.save();
      console.log(`SUCCESS: Added history for ${req.body.lotName}`);
      return { status: 200, message: "history added successfully" };
    } catch (err) {
      // throw(err)
      console.log(`ERROR: Could not add history for ${req.body.lotName}`);
      return { status: 400, message: "Adding history failed" };
    }
  }
}

async function updateHistory(req, res) {
  try {
    if (req.body.date && req.body.lotName && req.body.openSpots) {
      if (req.body.openSpots.constructor == Array) {
        console.log(
          `ERROR: Could not update history for ${req.body.lotName}! An array was received.`
        );
        return {
          status: 400,
          message:
            "Cannot append array to existing array! Did you mean to send a single value?",
        };
      }
      await HistoricalAvailability.updateOne(
        { lotName: req.body.lotName, date: req.body.date },
        { $push: { openSpots: req.body.openSpots } }
      );
      console.log(`SUCCESS: Updated history for ${req.body.lotName}`);
      return { status: 200, message: "Entry updated" };
    } else {
      console.log("ERROR: Could not update history! Information is missing.");
      return { status: 400, message: "Fields missing or no match found" };
    }
  } catch (error) {
    throw error;
  }
}

//TODO: Standardize responses, make either all use .json or .send

// Use "nodemon server" to start
app.listen(4000, function () {
  console.log("Server is running on Port: 4000");
});

// To start backend, use "nodemon server"
// To connect database, open two terminals. In the first, type 'mongod', and in the second do 'mongosh'
