# Agent Hackathon Dashboard


This dashboard tracks Capture-the-Flag progress for the Agent Hackathon.


## How Flags Are Updated


1. Teams submit milestone evidence in Slack
2. Organizer validates the submission
3. Organizer runs `validate_flag.py`
4. `flags.json` is updated and pushed
5. GitHub Pages updates automatically


## Notes
- This repo is intentionally static and read-only
- No AWS credentials should ever be added
- Dashboard reflects validation state, not raw agent output