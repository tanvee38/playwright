/**
 * Copyright Microsoft Corporation. All rights reserved.
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

const os = require('os');
const path = require('path');
const { valueFromEnv } = require('./utils');

const platform = process.env.REPORT_ONLY_PLATFORM || os.platform();
const browserName = process.env.BROWSER || 'chromium';

const testOptions = {};
testOptions.MAC = platform === 'darwin';
testOptions.LINUX = platform === 'linux';
testOptions.WIN = platform === 'win32';
testOptions.CHROMIUM = browserName === 'chromium';
testOptions.FFOX = browserName === 'firefox';
testOptions.WEBKIT = browserName === 'webkit';
testOptions.USES_HOOKS = process.env.PWCHANNEL === 'wire';
testOptions.CHANNEL = process.env.PWCHANNEL !== 'none';
testOptions.HEADLESS = !!valueFromEnv('HEADLESS', true);
testOptions.ASSETS_DIR = path.join(__dirname, '..', 'assets');
testOptions.GOLDEN_DIR = path.join(__dirname, '..', 'golden-' + browserName);
testOptions.OUTPUT_DIR = path.join(__dirname, '..', 'output-' + browserName);

module.exports = testOptions;
