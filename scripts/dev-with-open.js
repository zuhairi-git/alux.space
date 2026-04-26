#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const nextBin = require.resolve('next/dist/bin/next');
const shouldOpenBrowser = !process.env.CI && process.env.ALUX_OPEN_BROWSER !== '0';

let openedUrl = false;
let bufferedOutput = '';

function openBrowser(url) {
  if (!shouldOpenBrowser || openedUrl) {
    return;
  }

  let command;
  let args;

  if (process.platform === 'win32') {
    command = 'cmd.exe';
    args = ['/c', 'start', '', url];
  } else if (process.platform === 'darwin') {
    command = 'open';
    args = [url];
  } else {
    command = 'xdg-open';
    args = [url];
  }

  const opener = spawn(command, args, {
    detached: true,
    stdio: 'ignore',
  });

  opener.unref();
  openedUrl = true;
  process.stdout.write(`\nOpening ${url}\n`);
}

function tryOpenFromOutput(text) {
  if (openedUrl) {
    return;
  }

  bufferedOutput += text;
  const lines = bufferedOutput.split(/\r?\n/);
  bufferedOutput = lines.pop() ?? '';

  for (const line of lines) {
    const match =
      line.match(/Local:\s*(https?:\/\/\S+)/i) ||
      line.match(/(https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\]):\d+\S*)/i);

    if (match) {
      openBrowser(match[1]);
      break;
    }
  }
}

const child = spawn(process.execPath, [nextBin, 'dev', '--turbopack'], {
  cwd: ROOT,
  env: process.env,
  stdio: ['inherit', 'pipe', 'pipe'],
});

child.stdout.on('data', (chunk) => {
  const text = chunk.toString();
  process.stdout.write(text);
  tryOpenFromOutput(text);
});

child.stderr.on('data', (chunk) => {
  const text = chunk.toString();
  process.stderr.write(text);
  tryOpenFromOutput(text);
});

child.on('error', (error) => {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.on(signal, () => {
    if (!child.killed) {
      child.kill(signal);
    }
  });
}