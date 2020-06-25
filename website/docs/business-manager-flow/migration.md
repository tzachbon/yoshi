---
id: migration
title: Migration Guide
sidebar_label: Migration Guide
---

This guide will help you migrate your existing Business-Manager applications written using Legacy or App Flows, to the new Business-Manager Flow! 🤝

## Getting Started

Start with a clean git tree, preferably in a branch working towards a migration PR with nothing but the migration.

Remove all `node_modules` and lock files to ensure everything would be installed as expected.

```shell script
rm -rf node_modules package-lock.json yarn.lock
```

## Installation

Remove `yoshi`:

```shell script
npm rm yoshi
```

Install `yoshi-flow-bm` (in `devDependencies`) & `yoshi-flow-bm-runtime` (in `dependencies`):

```shell script
npm install -D yoshi-flow-bm
npm install yoshi-flow-bm-runtime
```

Then, replace `yoshi` cli usages with `yoshi-bm` in `package.json`:

```diff json
{
  "scripts": {
-   "start": "yoshi start",
-   "build": "yoshi build",
-   "test": "yoshi test",
-   "lint": "yoshi lint",
-   "posttest": "npm run lint"
+   "start": "yoshi-bm start",
+   "build": "yoshi-bm build",
+   "test": "yoshi-bm test",
+   "lint": "yoshi-bm lint",
+   "posttest": "npm run lint"
  },
  "devDependencies": {
-   "yoshi": "^4.0.0"
+   "yoshi-flow-bm": "^4.0.0"
  },
  "dependencies": {
+   "yoshi-flow-bm-runtime": "^4.0.0"
  }
}
```

## Configuration

The BM Flow tries to minimize configuration whenever possible simply by being aware of the BM platform, along with using filesystem conventions over configuration.

Remove your `yoshi.config.js` file or the `yoshi` configuration section in your `package.json`:

```diff json
{
- "yoshi": {
-   "projectType": "app",
-   "yoshiServer": true,
-   "entry": {
-     "module": "./module",
-     "...": "..."
-   },
-   "externals": {
-     "react": "React",
-     "react-dom": "ReactDOM",
-     "react-addons-css-transition-group": "React.addons.CSSTransitionGroup",
-     "lodash": "_",
-     "urijs": "URI",
-     "@wix/business-manager-api": "BusinessManagerAPI",
-     "react-module-container": "reactModuleContainer"
-   }
- }
}
```

## `BusinessManagerModule` bundle

The BM Flow generates the module bundle which will register all your pages, components & methods for you!

Create a `.module.json` file:

## Page Components

## Exported Components

## Methods

# Single GAable

# Multiple GAables

> For more context: https://github.com/wix/yoshi/issues/2527

The `legacyBundle` option is available to ease migration into separating separate GAables into separate `BusinessManagerModule` bundles.
