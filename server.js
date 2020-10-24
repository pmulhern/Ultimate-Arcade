const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json())
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/arcade", {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true
})
.then(() => console.log("MongoDB successfully connected!!"))
.catch(err => console.log(err));

const userRouter = require('./routes/User');
app.use('/user',userRouter)

app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });