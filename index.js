import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import router from "./Routes/routes.js";
import bicStudents from "./SampleData/sampledata.js";
import { BICSTUDENTS } from "./SampleData/sampledata.js";
import BICS from "./models/BIC.js";
import Pizza from "./models/PizzaUser.js";
import Runner from "./models/Candidate.js";

//define the server
const app = express();

// app.use(
//   cors({
//     origin: "https://vote-verse.vercel.app",
//     methods: "GET, POST",
//     allowedHeaders: "Content-Type",
//     credentials: true,
//   })
// );
// Do you want to skip the checking of the origin and grant authorization?
const skipTheCheckingOfOrigin = true;
const allowedOrigins = ["https://vote-verse.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      // or allow all origines (skipTheCheckingOfOrigin === true)
      if (!origin || skipTheCheckingOfOrigin === true)
        return callback(null, true);

      // -1 means that the user's origin is not in the array allowedOrigins
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";

        return callback(new Error(msg), false);
      }
      // origin is in the array allowedOrigins so authorization is granted
      return callback(null, true);
    },
  })
);

//use modules
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use((err, req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");

  // Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );

  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });

  next();
});

//The routes
app.use("/", router);
app.get("/", (req, res) => {
  res.send("Welcome to vote verse");
});

//setup mongo connectionI
const PORT = process.env.PORT || 8080;

mongoose
  .connect(
    // "mongodb+srv://mongodb:SS6ARbOU4LiwEYAi@cluster0.i9foyr2.mongodb.net/",
    //mongodb+srv://mongodb:SS6ARbOU4LiwEYAi@cluster0.i9foyr2.mongodb.net/?retryWrites=true&w=majority"
    // "mongodb+srv://admin:admin@bic.siax8qk.mongodb.net/?retryWrites=true&w=majority&appName=BIC",
    "mongodb+srv://gideon:admin@bic.65icbqe.mongodb.net/?retryWrites=true&w=majority&appName=BIC",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(
    app.listen(PORT, async (req, res) => {
      console.log(`Server is running on port ${PORT}`);
      const BIC = BICS.BIC;
      // const loadDB = await BIC.insertMany(BICSTUDENTS);
      // console.log(loadDB);
      // const delCand = await Runner.deleteMany();
      // const deldB = await BIC.deleteMany();
      // console.log(delCand);
      // console.log(deldB);
      // const delPizza = await Pizza.deleteMany();
      // console.log(delPizza);
    })
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console);
