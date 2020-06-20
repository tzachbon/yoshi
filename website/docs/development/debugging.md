---
id: debugging
title: Debugging
sidebar_label: Debugging
---

## Debug client side code

Run the following command and open devtools on your browser.

```
yoshi start
```

You can run the following command in case you want to debug your production bundle:

```
yoshi start --production
```

## Debug server side code

Run the following command and yoshi will run your development app server with a [node inspector](https://nodejs.org/en/docs/guides/debugging-getting-started/#enable-inspector)

```
yoshi start --debug
```

Using the following command the server process won't start until a debugger will be attached.

```
yoshi start --debug-brk
```

Make sure to configure one of the [inspector clients](#inspector-clients) and you'll debug in no time.

> You can configure the default inspector port by: `--debug=XXXX` / `--debug-brk=XXXX` (default: 9229)

## Debug tests code

Same as for `yoshi start` but for the test runner (`jest`/`mocha`) instead of the app server process.

```
yoshi test --debug
```

or

```
yoshi test --debug-brk
```

Make sure to configure one of the [inspector clients](#inspector-clients) and you'll debug in no time.

> You can configure the default inspector port by: `--debug=XXXX` / `--debug-brk=XXXX` (default: 9229)

### Debugging Puppeteer E2E tests

Set `devtools: true` in `jest-yoshi.config`

#### Watch mode

- Run `yoshi test --watch` to run in watch mode
- Press `d` in the watch menu to activate debug mode

> You don't need to configure `devtools: true` in this mode

#### Add breakpoint in the browser from your test

- In order to add a breakpoint that stops in the browser, add `await debugBrowser();` to your test.

## Debug Yoshi's code

We're using the [debug](https://github.com/visionmedia/debug) package to output verbose logs that would help to debug yoshi internal processes.

Use `DEBUG=yoshi:*` before running a command to opt into the verbose debugging mode.

```
DEBUG=yoshi:* yoshi build
```

## Inspector clients

In order to debug, you need to attach node's inspector to one of the [Inspector Clients](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients). Here are guides for the populer clients in Wix:

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) [55+](https://nodejs.org/en/docs/guides/debugging-getting-started/#chrome-devtools-55)

- **Option 1**: Open `chrome://inspect` in a Chromium-based browser. Click the Configure button and ensure your target host and port are listed.
- **Option 2 - ✅ Recommended**: Install the Chrome Extension NIM (Node Inspector Manager):[https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj](https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj)

#### [Visual Studio Code](https://github.com/microsoft/vscode) [1.10+](https://nodejs.org/en/docs/guides/debugging-getting-started/#visual-studio-code-1-10)

- In the Debug panel, click the settings icon to open `.vscode/launch.json`. Select "Node.js" for initial setup.
- 📌 You must tell vscode the target debugging port, otherwise vscode will try to debug Yoshi's main process in random generated port, so add `"port" : 9229` (or the port you choose)
- Example launch.json -

```json
{
  "name": "Run Tests",
  "type": "node",
  "request": "launch",
  "args": ["test", "--debug-brk"],
  "port": 9229,
  "program": "${workspaceFolder}/node_modules/.bin/yoshi"
}
```

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) [2017.1+ and other JetBrains IDEs](https://nodejs.org/en/docs/guides/debugging-getting-started/#jetbrains-webstorm-2017-1-and-other-jetbrains-ides)

- Create a new Node.js debug configuration
  ![WebStorm > new "Run/Debug configuration" popup](https://user-images.githubusercontent.com/11733036/79953459-8c24e880-8484-11ea-88d3-0438509be11a.png)
- In order to manually tell WebStorm the debugging port, create another configuration, use type 'Attach to Node.js/Chrome'
  ![WebStorm > Attach to Node.js/Chrome](https://user-images.githubusercontent.com/11733036/79953463-8deeac00-8484-11ea-9f0c-d0ac06946bac.png)
- Press debug in order to start the remote debugger configuration then start (without debugging) the 'Node.js' configuration
