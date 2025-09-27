import os
from copy import deepcopy

def print_dict(d):
    for v, k in d.items():
        print(f"{v} : {k}")

def read_tags(dir):
    str = ""
    with open(dir + "/tags.json", "r") as f:
        for line in f:
            str += line
    return eval(str)

directory_tags = []
unique_tags = {"years": [], "title": [], "projects": [], "topics": [], "languages": []}

dirs_list = reversed(sorted(filter(lambda p: os.path.isdir(p), os.listdir("."))))
for d in dirs_list:

    tags = read_tags(d)
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

    s = str(data)
    s = s.replace("'", '"')
    f.write(s)
