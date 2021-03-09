'use strict';
const defaultConfigSetup = require('./core/config-setup/default-config-setup');
const reportersSetup = require('./core/config-setup/reporters-setup');
const bsMultiCapabilities = defaultConfigSetup.bsMultiCapabilities[0];
delete bsMultiCapabilities.maxInstances;
delete bsMultiCapabilities.shardTestFiles;
delete bsMultiCapabilities['browserstack.localIdentifier'];

exports.config = {
    restartBrowserBetweenTests: defaultConfigSetup.restartBrowserBetweenTests,
    SELENIUM_PROMISE_MANAGER: defaultConfigSetup.SELENIUM_PROMISE_MANAGER,
    allScriptsTimeout: defaultConfigSetup.allScriptsTimeout,
    suites: defaultConfigSetup.suites,
    params: defaultConfigSetup.params,
    seleniumAddress: defaultConfigSetup.seleniumAddress.browserStack,
    baseUrl: defaultConfigSetup.baseUrl,
    framework: defaultConfigSetup.framework,
    capabilities: bsMultiCapabilities,
    jasmineNodeOpts: defaultConfigSetup.jasmineNodeOpts,
    beforeLaunch: reportersSetup.beforeLaunch,
    afterLaunch: reportersSetup.afterLaunch,
    onPrepare() {
        reportersSetup.configureAllReporters();
    },
};
