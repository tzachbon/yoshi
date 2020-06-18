#!/bin/zsh

set -e

# Disable npx progress bar
export TRAVIS=2

GAL_PROMPT_PREFIX='\e[34m✡ \e[0m'

function type() {
  printf $GAL_PROMPT_PREFIX
  echo $* | pv -qL $[10+(-2 + RANDOM%5)]
}

type 'npx create-yoshi-app testapp'
npx create-yoshi-app testapp

type 'cd testapp'
cd testapp

type 'npm start'
npm start

sleep 2
echo ""
