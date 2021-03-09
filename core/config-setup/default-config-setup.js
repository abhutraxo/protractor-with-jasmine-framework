'use strict';
const path = require('path');
const browserList = require('./browser-list.js');
const setupUtilities = require('./setup-utilities');
const { getParam, toBoolean } = setupUtilities;
const {
  MAX_INSTANCES,
  HEADLESS_BROWSER,
  SOFT_ASSERTIONS,
  BROWSERSTACK_USERNAME,
  SELENIUM_URL,
  LANGUAGE,
  BROWSERSTACK_ACCESS_KEY,
  BROWSERSTACK_LOCAL,
  BROWSERSTACK_BUILD,
  ENABLE_VERBOSE_LOGGING,
  BROWSERSTACK_LOCAL_IDENTIFIER,
  TESTRAIL_PROJECT_ID,
  TESTRAIL_MILESTONE_NAME,
  VERSION,
  TESTRAIL_HOST,
  TESTRAIL_USER,
  TESTRAIL_PASSWORD,
  TESTRAIL_MILESTONE_NAME_PREFIX,
  TESTRAIL_PLAN_NAME_PREFIX,
  TESTRAIL_PLAN_ID,
  NUMBER_OF_RETRIES,
  MAX_SESSIONS,
} = process.env;

const maxSessions = MAX_SESSIONS || getParam(5, '--params.maxSessions', false);
const browserStackBrowser = browserList[getParam('chrome', '--params.browserstack.browser', false)];
const maxBrowserInstances = MAX_INSTANCES || getParam(5, '--params.maxInstances', false);
const useHeadlessBrowser = HEADLESS_BROWSER || toBoolean(getParam(false, '--params.headlessBrowser', false));
const numberOfRetries = NUMBER_OF_RETRIES || getParam(3, '--params.numberOfRetries', false);
const softAssertions = SOFT_ASSERTIONS || getParam(false, '--params.softAssertions', false);
const { os, browserName, os_version, browser_version, resolution } = browserStackBrowser;
const chromeHeadlessArgs = [
  '--headless',
  '--disable-gpu',
  '--window-size=1280x800',
  '--disable-dev-shm-usage',
  '--no-sandbox',
  '--acceptInsecureCerts',
  '--disable-infobars',
  '--ignore-certificate-errors',
  '--remote-debugging-port=9222',
  '--disable-blink-features=BlockCredentialedSubresources',
  '--disable-web-security',
];

/*  ABOUT --disable-dev-shm-usage:
    By default, Docker runs a container with a /dev/shm shared memory space 64MB.
    This is typically too small for Chrome and will cause Chrome to crash when rendering large pages.
    To fix, run the container with docker run --shm-size=1gb to increase the size of /dev/shm.
    Since Chrome 65, this is no longer necessary. Instead, launch the browser with the --disable-dev-shm-usage flag
    sources:
        - https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#tips
        - https://developers.google.com/web/tools/puppeteer/troubleshooting
*/
const chromeOptions = {
  args: useHeadlessBrowser ? chromeHeadlessArgs : ['--disable-infobars'],
  // Set download path and avoid prompting for download even though
  // this is already the default on Chrome but for completeness
  prefs: {
    download: {
      prompt_for_download: false,
      directory_upgrade: true,
      default_directory: path.join(path.resolve('.') + '/e2e/resources/Downloads'),
    },
  },
};
const configSetup = {
  restartBrowserBetweenTests: false,
  SELENIUM_PROMISE_MANAGER: false,
  multiCapabilities: [
    {
      browserName: 'chrome',
      chromeOptions: chromeOptions,
      shardTestFiles: 'true',
      maxInstances: maxBrowserInstances,
      acceptInsecureCerts: true,
    },
  ],
  allScriptsTimeout: 300000,
  suites: {
    e2e_tests: './e2e/test-suites/rapid-qa-suite/**/*.e2e-spec.ts',
  },
  capabilities: {
    browserName: 'chrome',
    chromeOptions: chromeOptions,
    acceptInsecureCerts: true,
  },
  seleniumAddress: {
    browserStack: 'http://hub-cloud.browserstack.com/wd/hub',
    local: 'http://localhost:4723/wd/hub',
  },
  bsMultiCapabilities: [
    {
      name: `${os} ${os_version}-${browserName} v ${browser_version || 'Latest'}`,
      browserName: browserName,
      browser_version: browser_version,
      os: os,
      os_version: os_version,
      resolution: resolution,
      'browserstack.user': BROWSERSTACK_USERNAME || getParam('', '--params.browserstack.user', false),
      'browserstack.key': BROWSERSTACK_ACCESS_KEY || getParam('', '--params.browserstack.key', false),
      'browserstack.local': BROWSERSTACK_LOCAL || getParam(false, '--params.browserstack.local', false),
      'browserstack.localIdentifier':
        BROWSERSTACK_LOCAL_IDENTIFIER || setupUtilities.getParam(true, '--params.browserstack.localIdentifier', false),
      build:
        BROWSERSTACK_BUILD ||
        getParam(
          'Local Build - Sapphire - Tradebeam GTM -' + new Date().toISOString(),
          '--params.browserstack.build',
          false,
        ),
      'browserstack.debug': 'true',
      acceptSslCerts: 'true',
      trustAllSSLCertificates: 'true',
      'browserstack.timezone': 'UTC',
      'browserstack.safari.allowAllCookies': 'true',
      shardTestFiles: true,
      maxInstances: maxBrowserInstances,
    },
  ],
  params: {
    numberOfRetries: numberOfRetries,
    maxSessions: maxSessions,
    verboseLogging: ENABLE_VERBOSE_LOGGING || getParam(false, '--params.enableVerboseLogging', false),
    maxInstances: 5,
    users: {
      loginTest: {
        username: 'logintest@qa.data',
        password: 'pass1234',
        firstName: 'Login Test',
        lastName: 'QA Data',
      },
      switchUi: {
        username: 'switchappui@qa.data',
      },
      candidateProfile: {
        username: 'candidateprofile@qa.data',
        firstName: 'Candidate Profile',
        lastName: 'QA Data',
      },
    },
    softAssertions: softAssertions,
    testrail: {
      projectId: TESTRAIL_PROJECT_ID || getParam(703, '--params.testrail.projectId', false),
      milestoneName:
        TESTRAIL_MILESTONE_NAME || getParam('Automation milestone week', '--params.testrail.milestoneName', false),
      versionName: VERSION || getParam('Default version name', '--params.testrail.versionName', false),
      host: TESTRAIL_HOST || getParam('', '--params.testrail.host', false),
      user: TESTRAIL_USER || getParam('', '--params.testrail.user', false),
      password:
        TESTRAIL_PASSWORD || getParam('', '--params.testrail.password', false),
      milestoneNamePrefix:
        TESTRAIL_MILESTONE_NAME_PREFIX ||
        getParam('Automation milestone week', '--params.testrail.milestoneNamePrefix', false),
      planNamePrefix:
        TESTRAIL_PLAN_NAME_PREFIX || getParam('Automation Test Plan', '--params.testrail.planNamePrefix', false),
      planId: TESTRAIL_PLAN_ID || getParam(0, '--params.testrail.planId', false),
    },
    version: VERSION || getParam('7.5.0', '--params.testrail.versionName', false),
    selenium: {
      hub: SELENIUM_URL || getParam('http://10.69.8.112:4444/wd/hub', '--params.selenium.hub', false),
    },
    language: LANGUAGE || getParam('French', '--params.language', false),
    browserstack: {
      user: '', // Don't specify anything here it's just for a reference purpose that it can be a param
      key: '', // Don't specify anything here it's just for a reference purpose that it can be a param
      local: '', // Don't specify anything here it's just for a reference purpose that it can be a param
      localIdentifier: '', // Don't specify anything here it's just for a reference purpose that it can be a param
      build: '', // Don't specify anything here it's just for a reference purpose that it can be a param
    },
  },
  baseUrl: 'https://staging-profile.crossover.com/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 300000,
    print: function() {},
  },
};
module.exports = configSetup;
