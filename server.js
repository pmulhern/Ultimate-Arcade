const express = require("express");
const app = express();
const userRouter = require("./routes/User");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use("/user", userRouter);
mongoose
  .connect(process.env.MONGODB_URI || "mongodb+srv://Millgolb36:J6hcvWc8XBjBak8@cluster0.2jlkx.mongodb.net/ultimate-arcade?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB successfully connected!!"))
  .catch((err) => console.log(err));

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
