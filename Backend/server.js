const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config();
const app = express();

app.use(cors({origin:"*"}))

app.use(express.json())

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
  
const authRoutes = require("./Routes/auth");

app.use("/api/auth", authRoutes);


app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})