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
now --target production -A now.$STAGE.json -e STAGE=$STAGE -e ENGINE_TAG=${CIRCLE_BRANCH:-staging} --token "$NOW_TOKEN" --scope $TEAM
# URL=$(now --target $STAGE -e STAGE=$STAGE -e ENGINE_TAG=${CIRCLE_BRANCH:-staging} --token "$NOW_TOKEN" --scope $TEAM)
# 2. Alias
# now alias set "$URL" "$ALIAS" --token "$NOW_TOKEN" --scope $TEAM
# 3. Purge old services
now remove $PROJECT --yes --safe --token "$NOW_TOKEN" --scope $TEAM  || true

# 5. Log results
now ls $PROJECT --token "$NOW_TOKEN" --scope $TEAM || true
