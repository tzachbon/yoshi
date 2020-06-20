---
id: environment-variables
title: Environment Variables
sidebar_label: Environment Variables
---

## PROGRESS_BAR

When you want to disable the progress bar you can add `PROGRESS_BAR=false` before you run command. E.g.

```
PROGRESS_BAR=false yoshi build
```

## DEBUG

If you want to debug things during start without it cleaning the screen every time this mode is for you. Using `DEBUG` will disable the progress bar as well.

```
DEBUG=true yoshi start
```

Read more about [debugging yoshi](./debugging#debug-yoshis-code)

## PROFILE

Launches the build profiler that shows how much time was invested in a task of the build. For example, if you want to know how long does it takes to process `css` files or if `babel-loader` was the bottle-neck of the build.

In the end of the compilation you'll be presented with a table that shows that information.

```
PROFILE=true yoshi build
```
