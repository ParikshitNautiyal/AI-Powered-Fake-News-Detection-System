
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/check-news", async (req, res) => {
    try {

        const news = req.body.news;

        const response = await axios.post("http://127.0.0.1:8000/predict", {
            news: news
        });

        res.json(response.data);

    } catch (error) {

        res.status(500).json({error: "Prediction failed"});

    }
});

app.listen(5000, () => {
    console.log("Node backend running on port 5000");
});
