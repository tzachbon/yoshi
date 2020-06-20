---
id: migration-guide
title: Migration from Legacy Flow
sidebar_label: Migration Guide
---

### Start from a clean slate

Commit your current changes and open a new branch so we'll be ready to create a PR that includes the migration and nothing else.

Remove all node_modules and lock files to ensure everything would be installed as expected

```
rm -rf node_modules package-lock.json yarn.lock
```

### Remove yoshi and install the library flow instead

```
npm rm yoshi
```

```
npm i yoshi-flow-library --save-dev
```

You should see something like this in your `package.json`

```diff
- "yoshi": "^4.0.0"
+ "yoshi-flow-library": "^4.0.0"
```

### Replace `package.json` scripts

Since the library flow has its own `bin` file we'll need to replace it in our `npm scripts`, you should see something that looks like that:

```diff
-"build": ":",
-"start": "yoshi start",
-"test": "yoshi test",
-"pretest": "yoshi build",
-"posttest": "yoshi lint",
+"build": "yoshi-library build",
+"start": "yoshi-library start",
+"test": "yoshi-library test",
+"lint": "yoshi-library lint",
+"posttest": "npm run lint",
```

### If you output a bundle, update your configuration

Creating a `umd` bundle just got easier, see this [configuration](library-flow/configuration.md#bundle) and verify that you're using `yoshiFlowLibrary.bundle` option.

### Install TypeScript if needed

The new library flow requires TypeScript (this is why) it will prompt you to install typescript as a dependency in case it's not the case, but you can do it in advance:

```
npm install -D typescript
```

Until [yoshi will be able to do that for you](https://github.com/wix/yoshi/issues/2562) run the following command to generate `tsconfig.json`

```
npx tsc --init
```

In case you don't have any `ts` file in your project, add the [`allowJs: true`](https://www.typescriptlang.org/v2/en/tsconfig#allowJs) option to your `tsconfig.json`.

### Verify that all of the source files are located in the `src` directory

If you have files in `lib` or anywhere else, move them to be under `src` which is the `rootDir` configured in the `tsconfig.json`. This also includes the tests.

See [this example](https://github.com/wix/yoshi/tree/master/packages/create-yoshi-app/templates/flow-library/typescript/src) from the template used to generate new projects.

### Run the build command

The build command will verify that everything was configured properly and will also validate & modify your `tsconfig.json` file.

### Verify `main`, `module` & `types` properties in `package.json`

Those properties are the files that will be loaded when `NodeJS`/`Webpack`/`TypeScript` will see an import/require to your module, those files should be located in your `dist` directory, while this example show `index.js`/`index.d.ts` in your case the entry file could be different.

```diff
+ "main": "dist/cjs/index.js",
+ "module": "dist/esm/index.js",
+ "types": "dist/types/index.d.ts",
```

Read more about the [output of the library flow](library-flow/overview.md#what-build-command-produces)

### Verify that the tests are passing and that development mode is working

This is a sanity test to verify that everything works as expected

```
npm start
```

```
npm test
```

### Make sure the `dist` directory will be published to `npm`

[This configuration](https://docs.npmjs.com/files/package.json#files) is important so the files will end up in `npm`. This is the minimum required configuration:

```diff
+ "files": [
+   "dist"
+ ],
```

### Verify updated version bump strategy

yoshi-flow-library doesn't support the `release` command, as well as [other new yoshi versions](https://github.com/wix/yoshi/pull/2069), instead, you can have a [versionBumpStrategy](https://github.com/wix-private/wix-fed-scripts/pull/37).

The needed change would look something like this:

```diff
"scripts": {
-   "release": "yoshi release"
  },
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
+   "versionBumpStrategy": "patch"
  },
```

### Commit your changes and create a PR

That's it. 💫 You're ready to use the new library flow!

☎️ Please let us know on `#yoshi` slack channel if the migration passed succesfully, and feel free to modify this article in case you've faced an issue that wasn't documentated here.
