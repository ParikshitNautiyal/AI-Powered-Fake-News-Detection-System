import React, { useState } from "react";
import Tesseract from "tesseract.js";
import "./App.css";

function App() {
  const [newsText, setNewsText] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatus("Extracting text...");
    try {
      const res = await Tesseract.recognize(file, "eng");
      setNewsText(res.data.text);
      setStatus("Text extracted successfully");
    } catch {
      setStatus("Error extracting text");
    }
  };

  const analyzeNews = async () => {
    if (!newsText.trim()) {
      alert("Please provide some text or image!");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/check-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ news: newsText }),
      });

      const data = await response.json();

      setResult({
        prediction: data.prediction,
        confidence: data.confidence,
      });

    } catch {
      setResult({ error: "Server error" });
    }

    setLoading(false);
  };

  const reportPrediction = async () => {
    if (!newsText || !result) return;

    await fetch("http://localhost:5000/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        news_text: newsText,
        prediction: result.prediction,
      }),
    });

    alert("Report submitted");
  };

  return (
    <div className="app">
      <div className="card">

        <h1>TruthScan AI</h1>
        <p className="subtitle">
          AI-powered fake news detection using machine learning
        </p>

        <div className="upload-box">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <p>📷 Upload Image</p>
        </div>

        {status && <div className="status">{status}</div>}

        <div className="divider">OR</div>

        <textarea
          value={newsText}
          onChange={(e) => setNewsText(e.target.value)}
          placeholder="Paste news text here..."
        />

        <button className="primary" onClick={analyzeNews}>
          Verify News
        </button>

        <button className="secondary" onClick={reportPrediction}>
          Report Incorrect
        </button>

        {loading && <div className="loader"></div>}

        {result && !result.error && (
          <div className="result-card">

            <div className={`badge ${
              result.prediction.includes("Fake") ? "fake" : "real"
            }`}>
              {result.prediction}
            </div>

            <div className="confidence">
              Confidence: {result.confidence}%
              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
            </div>

          </div>
        )}

        {result?.error && <div className="error">{result.error}</div>}

      </div>
    </div>
  );
}

export default App;