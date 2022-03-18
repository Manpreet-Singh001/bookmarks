const express = require("express");
const app = express();
const connectDB = require("./utils/connectDB");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const path = require("path");

// spells
require("dotenv").config();
require("express-async-errors");



// routers
const bookmarkRouter = require("./routes/bookmark");
const notFound = require("./middleware/not-found");

app.use(express.json());
app.use("/", bookmarkRouter);
app.use(notFound);
app.use(errorHandler);

// server static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/bookmark/build")); // set static folder
  //returning frontend for any route other than api
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "bookmark", "build", "index.html")
    );
  });
}


const port = process.env.PORT || 5000;
const startServer = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};
startServer();
//ToDO: Sanitize urls in a better way
