#!/usr/bin/env node

// This is semi automatic script to create create-yoshi-app script.
//
// Install following scripts (e.g using brew before runnings this script)
//
// asciinema
// pv
//
// Install svg-term using `npm install -g svg-term`.
//
// Then you can run `./screencast.js`. You will need to select options in
// `create-yoshi-app` - this part is not automated. As well you will need to
// kill yoshi server using ctrl-c. After that this script will process created
// `.cast` file and create svg file.

const fs = require('fs');
const path = require('path');
const execa = require('execa');
const tempy = require('tempy');

main();

function main() {
  const previous = process.cwd();
  const cwd = tempy.directory();

  const cast = path.join(cwd, 'screencast.cast');
  const script = path.join(__dirname, 'screencast.sh');
  const out = path.join(previous, 'screencast.svg');

  const npmInstallLine = (l) =>
    l.indexOf(
      'Running \\u001b[35mnpm install\\u001b[39m, that might take a few minutes...',
    ) > -1;
  const lintLine = (l) =>
    l.indexOf('Running \\u001b[35mnpm run lint -- --fix\\u001b[39m') > -1;

  const startDevLine = (l) =>
    l.indexOf('Starting development environment...') > -1;
  const serveLine = (l) =>
    l.indexOf('Your bundles and other static assets are served from your') > -1;

  try {
    process.chdir(cwd);
    console.log(`Recording screencast ...`);
    execa.sync('asciinema', ['rec', '--command', `${script}`, cast], {
      cwd,
      stdio: 'inherit',
    });

    console.log('Cleaning data ...');
    const data = fs.readFileSync(cast).toString().split('\n');

    cut(data, { start: npmInstallLine, end: lintLine });
    cut(data, { start: startDevLine, end: serveLine });
    replace(data, [{ in: cwd, out: '~' }]);
    adjustTiming(data);

    fs.writeFileSync(cast, data.join('\n'));

    console.log('Rendering SVG ...');
    execa.sync('svg-term', [
      '--window',
      '--in',
      cast,
      '--width=80',
      '--height=24',
      '--out',
      out,
    ]);

    console.log(`Recorded screencast to ${cast}`);
    console.log(`Rendered SVG to ${out}`);
  } catch (err) {
    throw err;
  } finally {
    process.chdir(previous);
  }
}

function cut(frames, { start, end }) {
  const si = frames.findIndex((l) => start(l));
  const ei = frames.findIndex((l) => end(l));

  if (si === -1 || ei === -1) {
    return;
  }

  frames.splice(si + 1, ei - si - 1);
}

function replace(frames, replacements) {
  for (let index = 1; index < frames.length; index++) {
    for (const r of replacements) {
      frames[index] = frames[index].split(r.in).join(r.out);
    }
  }
}

function adjustTiming(frames) {
  let prevTiming = 0;
  let diff = 0;
  for (let index = 1; index < frames.length; index++) {
    if (frames[index].length === 0) {
      continue;
    }

    const data = JSON.parse(frames[index]);

    if (data[0] - prevTiming > 2) {
      diff += data[0] - prevTiming - 2;
    }

    prevTiming = data[0];
    data[0] -= diff;

    frames[index] = JSON.stringify(data);
  }
}
