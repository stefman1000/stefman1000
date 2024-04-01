import pandas as pd
import numpy as np
import json
import csv

df =  pd.read_json("final_project/fox_data.json")

Chicago = df[df['description'].str.contains("Chicago", na=False)]

NYC = df[df['description'].str.contains("New York City", na=False)]

LA = df[df['description'].str.contains("Los Angeles", na=False)]


print(Chicago)
print(NYC)
print(LA)

out = pd.DataFrame()
out["City"] = ["Chicago", "NYC", "LA"]
out["Amount"] = [len(Chicago), len(NYC), len(LA)]
out["Pop"] = [2.70, 8.47, 3.89]
print(out)

out.to_csv("final_project/fox_data.csv")

