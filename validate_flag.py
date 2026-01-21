import json
import sys
from datetime import datetime

TEAM = sys.argv[1]  # e.g. "Team Red"
MILESTONE_INDEX = int(sys.argv[2])  # 0-based index

with open('flags.json') as f:
    data = json.load(f)

if TEAM not in data["teams"]:
    raise ValueError("Unknown team")

flags = data['teams'][TEAM]['flags']

if flags[MILESTONE_INDEX]["completed"]:
    print('Flag already set')
    sys.exit(0)

flags[MILESTONE_INDEX]["completed"] = True
flags[MILESTONE_INDEX]["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

with open('flags.json', 'w') as f:
    json.dump(data, f, indent=2)

print(
    f"✅ Flag set for {TEAM}, milestone {MILESTONE_INDEX} at {flags[MILESTONE_INDEX]['timestamp']}"
)
print("Remember to commit and push changes")