#!/usr/bin/env bash
set -euo pipefail

# Merge helper to support YOLO and normal merges.
# Usage:
#   scripts/devkit-merge.sh yolo <pr-number>
#   scripts/devkit-merge.sh normal <pr-number>

mode=${1:-}
pr=${2:-}

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI not installed. Install GitHub CLI to use this script." >&2
  exit 1
fi

case "$mode" in
  yolo)
    gh pr merge "$pr" --merge --admin --delete-branch --subject "YOLO merge"
    ;;
  normal)
    gh pr merge "$pr" --merge --delete-branch
    ;;
  *)
    echo "Usage: scripts/devkit-merge.sh {yolo|normal} <pr-number>" >&2
    exit 1
    ;;
esac

