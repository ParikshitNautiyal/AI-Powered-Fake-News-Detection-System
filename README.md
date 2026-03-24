
RUNNING THE PROJECT

1. Install Python packages using vs code terminal
pip install -r requirements.txt

2. Start ML API
py -m uvicorn main:app --reload

3. Install Node packages in project folder
npm install

4. Start backend using separate window
node node_server.js

5. Open frontend
Open frontend/index.html in browser

FLOW:
Input -> Frontend -> Node Backend -> FastAPI -> ML Models -> Node Backend -> Frontend -> Output
