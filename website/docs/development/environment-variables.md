---
id: environment-variables
title: Environment Variables
sidebar_label: Environment Variables
---

## PROGRESS_BAR

When you want to disable the progress bar you can add `PROGRESS_BAR=false` before you run command. E.g. `PROGRESS_BAR=false yoshi build`.

## DEBUG

If you want to debug things during start without it cleaning the screen every time you can use `DEBUG=true yoshi start`. Using DEBUG will not show progress bar as well.

Read more about [debugging yoshi](./debugging#debug-yoshis-code)
