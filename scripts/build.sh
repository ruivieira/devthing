#!/usr/bin/env bash
# Build DevThing single-file HTML wikis (demo and/or empty).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WIKI="$ROOT/wiki"
TIDDLERS="$WIKI/tiddlers"
DEMO="$WIKI/tiddlers-demo"
DOCS="$ROOT/docs"
VARIANT="${1:-all}"

bash "$ROOT/scripts/sync-plugin.sh"

cleanup_demo() {
  for f in "$DEMO"/*.tid; do
    [ -f "$f" ] || continue
    rm -f "$TIDDLERS/$(basename "$f")"
  done
}

build_variant() {
  local variant="$1"
  local output="$2"

  cleanup_demo

  if [ "$variant" = "demo" ]; then
    cp "$DEMO"/*.tid "$TIDDLERS/"
    cp "$WIKI/config/DefaultTiddlers.demo.tid" "$TIDDLERS/\$__DefaultTiddlers.tid"
  else
    cp "$WIKI/config/DefaultTiddlers.empty.tid" "$TIDDLERS/\$__DefaultTiddlers.tid"
    cp "$WIKI/config/StoryList.empty.tid" "$TIDDLERS/\$__StoryList.tid"
  fi

  if [ "$variant" = "empty" ]; then
    output="empty"
  fi

  mkdir -p "$DOCS"
  npx tiddlywiki "$WIKI" --output "$DOCS" --build "$output"

  if [ "$variant" = "demo" ]; then
    echo "Built $DOCS/index.html"
  else
    echo "Built $DOCS/empty.html"
  fi

  cleanup_demo
}

case "$VARIANT" in
  demo)
    build_variant demo index
    ;;
  empty)
    build_variant empty index
    ;;
  all)
    build_variant demo index
    build_variant empty index
    ;;
  *)
    echo "Usage: $0 [demo|empty|all]" >&2
    exit 1
    ;;
esac
