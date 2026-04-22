
RUNNING THE PROJECT

1. Place your trained files in this folder:
   lr_model.pkl
   rf_model.pkl
   vectorizer.pkl

2. Install Python packages and MongoDB
npm install express axios cors mongodb
pip install -r requirements.txt


https://www.mongodb.com/try/download/community
Version: Latest
Platform: Windows
Package: MSI


npm install mongodb
npm audit


3. Install Node packages and initialize node project (package.json)
npm install
npm init -y

4. Start ML API
py -m uvicorn main:app --reload

5. Start Mongodb using cmd(admin)
net start MongoDB

6. Start MongoDB compass from .exe

5. Start backend
node node_server.js

6. Open frontend
Open frontend/index.html in browser

FLOW:
Frontend -> Node Backend -> FastAPI -> ML Models

7. Stop MongoDB
net stop MongoDB

8. Close compass

UPDATE :

1. Install vite react
npm create vite@latest frontend

2. Install tesseract using : npm install tesseract.js

3. run vite using :D:\Sem 6\Full Stack\PBL\V6.0\frontend>npm run dev 
then open link in browser



Tech :
OCR (Tesseract)
REST APIs
TF-IDF Vectorization
Logistic Regression
Random Forest
Ensemble Learning ⭐ (VERY IMPORTANT)
MongoDB (NoSQL)
Client-Server Architecture

Working :
Text/Image input in frontend(app.jsx) and request sent to -> Server(node_server.js)

Server extracts news and forwards it to ML API (main.py)

In main.py we do Text Preprocessing , Vectorization , ML model prediction (logistic and random forest) then combine both models, calculate confidence scores and send response from API to -> Server(node_Server.js)

Server(node_server.js) stores results in Database(MongoDB) then forwards -> frontend(app.jsx)
Frontend(app.jsx) displays results

FLOW :
Frontend -> Server -> ML API -> Server -> Frontend