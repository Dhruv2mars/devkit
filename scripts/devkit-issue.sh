#!/usr/bin/env bash
set -euo pipefail

# Quickdraw helper: open then close an issue quickly via gh.
# Usage: scripts/devkit-issue.sh "Title" "Body text"

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI not installed. Install GitHub CLI to use this script." >&2
  exit 1
fi

title=${1:?"Title required"}
body=${2:-"Auto-created for Quickdraw"}

num=$(gh issue create --title "$title" --body "$body" --json number -q .number)
echo "Opened issue #$num"
gh issue close "$num" --comment "Closing for Quickdraw progress"
echo "Closed issue #$num"

