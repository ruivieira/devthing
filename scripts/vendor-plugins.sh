#!/usr/bin/env bash
# Refresh third-party TiddlyWiki plugins vendored under wiki/plugins/.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="${TMPDIR:-/tmp}/devthing-plugins"

rm -rf "$TMP"
mkdir -p "$TMP"

git clone --depth 1 --recursive https://github.com/kixam/TW5-moment.js.git "$TMP/moment"
git clone --depth 1 https://github.com/efurlanm/mermaid-tw5.git "$TMP/mermaid"
git clone --depth 1 https://github.com/ruivieira/tw5-randompage.git "$TMP/randompage"

rm -rf "$ROOT/wiki/plugins/moment" "$ROOT/wiki/plugins/mermaid-tw5" "$ROOT/wiki/plugins/randompage"
cp -r "$TMP/moment/plugins/moment" "$ROOT/wiki/plugins/moment"
cp -r "$TMP/mermaid/mermaid-tw5/plugins/mermaid-tw5" "$ROOT/wiki/plugins/mermaid-tw5"
cp -r "$TMP/randompage" "$ROOT/wiki/plugins/randompage"
rm -rf "$ROOT/wiki/plugins/randompage/.git"
rm -f "$ROOT/wiki/plugins/randompage/LICENSE" \
  "$ROOT/wiki/plugins/randompage/README.md" \
  "$ROOT/wiki/plugins/randompage/.gitignore"

echo "Updated wiki/plugins/moment, wiki/plugins/mermaid-tw5, and wiki/plugins/randompage"
