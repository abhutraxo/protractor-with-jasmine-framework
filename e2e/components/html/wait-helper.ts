import { browser, protractor, ElementArrayFinder, ElementFinder } from 'protractor';

import { VerboseLogger } from '../../../core/logger/verbose-logger';
import { Constants } from '../misc-utils/constants';
import { ValidationsHelper } from '../misc-utils/validation-helper';

import { PageHelper } from './page-helper';

export class WaitHelper {
    static readonly EC = protractor.ExpectedConditions;

    private static assertionHandler(error: Error) {
        if (browser.params.softAssertions) {
            return false;
        } else {
            throw error;
        }
    }

    /**
     * Wait for an element to exist
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElement(targetElement: ElementFinder,
                                timeout = PageHelper.DEFAULT_TIMEOUT,
                                message = 'Element should exist') {
        VerboseLogger.logSelector(timeout, targetElement, 'exist');
        return browser.wait(this.EC.presenceOf(targetElement),
            timeout, targetElement.locator().toString() + message)
            .then(() => true, (error: any) => this.assertionHandler(error));
    }

    /**
     * Wait for an element to display
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElementToBeDisplayed(targetElement: ElementFinder,
                                             timeout = PageHelper.DEFAULT_TIMEOUT,
                                             message = 'Element should be visible') {
        VerboseLogger.logSelector(timeout, targetElement, 'be visible');
        return browser.wait(this.EC.visibilityOf(targetElement),
            timeout,
            targetElement.locator().toString() + message)
            .then(() => true, (error: any) => this.assertionHandler(error));
    }

    /**
     * Wait for an element to present
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElementToBePresent(targetElement: ElementFinder,
                                           timeout = PageHelper.DEFAULT_TIMEOUT,
                                           message = 'Element should be visible') {
        VerboseLogger.logSelector(timeout, targetElement, 'be present');
        return browser.wait(this.EC.presenceOf(targetElement),
            timeout,
            targetElement.locator().toString() + message)
            .then(() => true, (error: any) => this.assertionHandler(error));
    }

    /**
     * Wait for an element to hide
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     * @returns {any}
     */
    static async waitForElementToBeHidden(targetElement: ElementFinder,
                                          timeout = PageHelper.DEFAULT_TIMEOUT,
                                          message = 'Element should not be visible') {
        VerboseLogger.logSelector(timeout, targetElement, 'be invisible');
        return browser.wait(this.EC.invisibilityOf(targetElement),
            timeout, targetElement.locator().toString() + message)
            .then(() => true, (error: any) => this.assertionHandler(error));
    }

    /**
     * Wait for an element to become clickable
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElementToBeClickable(targetElement: ElementFinder,
                                             timeout = PageHelper.DEFAULT_TIMEOUT,
                                             message = 'Element not clickable') {
        VerboseLogger.logSelector(timeout, targetElement, 'be clickable');
        try {
            await browser.wait(this.EC.elementToBeClickable(targetElement),
                timeout,
                targetElement.locator().toString() + message);
        } catch (e) {
        }
    }

    /**
     * Wait until element does not have any text value
     * @param targetElement
     * @param timeout
     * @param message
     */
    static async waitForElementToHaveText(targetElement: ElementFinder, timeout = PageHelper.DEFAULT_TIMEOUT, message = '') {
        await this.waitForElementToBePresent(targetElement);
        VerboseLogger.logSelector(timeout, targetElement, 'have text');
        return await browser.wait(async () => (await targetElement.getText()).trimLeft().trimRight() !== '',
            timeout, message)
            .then(() => true, (error: any) => this.assertionHandler(error));
    }

    /**
     * Wait for element to be optionally present
     * @param targetElement
     * @param timeout
     */
    static async waitForElementOptionallyPresent(targetElement: ElementFinder, timeout = PageHelper.DEFAULT_TIMEOUT) {
        const isDisplayed = this.EC.presenceOf(targetElement);
        return browser.wait(isDisplayed, timeout).then(function () {
            return true;
        }, function () {
            return false;
        });
    }

    /**
     * Wait for an element to be enabled
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     * @returns {any}
     */
    static async waitForElementToBeEnabled(targetElement: ElementFinder,
                                           timeout = PageHelper.DEFAULT_TIMEOUT,
                                           message = 'Element not enabled') {
        return await browser.wait(targetElement.isEnabled(), timeout,
            targetElement.locator().toString() + message)
            .then(() => true, (error: any) => this.assertionHandler(error));
    }

    /**
     * Wait for an element to be selected
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     * @returns {any}
     */
    static async waitForElementToBeSelected(targetElement: ElementFinder,
                                            timeout = PageHelper.DEFAULT_TIMEOUT,
                                            message = 'Element not selected') {
        return await browser.wait(targetElement.isSelected(), timeout,
            targetElement.locator().toString() + message)
            .then(() => true, (error: any) => this.assertionHandler(error));
    }

    /**
     * Wait until count of tabs to be equal to {count}
     * @param count
     * @param timeout
     */
    static async waitUntilTabsCountEqual(count: number, timeout = PageHelper.DEFAULT_TIMEOUT) {
        VerboseLogger.log(ValidationsHelper.getTabsToHaveCount(count));
        await browser.wait(async () => {
            return count === await PageHelper.getTabsCount();
        }, timeout, ValidationsHelper.getTabsToHaveCount(count));
    }

    /**
     * Schedules a command to make the driver sleep for the given amount of time.
     */
    static async sleep(sleepTime = PageHelper.timeout.xxs) {
        /* tslint:disable-next-line:no-browser-sleep */
        await browser.sleep(sleepTime); // providing definition to sleep method
    }

    /**
     * Wait until count of elements to be equal or greater to {count}
     * @param elements
     * @param count
     * @param timeout
     */
    static async waitUntilElementsCountIsGreaterOrEqual(elements: ElementArrayFinder,
                                                        count: number,
                                                        timeout = PageHelper.DEFAULT_TIMEOUT) {
        const message = `Wait until elements to have count equal or greater: ${count} with locator: ${elements.locator()}`;
        VerboseLogger.log(message);
        await browser.wait(async () => {
            return count <= await elements.count();
        }, timeout, message);
    }

    static async waitForPageToStable() {
        // Wait for data to load
        let attempts = 0;
        while (attempts++ < Constants.MAX_RETRY_ATTEMPTS) {
            const result = await browser.executeScript("return document.readyState === 'complete'");
            if (result) {
                return;
            }
        }
    }
}
