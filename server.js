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
app.use(cookieParser());

//#region // !Socket
const http = require("http").createServer(app);


//#endregion

//#region // !Routes
// app.use("/api", require("./routes/authRouter"));
// app.use("/api", require("./routes/userRouter"));
// app.use("/api", require("./routes/postRouter"));
// app.use("/api", require("./routes/commentRouter"));
// app.use("/api", require("./routes/adminRouter"));
// app.use("/api", require("./routes/notifyRouter"));
// app.use("/api", require("./routes/messageRouter"));
// app.use("/api", require("./routes/ananomMessageRouter"));
// app.use("/api", require("./routes/matchRequestRouter"));

//#endregion

//production build

// if ((process.env.NODE_ENV = "production")) {
//   console.log("under production")
//   app.use(express.static("client/build"));

//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const URI = process.env.MONGO_URI;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
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
