---
id: overview
title: Structure Overview
sidebar_label: Overview
---

## Basic app structure
After you bootstraped the app via create-yoshi-app, the structure will be similar to:
```
my-app
├── .application.json
├── package.json
└── src
    ├── viewer.app.ts
    ├── editor.app.ts
    ├── assets
    │   └── locales
    │        ├── messages_en.json
    │        └── messages_uk.json
    └── components
        └── MyComponent
            ├── .component.json
            ├── controller.ts
            ├── controller.spec.ts
            ├── Widget
            │   ├── index.ts
            │   ├── Widget.tsx
            │   ├── Widget.spec.ts
            │   ├── Widget.e2e.ts
            │   └── Widget.st.css
            └── Settings
                ├── index.ts
                ├── Settings.tsx
                ├── Settings.spec.ts
                ├── Settings.e2e.ts
                └── Settings.scss
```

Yoshi flow editor requires users to use strictly defined file structure. This allows editor flow to collect controllers, wrap some methods and pass additional helpers as a `flowAPI`.

In next sections, we'll explain usage of extended platform API with editor flow methods and what boilerplate code can be bypassed, since it's already handled in most optimal way behind the scenes.

Editor flow apps structure consist of 2 levels:
- Application level: Configuration files in the project's root and entry points for viewerScript (`viewer.app.ts`) and editorScript (`editor.app.ts`) - files that's running in worker for all components. Located under `src` direcotry.
- Component level: Single components located in `src/components/:componentName` directories. Includes `Widget`, `Settings` panel and `controller`.

