const express = require("express");
const InitiateDb = require("./config/db")
require("dotenv").config({path:"./config/secret.env"});
InitiateDb();

const app = express(); 
 
app.use(express.json());
app.use("/post", require("./routes/posts"))
app.use("/user", require("./routes/users"));
app.use("/profile", require("./routes/profiles"));

// Catch all to handle all other requests that come into the app. 
// app.use('*', (req, res) => {
//   res.status(404).json({ msg: 'Not Found' })
// })
 

const PORT =  process.env.PORT;    

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
