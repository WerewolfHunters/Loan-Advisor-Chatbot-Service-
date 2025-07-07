# 💰 AI Loan Advisor - Full Stack Application

This project is an intelligent loan recommendation system that takes a user’s input (loan amount, income, credit score) and:

- 🧠 Uses a trained ML model to rank top 3 lenders
- 🤖 Uses LangChain + Groq to generate reasoning in natural language
- ⚛️ Frontend built with React + TypeScript
- 🚀 Backend built with Node.js + Express
- 🐍 Backend logic powered by Python (joblib + LangChain + Groq)

---

## 📂 Project Structure

website-testing-1/<br>
├── backend/<br>
│ ├── app.ts # Express server<br>
│ ├── controllers/<br>
│ │ └── chatController.ts<br>
│ ├── routes/<br>
│ │ └── chat.ts<br>
│ ├── utils/<br>
│ │ └── spawnPython.ts<br>
│ └── services/<br>
│ ├── predictor.py<br>
│ ├── match_model.joblib<br>
│ ├── lenders.json<br>
│ ├── matchModel.py<br>
│ └── train_model.py<br>
├── frontend/<br>
│ ├── src/<br>
│ │ ├── App.tsx<br>
│ │ ├── api.ts<br>
│ │ └── components/<br>
│ │ └── ChatUI.tsx<br>
│ └── package.json<br>

---

## 📥 Getting Started

1. **Clone the repository**

```bash
git clone (https://github.com/WerewolfHunters/Loan-Advisor-Chatbot-Service-.git)
cd Loan-Advisor-Chatbot-Service-
```

2. Follow the setup instructions below for backend and frontend.

---

## ✅ 2. **List of All `npm` Packages You Installed**

Add this under a new section titled **"📦 Installed NPM Packages"** or inside the **Backend Setup** and **Frontend Setup** sections. Here's a consolidated list based on your project:

---

### 📦 NPM Packages Installed

<details>
<summary><strong>Backend (Node.js + TypeScript)</strong></summary>

```bash
npm install express cors body-parser
npm install --save-dev typescript ts-node @types/node @types/express @types/cors
```
These are used for:
- `express` – backend server
- `cors` – cross-origin requests
- `body-parser` – parsing JSON requests
- `typescript`, `ts-node` – running `.ts` directly
- Type declarations via `@types/*`


</details>

<details>
<summary><strong>Frontend (React + TypeScript)</strong></summary>

```bash
npm install react react-dom
npm install --save-dev typescript @types/react @types/react-dom vite
npm install axios
```
These are used for:
- `react`, `react-dom` – React core
- `vite` – fast dev server
- `axios` – HTTP requests
- TypeScript and its types

</details>

---

## ✅ Final Tip

Now your updated flow will look like this:
- git clone ...
- cd into directory
- Follow backend + frontend setup

---

📦 Installed NPM Packages
<Backend packages list> <Frontend packages list> 

---

## ⚙️ Prerequisites

> Install the following **before running** the project.

### 🧱 Backend

- **Node.js** (v18+ recommended)
- **Python 3.8+**
- **Anaconda or virtualenv** (optional but recommended)
- **Groq API Key** (from [Groq](https://console.groq.com))
- **Install `ts-node` & TypeScript globally (optional)**

```bash
npm install -g ts-node typescript
```

### Frontend

- Node.js and NPM

---

## 🛠️ Backend Setup
1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up Python environment & install required packages:
```bash
cd services
pip install -r requirements.txt
```
✅ requirements.txt content if needed:
```nginx
joblib
scikit-learn
langchain
langchain-groq
python-dotenv
```

4. Create `.env` in `backend/services/` directory:
```env
GROQ_API_KEY=your_groq_api_key_here
```

5. Run the server:
```bash
cd ..
npx ts-node app.ts
```
The server will start at: (http://localhost:3001)

---

## 🖥️ Frontend Setup
1. Navigate to `frontend` folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend:
```bash
npm run dev
```
Open browser at: (http://localhost:5173)

---

## 💬 Example Chat Prompt
In the UI, type something like:
```csharp
I want a loan of 30000. My income is 50000 and credit score is 680
```
You’ll receive:
- 🧠 Natural explanation from LangChain + Groq
- 📈 Top 3 lenders with rates and reasons

---

## 🧪 Testing Python Script Directly
You can run the predictor script directly:
```bash
cd backend/services

python predictor.py "{\"message\": \"I want a loan of 30000. My income is 50000 and credit score is 680\"}"
```

---

## 🧠 Model Info
The ML model is trained using logistic regression or decision tree and saved as `match_model.joblib`. It ranks lenders based on:
- Minimum loan amount
- Income
- Credit score
- Employment type

---

## 🌐 Technologies Used
- React + TypeScript
- Node.js + Express.js
- Python + scikit-learn
- LangChain + Groq
- Vite + Axios
- Joblib, JSON, dotenv

---

## 📦 To-Do / Future Improvements
- Add login / auth for users
- Persist chats in a database
- Add lender application form
- Improve extraction with NLP model

---

## 👨‍💻 Author
Built by Mahimi Awwab Sultan.

---

## 🛡️ License
MIT – Use it freely, credit appreciated!

