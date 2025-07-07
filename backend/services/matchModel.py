import json
import os

def get_top_lenders(scores):
    # ✅ Get correct path to lenders.json
    base_dir = os.path.dirname(__file__)
    lenders_path = os.path.join(base_dir, 'lenders.json')
    lenders = json.load(open(lenders_path))
    top_indexes = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:3]
    return [
        {
            "name": lenders[i]['name'],
            "interestRate": lenders[i]['interestRate'],
            "reason": "Matches loan amount, income, credit score"
        } for i in top_indexes
    ]