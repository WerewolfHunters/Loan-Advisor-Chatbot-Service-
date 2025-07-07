import json
import random
import joblib
from sklearn.tree import DecisionTreeClassifier

lenders = json.load(open('lenders.json'))
data = []
labels = []
for lender in lenders:
    for _ in range(100):
        amt = random.randint(lender['minLoanAmount'], lender['maxLoanAmount'])
        income = random.randint(lender['minIncome'], lender['minIncome'] + 50000)
        credit = random.randint(lender['minCreditScore'], 850)
        data.append([amt, income, credit])
        labels.append(lenders.index(lender))

clf = DecisionTreeClassifier()
clf.fit(data, labels)
joblib.dump(clf, 'match_model.joblib')