
RUNNING THE PROJECT

1. Place your trained files in this folder:
   lr_model.pkl
   rf_model.pkl
   vectorizer.pkl

2. Install Python packages
pip install -r requirements.txt

3. Start ML API
py -m uvicorn main:app --reload

4. Install Node packages
npm install

5. Start backend
node node_server.js

6. Open frontend
Open frontend/index.html in browser

FLOW:
Frontend -> Node Backend -> FastAPI -> ML Models
