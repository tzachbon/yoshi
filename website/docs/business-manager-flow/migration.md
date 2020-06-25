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

Use `yoshi-flow-bm` types instead of yoshi's:

`tsconfig.json`:

```diff json
{
  "files": [
-   "./node_modules/yoshi/types.d.ts"
+   "./node_modules/yoshi-flow-bm/types.d.ts"
  ]
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
So feel free to just remove your previous `module` (or other) entry altogether! :)

If your `moduleId` differs from our default one and/or your bundle wasn't previously named `module.bundle.js`, you can create a `.module.json` file to override those:

```json
{
  "moduleId": "YOUR_MODULE_ID",
  "moduleBundleName": "my-module" // my-module.bundle.js
}
```

## Page Components

We automatically create & register (inside your module bundle) lazy wrappers of your page components that are in `src/pages`.

Move your page component's definitions to the `src/pages` dir, in a path according to the route this page component will be rendered in.

For example, a page component in `src/components/FooPage.tsx` on route `/foo/bar` can be moved to:

```tsx
// src/pages/foo/bar.tsx
import { FC } from "react";
import { useModuleParams } from "yoshi-flow-bm-runtime";

const FooPage: FC = () => {
  const moduleParams = useModuleParams();

  return <div>Foo! {moduleParams.metaSiteId}</div>;
};

export default FooPage;
```

> **Note:** We provide `moduleParams` through Context, rather than at the top of your React tree.

By default, your page is gonna get a default `componentId` & `componentName`.
To override those, create a neighboring `.json` file:

```json
// src/pages/foo/bar.json
{
  "componentId": "foo-bar-page-component-id",
  "componentName": "foo-bar-page-component-name"
}
```

## Exported Components

Very similar to page components, but in `src/exported-components` and there's no significance (other than the default `componentId`) to the relative path inside `src/exported-components`:
Move your existing exported components to `src/exported-components`

```tsx
// src/exported-components/modals/FooModal.tsx
import { FC } from "react";

const FooModal: FC = () => {
  return <div>I should be a modal!</div>;
};

export default FooModal;
```

> **Note I:**

> **Note II:** Exported Components are wrapped with all the same contexts, so `moduleParams` are also available using `useModuleParams`.

If needed, the `componentId` can be overridden:

```json
// src/exported-components/modals/FooModal.json
{
  "componentId": "foo-modal-component-id"
}
```

## Methods

Move existing methods to their own file in `src/methods`:

```typescript
// src/methods/myMethod.ts

export default () => {
  //
};
```

Similar to pages & exported-components, the `methodId` can also be overridden:

```json
// src/methods/myMethod.json
{
  "methodId": "my-method-id"
}
```

## Feedback

As the BM Flow is in its early stages, we'd love your feedback, positive & negative!
GitHub issues are more than welcome and as always, we're here to help over @ [#yoshi](https://wix.slack.com/archives/CAL591CDV).

# Multiple GAables

> For more context: https://github.com/wix/yoshi/issues/2527

The `legacyBundle` option is available to ease migration into separating GAables into separate `BusinessManagerModule` bundles.
