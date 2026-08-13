#!/usr/bin/env bash
# Sync DevThing plugin sources from the repo root into the wiki plugin folder.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PLUGIN="$ROOT/wiki/plugins/devthing"

rm -rf "$PLUGIN"
mkdir -p "$PLUGIN"

cp "$ROOT/plugin.info" "$PLUGIN/"
cp "$ROOT/plugin.js" "$PLUGIN/"
cp "$ROOT"/*.js "$PLUGIN/"
cp -r "$ROOT/ui" "$ROOT/theme" "$PLUGIN/"

echo "Synced DevThing plugin to $PLUGIN"
