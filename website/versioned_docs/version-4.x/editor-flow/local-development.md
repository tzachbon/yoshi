---
id: local-development
title: Local Development
sidebar_label: Local Development
---

### Overview

Editor yoshi flow aims to create fastest possible development process for Out of iFrame apps.

We are prodiving Live Reload (HMR feature is in progress...), optimizing the bundle for development purposes, updating with relevant build progress, opening editor and viewer URLs with installed app and overriding bundle paths to be loaded from localhost on production environment.

The main purpose of the local development part to be really small. It shouldn't be an API or required actions. This is just an informative article to explain what's happening after the hood.

### `❯ yoshi-flow-editor start`

This command will do few things:

- Start webpack dev cerver to serve bundles and 'refresh' it when the codebase will be changed. All bundles from `dist` directory will be served via `https://locahost:3200`.
- Start a server to render components for editor side. Since editor renders Out of iFrame apps in iFrame, we should have a way to render it locally. Each component will create own route for Widget and Settings. - Widget URL: `localhost:3000/editor/:componentName` - Settings URL: `localhost:3000/settings/:componentName`
  These URLs could be used for e2e testing or Widget or Settings development without going to editor page.
- Open Editor and Viewer URLs with override query params to trigger a platform load local bundles instead of production one. The only thing you have to do to make it work is to create a blank website and add you Dev Center App here by clicking on `Test Your App` button in Dev Center if your app wasn't submitted yet or Add it via `Add App section` if it was.

![excalidraw-202034141034](https://user-images.githubusercontent.com/1521229/81549570-9c472e00-9387-11ea-846f-d1d0550e3357.png)
The basic concept of URL overrides for production environment
