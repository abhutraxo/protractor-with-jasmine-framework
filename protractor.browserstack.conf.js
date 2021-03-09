'use strict';
const defaultConfigSetup = require('./core/config-setup/default-config-setup.js');
const reportersSetup = require('./core/config-setup/reporters-setup');

exports.config = {
    restartBrowserBetweenTests: defaultConfigSetup.restartBrowserBetweenTests,
    SELENIUM_PROMISE_MANAGER: defaultConfigSetup.SELENIUM_PROMISE_MANAGER,
    allScriptsTimeout: defaultConfigSetup.allScriptsTimeout,
    suites: defaultConfigSetup.suites,
    params: defaultConfigSetup.params,
    baseUrl: defaultConfigSetup.baseUrl,
    framework: defaultConfigSetup.framework,
    jasmineNodeOpts: defaultConfigSetup.jasmineNodeOpts,
    seleniumAddress: defaultConfigSetup.seleniumAddress.browserStack,
    maxSessions: defaultConfigSetup.params.maxSessions, // unlimited, change to desired number based on parallel count for BS account
    multiCapabilities: defaultConfigSetup.bsMultiCapabilities,
    onPrepare: function() {
        reportersSetup.configureAllReporters();
    },
};
