# import sys
# import json
# import joblib
# import os
# from matchModel import get_top_lenders
# from dotenv import load_dotenv

# from langchain_core.prompts import ChatPromptTemplate
# from langchain_groq import ChatGroq

# load_dotenv()

# # Load model and user input
# user_input = json.loads(sys.argv[1])

# # Get full path to the joblib file
# model_path = os.path.join(os.path.dirname(__file__), 'match_model.joblib')
# model = joblib.load(model_path)

# # Prepare features (simplified for 3 inputs)
# data_point = [user_input['loanAmount'], user_input['income'], user_input['creditScore']]
# scores = model.predict_proba([data_point])[0]
# top_lenders = get_top_lenders(scores)

# # Reasoning prompt for LangChain
# prompt = ChatPromptTemplate.from_messages([
#     ("system", "You are an AI loan assistant that explains why a borrower matches with lenders."),
#     ("user", "Given this input: {user_input} and these top lenders: {lenders}, explain the match.")
# ])

# chat = ChatGroq(
#     temperature=0.3,
#     groq_api_key=os.environ.get("GROQ_API_KEY"),
#     model_name="llama3-8b-8192"
# )

# chain = prompt | chat
# explanation = chain.invoke({
#     "user_input": user_input,
#     "lenders": top_lenders
# })

# print(json.dumps({
#     "reply": explanation.content,
#     "topLenders": top_lenders
# }))
# -----------------------------------------------------------------------
import sys
import json
import joblib
import os
import re
from dotenv import load_dotenv
from matchModel import get_top_lenders

from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq

load_dotenv()

# Step 1: Load raw user message
user_data = json.loads(sys.argv[1])
raw_text = user_data.get("message", "")

# Step 2: Try extracting info using LangChain Groq
extraction_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are an intelligent assistant. Extract the following fields from the user's message: "
        "loanAmount, income, and creditScore. Return strictly as JSON like this:\n"
        '{{"loanAmount": 25000, "income": 50000, "creditScore": 700}}'
    ),
    ("user", "{input}")
])

chat = ChatGroq(
    temperature=0.3,
    groq_api_key=os.environ.get("GROQ_API_KEY"),
    model_name="llama3-8b-8192"
)

extraction_chain = extraction_prompt | chat

try:
    structured_response = extraction_chain.invoke({ "input": raw_text })
    structured_input = json.loads(structured_response.content)
except Exception as e:
    # Fallback: use regex to extract numbers
    match = re.search(r'loan.*?(\d+).*?income.*?(\d+).*?credit.*?(\d+)', raw_text, re.IGNORECASE)
    if match:
        structured_input = {
            "loanAmount": int(match.group(1)),
            "income": int(match.group(2)),
            "creditScore": int(match.group(3))
        }
    else:
        print(json.dumps({
            "reply": "Sorry, I couldn't understand your message properly. Please include your loan amount, income, and credit score.",
            "topLenders": []
        }))
        sys.exit(0)

# Step 3: Load model and predict
model_path = os.path.join(os.path.dirname(__file__), 'match_model.joblib')
model = joblib.load(model_path)

data_point = [structured_input['loanAmount'], structured_input['income'], structured_input['creditScore']]
scores = model.predict_proba([data_point])[0]
top_lenders = get_top_lenders(scores)

# Step 4: Generate explanation with Groq
reasoning_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI loan assistant that explains why a borrower matches with lenders."),
    ("user", "Given this input: {user_input} and these top lenders: {lenders}, explain the match.")
])

reasoning_chain = reasoning_prompt | chat

explanation = reasoning_chain.invoke({
    "user_input": structured_input,
    "lenders": top_lenders
})

# Step 5: Return JSON response
print(json.dumps({
    "reply": explanation.content,
    "topLenders": top_lenders
}))

