import pandas as pd
import numpy as np
import json
import csv

df =  pd.read_csv("final_project/chicago_crime.csv")



#grouped = df.groupby("Year")

#grouped = df.groupby("Community Area", axis="columns")

#grouped = df.groupby(["Year", "Community Area"])


#counts = grouped.size()


#out = counts.to_dict()


grouped = df.groupby(["Year", "Description"])


counts = grouped.size()
print(counts)


out = counts.to_dict()
##print(out)

result = {}

years = set()
normal_crimes = set()
gun_crimes = set()
for k,v in out.items():
     years.add(k[0])
     if "GUN" in k[1] or "FIREARM" in k[1] or 'HANDGUN' in k[1] or 'RIFLE' in k[1]:
        gun_crimes.add(k[1])
     else:
        normal_crimes.add(k[1])
      
     result[k[0]] = {"Category": "Gun Crimes"},{"Category": "Normal Crimes"}

#print('normal crimes: ' + str(normal_crimes))
#print('gun crimes: ' + str(gun_crimes))


for k,v in out.items():

     if "GUN" in k[1] or "FIREARM" in k[1] or 'HANDGUN' in k[1] or 'RIFLE' in k[1]:
        result[k[0]][0]["Amount"] = result[k[0]][0].get("Amount",0) + v
     else:
        result[k[0]][1]["Amount"] = result[k[0]][1].get("Amount",0) + v
print(result)




with open("final_project/chicago_crime_dscpt.json", "w") as outfile:
     json.dump(result, outfile)
#counts.to_json(r"final_project/chicago_crime.json", orient = 'index')


# race_grouped = df.groupby(["Year", "Community Area", "Race"])
# race_counts = race_grouped.size()
# print(race_counts)




# counts = grouped.size()

df1 =  pd.read_csv("final_project/migration.csv")
grouped1 = df.groupby(["Year"])


counts = grouped1.size()
# print(df1)
# print(counts)
joined = df1.merge(counts.rename('counts'),left_on='Year', right_on='Year')


joined['mig_pct'] = joined['Migration']/(joined['Pop'].astype(int))*100
joined['crime_rate'] = joined['counts']/(joined['Pop'].astype(int))*100
# print(joined)

joined.to_csv('final_project/migration_clean.csv')


 
# def csv_to_json(csv_file_path, json_file_path):
#     #create a dictionary
#     data_dict = {}
 
#     #Step 2
#     #open a csv file handler
#     with open(csv_file_path, encoding = 'utf-8') as csv_file_handler:
#         csv_reader = csv.DictReader(csv_file_handler)
 
#         #convert each row into a dictionary
#         #and add the converted data to the data_variable
 
#         for rows in csv_reader:
 
#             #assuming a column named 'No'
#             #to be the primary key
#             print(rows)
#             key = rows['Year']
#             data_dict[key] = rows
 
#     #open a json file handler and use json.dumps
#     #method to dump the data
#     #Step 3
#     with open(json_file_path, 'w', encoding = 'utf-8') as json_file_handler:
#         #Step 4
#         json_file_handler.write(json.dumps(data_dict, indent = 4))
 
# #driver code
# #be careful while providing the path of the csv file
# #provide the file path relative to your machine
 
# #Step 1
# csv_file_path = 'final_project/CCA.csv'
# json_file_path = 'final_project/CCA.json'
 
# csv_to_json(csv_file_path, json_file_path)
