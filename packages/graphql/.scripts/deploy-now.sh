#!/bin/bash

set -ex

# ENV Variables, Note: ACCESS_TOKEN and NOW_TOKEN in gitlab-ci
ORIGIN='*'
# NOW config
TEAM=$NOW_TEAM
PROJECT=$NOW_PROJECT
ALIAS=$NOW_ALIAS

export PATH="./node_modules/.bin:$PATH"
# 1. Wait for deployment ready
URL=$(now --dotenv .env --public --token "$NOW_TOKEN" --team $TEAM --name $PROJECT)
# now ls --token "$NOW_TOKEN" --team $TEAM
now scale "$ALIAS" --token "$NOW_TOKEN" --team $TEAM 1 || true
# 2. Alias
now alias set "$URL" "$ALIAS" --token "$NOW_TOKEN" --team $TEAM

# 3. Purge old services
now remove --yes --safe --token "$NOW_TOKEN" --team $TEAM $PROJECT  || true

# 4. Scale to 1
now scale "$ALIAS" --token "$NOW_TOKEN" --team $TEAM 10 || true

# 5. Log results
# now ls --token "$NOW_TOKEN" --team $TEAM
# now alias ls --token "$NOW_TOKEN" --team $TEAM

