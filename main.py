from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle

app = FastAPI(title="Fake News Detection API")

# Load models and vectorizer
try:
    LR = pickle.load(open("lr_model.pkl", "rb"))
    RF = pickle.load(open("rf_model.pkl", "rb"))
    vectorization = pickle.load(open("vectorizer.pkl", "rb"))
except Exception as e:
    raise RuntimeError(f"Error loading models/vectorizer: {e}")


# Request schema
class NewsInput(BaseModel):
    news: str


# -----------------------------
# Text preprocessing
# -----------------------------
import re
import string

def textpro(text):
    text = text.lower()
    text = re.sub(r'\[.*?\]', '', text)
    text = re.sub(r"\W", " ", text)
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    text = re.sub(r'<.*?>+', '', text)
    text = re.sub(r'[%s]' % re.escape(string.punctuation), '', text)
    text = re.sub(r'\w*\d\w*', '', text)
    return text


# -----------------------------
# Label conversion
# -----------------------------
def output_final(n):
    if n == 0:
        return "Fake News"
    else:
        return "Not a Fake News"


# -----------------------------
# Ensemble prediction function
# -----------------------------
def ensemble_predict(news):

    processed = textpro(news)
    vector = vectorization.transform([processed])

    # Individual model probabilities
    proba_LR = LR.predict_proba(vector)[0]
    proba_RF = RF.predict_proba(vector)[0]

    # Average probability (Ensemble)
    avg_proba = (proba_LR + proba_RF) / 2

    final_pred = avg_proba.argmax()
    confidence = max(avg_proba)

    return {
        "prediction": output_final(final_pred),
        "confidence": round(confidence * 100, 2),
        "logistic_regression": {
            "fake": round(proba_LR[0] * 100, 2),
            "real": round(proba_LR[1] * 100, 2)
        },
        "random_forest": {
            "fake": round(proba_RF[0] * 100, 2),
            "real": round(proba_RF[1] * 100, 2)
        }
    }


# -----------------------------
# Routes
# -----------------------------
@app.get("/")
def home():
    return {"message": "Fake News Detection API running"}


@app.post("/predict")
def predict(data: NewsInput):

    news = data.news

    if news.strip() == "":
        raise HTTPException(status_code=400, detail="News text is required")

    try:
        result = ensemble_predict(news)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))