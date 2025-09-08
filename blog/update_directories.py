import os

data = dict([])
data["directories"] = []
for d in filter(lambda p: os.path.isdir(p), os.listdir(".")):
    data["directories"].append(d)

with open("manifest.json", "w") as f:
    s = str(data)
    s = s.replace("'", "\"")
    f.write(s)
