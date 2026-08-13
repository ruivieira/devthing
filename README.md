# devthing

[![CI](https://github.com/ruivieira/devthing/actions/workflows/ci.yml/badge.svg)](https://github.com/ruivieira/devthing/actions/workflows/ci.yml)
[![ShellCheck](https://github.com/ruivieira/devthing/actions/workflows/shellcheck.yml/badge.svg)](https://github.com/ruivieira/devthing/actions/workflows/shellcheck.yml)

Welcome to `DevThing`.

`DevThing` is an open source project manager for software development.

It runs 100% in the browser, no server needed, consisting of a **single HTML file**.

`DevThing` development is done in `DevThing` itself.

A live demo can be found at https://ruivieira.srht.site/devthing/.

The documentation **is** the demo.

For a blank start without demo projects and issues, use [`docs/empty.html`](docs/empty.html).

## Features

* Projects
* Sub-projects
* Issue timelines
* Sprints
* Sprint timelines
* Line-ups
* Tasks
* Syntax highlighting
* Diagrams
* Vim key bindings
* Agenda

## Dependency versions

Dependencies are bundled into the HTML at build time (not managed with npm beyond the TiddlyWiki CLI).

| Component | Version |
|-----------|---------|
| TiddlyWiki core | 5.4.1 |
| CodeMirror plugins | 5.4.1 |
| highlight.js plugin | 5.4.1 |
| kixam/moment | 2.30.1 |
| kixam/timeline | 0.8.1 |
| orange/mermaid-tw5 | 0.3.8 (Mermaid 9.3.0) |
| telmiger/HarveyBalls | 0.1.0 |
| ruivieira/devthing | 0.0.8 |
| ruivieira/randompage | 0.0.1 |
| tiddlywiki/hammerjs (bundled plugin) | 5.1.21-prerelease |

Upgrade dependencies by updating the vendored plugins under [`wiki/plugins/`](wiki/plugins/) and rebuilding.

## Creating an empty DevThing

| Audience | Steps |
|----------|-------|
| **Download** | Open [`docs/empty.html`](docs/empty.html) in a browser |
| **Build from source** | `npm install && npm run build:empty` |
| **Manual (legacy)** | Open the demo `docs/index.html`, delete all user tiddlers (everything except `$:/…` system tiddlers), clear `$:/DefaultTiddlers`, and save |

## Development

Plugin sources live in this repository (`*.js`, `ui/`, `theme/`). The wiki build layout is under [`wiki/`](wiki/).

```bash
npm install
npm run build          # docs/index.html (demo) + docs/empty.html
npm run build:demo     # demo only
npm run build:empty    # empty only
npm run sync-plugin    # copy plugin sources into wiki/plugins/devthing
```

Demo tiddlers are version-controlled as `.tid` files in [`wiki/tiddlers-demo/`](wiki/tiddlers-demo/).

After changing plugin sources, run `npm run sync-plugin` (or any build target) before rebuilding.
