#!/bin/bash

# -------------------------------
# HKNC Today / Site Update Script
# -------------------------------

clear
echo "========================================"
echo "        Website Update Assistant        "
echo "========================================"
echo ""

# Question 1
read -p "Have you made all necessary changes and added all necessary files? (Y/N): " confirm_changes

case "$confirm_changes" in
  [Yy]) ;;
  [Nn])
    echo ""
    echo "Update cancelled. Closing."
    exit 0
    ;;
  *)
    echo ""
    echo "Invalid input. Please run the script again and enter Y or N."
    exit 1
    ;;
esac

echo ""

# Question 2
read -p "Are you ready to update the site? (Y/N): " confirm_update

case "$confirm_update" in
  [Yy]) ;;
  [Nn])
    echo ""
    echo "Update cancelled. Closing."
    exit 0
    ;;
  *)
    echo ""
    echo "Invalid input. Please run the script again and enter Y or N."
    exit 1
    ;;
esac

echo ""
echo "Checking git status..."
echo "----------------------------------------"
git status
echo "----------------------------------------"
echo ""

# Ask for commit message
read -p "Enter your commit message: " commit_message

if [ -z "$commit_message" ]; then
  echo ""
  echo "Commit message cannot be empty. Closing."
  exit 1
fi

echo ""
echo "Adding all changes..."
git add .

if [ $? -ne 0 ]; then
  echo ""
  echo "git add failed. Closing."
  exit 1
fi

echo ""
echo "Creating commit..."
git commit -m "$commit_message"

commit_exit_code=$?

# If nothing to commit, allow push attempt anyway
if [ $commit_exit_code -ne 0 ]; then
  echo ""
  echo "git commit may have failed or there may be nothing new to commit."
  read -p "Do you still want to try pushing to origin main? (Y/N): " push_anyway

  case "$push_anyway" in
    [Yy]) ;;
    [Nn])
      echo ""
      echo "Push cancelled. Closing."
      exit 0
      ;;
    *)
      echo ""
      echo "Invalid input. Closing."
      exit 1
      ;;
  esac
fi

echo ""
echo "Pushing to origin main..."
git push origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "========================================"
  echo " Site update completed successfully."
  echo "========================================"
else
  echo ""
  echo "========================================"
  echo " Push failed. Review the git output above."
  echo "========================================"
  exit 1
fi

echo ""
read -p "Press Enter to close..."