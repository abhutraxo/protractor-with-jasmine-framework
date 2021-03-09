/**
 * This is a decorator function for a web element, pass in an element and get back
 * an extended function element
 * @param locator
 * @param name
 */
import { element, ElementArrayFinder, ElementFinder, Locator } from 'protractor';

import { DropDownHelper } from '../html/dropdown-helper';
import { ElementHelper } from '../html/element-helper';
import { PageHelper } from '../html/page-helper';
import { TextBoxHelper } from '../html/textbox-helper';

import { ExpectationHelper } from './expectation-helper';

export function $(locator: Locator, name: string) {
    return new DfElement(locator, name);
}

export function $$(locator: Locator, name: string) {
    return new DfElements(locator, name);
}

export class DfElement {

    readonly item: ElementFinder;

    constructor(locator: Locator, public name: string) {
        /* tslint:disable-next-line:no-element-outside-page-class */
        this.item = element(locator); // it is a helper class, so need to disable lint rule
    }

    /**
     * Click button using JS
     * It logs X button is clicked using subStep
     */
    async clickButtonJs() {
        await ElementHelper.clickButtonJs(this);
    }

    /**
     * Click button
     * It logs X button is clicked using subStep
     */
    async clickButton() {
        await ElementHelper.clickButton(this);
    }

    /**
     * Click link
     * It logs X link is clicked using subStep
     */
    async clickLink() {
        await ElementHelper.clickLink(this);
    }

    /**
     * Click checkbox
     * It logs X checkbox is clicked using subStep
     */
    async clickCheckbox() {
        await ElementHelper.clickCheckbox(this);
    }

    /**
     * Click link
     * It logs X link is clicked using subStep
     */
    async clickLinkJs() {
        await ElementHelper.clickLinkJs(this);
    }

    /**
     * Perform 'Sendkeys' operation
     * It logs sequence of strings passed to the element
     * @param text
     */
    async sendKeys(text: string) {
        await ElementHelper.sendKeys(this, text);
    }

    /**
     * Schedules a command to clear the value of this element
     */
    async clearText() {
        await TextBoxHelper.clearText(this);
    }

    /**
     * Schedules a command to type a sequence on the DOM element represented by this instance
     * if {value} passed is defined
     * @param text
     */
    async sendKeysIfTextIsDefined(text: string) {
        await ElementHelper.sendKeysIfTextIsDefined(this, text);
    }

    /**
     * Verify whether an element is displayed
     */
    async verifyDisplayedStatus() {
        await ExpectationHelper.verifyDisplayedStatus(this);
    }

    /**
     * Verify whether an element is displayed
     */
    async isElementDisplayed() {
        return await PageHelper.isElementDisplayed(this);
    }

    /**
     * Verify whether an element is present
     */
    async verifyPresentStatus() {
        await ExpectationHelper.verifyPresentStatus(this);
    }

    /**
     * Get Css value
     * @param attribute
     */
    async getCssValue(attribute: string) {
        return await PageHelper.getCssValue(this, attribute);
    }

    /**
     * Verify if text value is entered properly
     * @param expected
     */
    async verifyTextEntered(expected: string) {
        return ExpectationHelper.verifyTextEntered(this, expected);
    }

    /**
     * Perform 'HoverOver' operation using Action class
     */
    async hoverOver() {
        await ElementHelper.actionHoverOver(this);
    }

    /**
     * Perform hoverOver and click using Action class
     */
    async hoverOverAndClick() {
        await this.hoverOver();
        await this.clickButton();
    }

    /**
     * Get text
     */
    async getText() {
        return await ElementHelper.getText(this);
    }

    /**
     * Get attribute
     * @param attribute
     */
    async getAttribute(attribute: string) {
        return await ElementHelper.getAttributeValue(this, attribute);
    }

    /**
     * Scroll to element
     */
    async scrollToElement() {
        await ElementHelper.scrollToElement(this);
    }

    /**
     * Verify hidden status
     */
    async verifyHiddenStatus() {
        await ExpectationHelper.verifyHiddenStatus(this);
    }

    /**
     * Verify textbox contains {expected} value
     * @param expected
     */
    async verifyTextBoxContains(expected: string) {
        await ExpectationHelper.verifyTextBoxContains(this, expected);
    }

    /**
     * Get currently selected option
     */
    async getSelectedOptionText() {
        return await DropDownHelper.getSelectedOptionText(this);
    }

    /**
     * Verify element value
     */
    async verifyValue(value: string) {
        await ExpectationHelper.verifyValue(this, value);
    }

    async verifyTextContains(text: string) {
        await ExpectationHelper.verifyTextContains(this, text);
    }

    /**
     * Verify whether an element is enabled
     */
    async verifyEnabledStatus() {
        await ExpectationHelper.verifyEnabledStatus(this);
    }

    /**
     * Verify whether an element is Disabled
     */
    async verifyDisabledStatus() {
        await ExpectationHelper.verifyDisabledStatus(this);
    }
}

export class DfElements {

    readonly item: ElementArrayFinder;

    constructor(locator: Locator, public name: string) {
        this.item = element.all(locator);
    }
}
