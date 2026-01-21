import json
import sys


TEAM = sys.argv[1] # e.g. "Team Red"
MILESTONE_INDEX = int(sys.argv[2]) # 0-based index


with open('flags.json') as f:
    data = json.load(f)


if TEAM not in data['teams']:
    raise ValueError('Unknown team')


flags = data['teams'][TEAM]['flags']


if flags[MILESTONE_INDEX]:
    print('Flag already set')
    sys.exit(0)


flags[MILESTONE_INDEX] = True


with open('flags.json', 'w') as f:
    json.dump(data, f, indent=2)


print(f"✅ Flag set for {TEAM}, milestone {MILESTONE_INDEX}")
print("Remember to commit and push changes")