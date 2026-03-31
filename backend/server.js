const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const app = express();
const wordSchema = require("./models/word");

const wordRoute= require("./routes/wordRoute");

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/word", wordRoute);

app.get("/", (req,res)=>{
    res.send("Server is running...");
})

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})