/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
require('../base.fixture');

const path = require('path');
const electronName = process.platform === 'win32' ? 'electron.cmd' : 'electron';

const { CHROMIUM } = testOptions;

registerFixture('application', async ({playwright}, test) => {
  const electronPath = path.join(__dirname, '..', '..', 'node_modules', '.bin', electronName);
  const application = await playwright.electron.launch(electronPath, {
    args: [path.join(__dirname, 'testApp.js')],
  });
  try {
    await test(application);
  } finally {
    await application.close();
  }
});

registerFixture('window', async ({application}, test) => {
  const page = await application.newBrowserWindow({ width: 800, height: 600 });
  try {
    await test(page);
  } finally {
    await page.close();
  }
});

it.skip(!CHROMIUM)('should click the button', async({window, server}) => {
  await window.goto(server.PREFIX + '/input/button.html');
  await window.click('button');
  expect(await window.evaluate(() => result)).toBe('Clicked');
});

it.skip(!CHROMIUM)('should check the box', async({window}) => {
  await window.setContent(`<input id='checkbox' type='checkbox'></input>`);
  await window.check('input');
  expect(await window.evaluate(() => checkbox.checked)).toBe(true);
});

it.skip(!CHROMIUM)('should not check the checked box', async({window}) => {
  await window.setContent(`<input id='checkbox' type='checkbox' checked></input>`);
  await window.check('input');
  expect(await window.evaluate(() => checkbox.checked)).toBe(true);
});

it.skip(!CHROMIUM)('should type into a textarea', async({window, server}) => {
  await window.evaluate(() => {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.focus();
  });
  const text = 'Hello world. I am the text that was typed!';
  await window.keyboard.type(text);
  expect(await window.evaluate(() => document.querySelector('textarea').value)).toBe(text);
});
