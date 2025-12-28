import os
from copy import deepcopy

def list_directories():
    years_list = reversed(sorted(filter(lambda p: os.path.isdir(p), os.listdir("."))))
    for y in years_list:
        months_list = reversed(sorted( os.listdir(f"./{y}/")))
        for m in months_list:
            days_list = reversed(sorted(os.listdir(f"./{y}/{m}/")))
            for d in days_list:
                yield f"{y}/{m}/{d}"

def print_dict(d):
    for v, k in d.items():
        print(f"{v} : {k}")

def read_tags(dir):
    str = ""
    with open(dir + "/tags.json", "r") as f:
        for line in f:
            str += line
    return eval(str)

def remove_quotes(l):
    if isinstance(l, str):
        return l.replace('"', r'\"').replace("'", r'\"')
    
    k = list(map(lambda s : s.replace('"', r'\"'), l))
    k = list(map(lambda s : s.replace("'", r'\"'), k))
    return k

directory_tags = []
unique_tags = {"years": [], "title": [], "projects": [], "topics": [], "languages": []}

for d in list_directories():

    tags = read_tags(d)

    tags["title"] = remove_quotes(tags["title"])
    tags["projects"] = remove_quotes(tags["projects"])
    tags["topics"] = remove_quotes(tags["topics"])
    tags["languages"] = remove_quotes(tags["languages"])

    directory_tags += [deepcopy(tags)]

    unique_tags["years"].append(tags["date"][0:4])
    unique_tags["title"].append(tags["title"])
    unique_tags["projects"] += tags["projects"]
    unique_tags["topics"] += tags["topics"]
    unique_tags["languages"] += tags["languages"]

unique_tags["years"] = list(set(unique_tags["years"]))
unique_tags["title"] = list(set(unique_tags["title"]))
unique_tags["projects"] = list(set(unique_tags["projects"]))
unique_tags["topics"] = list(set(unique_tags["topics"]))
unique_tags["languages"] = list(set(unique_tags["languages"]))

with open("manifest.json", "w") as f:
    data = dict([])
    data["directories"] = directory_tags
    data["unique_tags"] = unique_tags

    s = str(data).replace("'", '"').replace("\\\\", "\\")
    f.write(s)
