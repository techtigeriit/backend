require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const corsOptions = {
  Credential: "true",
};

const app = express();

app.use(express.json());
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

const http = require("http").createServer(app);


// !Routes
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/matchRouter"));
app.use("/api", require("./routes/teamRouter"));


const URI = process.env.MONGO_URI;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Database Connected!!");
  }
);

const port = process.env.PORT || 8080;
http.listen(port, () => {
  console.log("Listening on ", port);
});
