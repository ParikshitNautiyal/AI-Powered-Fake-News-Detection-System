const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

// --------------------
// MongoDB Connection
// --------------------

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function connectDB(){
    await client.connect();
    db = client.db("fake_news_db");
    console.log("MongoDB connected");
}


// --------------------
// Prediction Route
// --------------------

app.post("/check-news", async (req, res) => {

    try{

        const news = req.body.news;

        const response = await axios.post("http://127.0.0.1:8000/predict", {
            news: news
        });

        const result = response.data;

        // store prediction in MongoDB
        await db.collection("predictions").insertOne({
            news_text: news,
            prediction: result.prediction,
            confidence: result.confidence,
            logistic_regression: result.logistic_regression,
            random_forest: result.random_forest,
            timestamp: new Date()
        });

        res.json(result);

    }
    catch(error){

        console.error(error);
        res.status(500).json({error: "Prediction failed"});

    }

});


// --------------------
// Report Incorrect Prediction
// --------------------

app.post("/report", async (req, res) => {

    try{

        const { news_text, prediction } = req.body;

        await db.collection("reported_predictions").insertOne({
            news_text: news_text,
            model_prediction: prediction,
            timestamp: new Date()
        });

        res.json({message:"Report submitted successfully"});

    }
    catch(error){

        res.status(500).json({error:"Report failed"});
    }

});


// --------------------
// Start Server AFTER DB Connects
// --------------------

connectDB().then(() => {

    app.listen(5000, () => {
        console.log("Node backend running on port 5000");
    });

}).catch((error) => {
    console.error("MongoDB connection failed:", error);
});