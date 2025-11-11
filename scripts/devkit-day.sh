#!/usr/bin/env bash
set -euo pipefail

# DevKit daily helper: branch, commit, push, PR.
# Usage:
#   scripts/devkit-day.sh start "json-formatter"
#   scripts/devkit-day.sh commit "feat(json): add pretty/minify" [--pair]
#   scripts/devkit-day.sh push
#   scripts/devkit-day.sh pr "JSON + Base64 tools"
#   scripts/devkit-day.sh merge-dev "feature/json-formatter"  # merges feature -> dev (no-ff)

CO_AUTHOR="Co-authored-by: Dhruv3mars <Dhruv3mars@users.noreply.github.com>"

cmd=${1:-}
shift || true

ensure_dev_branch() {
  if ! git rev-parse --verify dev >/dev/null 2>&1; then
    echo "Creating dev branch from current HEAD" >&2
    git branch dev
  fi
}

case "$cmd" in
  start)
    name=${1:?"feature name required"}
    branch="feature/${name}"
    ensure_dev_branch
    if git rev-parse --verify "$branch" >/dev/null 2>&1; then
      git checkout "$branch"
    else
      git checkout -b "$branch"
    fi
    ;;

  commit)
    msg=${1:?"commit message required"}
    pair=${2:-}
    git add -A
    if [[ "$pair" == "--pair" ]]; then
      git commit -m "$msg" -m "$CO_AUTHOR"
    else
      git commit -m "$msg"
    fi
    ;;

  push)
    git push -u origin HEAD
    ;;

  pr)
    title=${1:-"Update"}
    if command -v gh >/dev/null 2>&1; then
      # PR from current branch into dev
      gh pr create --base dev --title "$title" --body "Automated by devkit-day.sh"
    else
      echo "gh CLI not installed. Create PR manually targeting dev." >&2
    fi
    ;;

  merge-dev)
    feature_branch=${1:?"feature branch required"}
    ensure_dev_branch
    current=$(git rev-parse --abbrev-ref HEAD)
    git checkout dev
    git merge --no-ff "$feature_branch" -m "merge: ${feature_branch} into dev"
    git push origin dev
    git checkout "$current"
    ;;

  *)
    cat <<EOF
DevKit helper
Commands:
  start <name>               Create/switch to feature/<name>
  commit <msg> [--pair]      Commit all changes (optional co-author)
  push                       Push current branch
  pr <title>                 Open PR to dev (uses gh if available)
  merge-dev <feature>        Merge feature/<...> into dev (no-ff)
EOF
    ;;
esac

