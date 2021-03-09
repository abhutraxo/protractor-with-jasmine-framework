import { ElementFinder } from 'protractor';

import { StepLogger } from '../../../core/logger/step-logger';
import { DropdownField } from '../../page-objects/pages/models/dropdown-field';
import { CheckboxHelper } from '../html/checkbox-helper';
import { DropDownHelper } from '../html/dropdown-helper';
import { ElementHelper } from '../html/element-helper';
import { PageHelper } from '../html/page-helper';
import { TextBoxHelper } from '../html/textbox-helper';
import { WaitHelper } from '../html/wait-helper';

import { Constants } from './constants';
import { DfElement } from './df-elements-helper';
import { HtmlHelper } from './html-helper';
import { ValidationsHelper } from './validation-helper';

const { attributes, additionalAttributes } = HtmlHelper;

export class ExpectationHelper {
    /**
     * Verify whether an element is displayed or not
     * @param targetElement
     */
    static async verifyDisplayedStatus(targetElement: DfElement) {
        const message = ValidationsHelper.getDisplayedValidation(targetElement.name);
        StepLogger.subVerification(message);
        await expect(await WaitHelper.waitForElementToBeDisplayed(targetElement.item))
            .toBe(true, message);
    }

    /**
     * Verify if an element is hidden
     * @param targetElement
     */
    static async verifyHiddenStatus(targetElement: DfElement) {
        const message = ValidationsHelper.getNotDisplayedValidation(targetElement.name);
        StepLogger.subVerification(message);
        await expect(await WaitHelper.waitForElementToBeHidden(targetElement.item))
            .toBe(true, message);
    }

    /**
     * Verify whether an element is present or not
     * @param targetElement
     */
    static async verifyPresentStatus(targetElement: DfElement) {
        const message = ValidationsHelper.getPresentValidation(targetElement.name);
        StepLogger.subVerification(message);
        await expect(await WaitHelper.waitForElement(targetElement.item))
            .toBe(true, message);
    }

    /**
     * Verify element is not displayed
     * @param targetElement
     */
    static async verifyNotDisplayedStatus(targetElement: DfElement) {
        const message = ValidationsHelper.getNotDisplayedValidation(targetElement.name);
        StepLogger.subVerification(message);
        await expect(await WaitHelper.waitForElementToBeHidden(targetElement.item))
            .toBe(true, message);
    }

    /**
     * Verify if checkbox is checked
     * @param targetElement
     */
    static async verifyCheckboxIsChecked(targetElement: DfElement) {
        const message = ValidationsHelper.getCheckedValidation(targetElement.name);
        StepLogger.subVerification(message);
        const checkBoxStatus = await CheckboxHelper.isCheckboxChecked(targetElement);
        await expect(checkBoxStatus).toBe( true, message);
    }

    /**
     * Verify whether an element is removed from the page
     * @param targetElement
     */
    static async verifyRemovedStatus(targetElement: DfElement) {
        const message = ValidationsHelper.getNotDisplayedValidation(targetElement.name);
        StepLogger.subVerification(message);
        await expect(await WaitHelper.waitForElementToBeHidden(targetElement.item))
            .toBe(true, message);
    }

    /**
     * Verify Target element has class with name - className
     * @param targetElement
     * @param className
     */
    static async verifyHasClass(targetElement: DfElement, className: string) {
        const message = ValidationsHelper.getHasClassValidation(targetElement.name, className);
        StepLogger.subVerification(message);
        await expect(await ElementHelper.hasClass(targetElement, className)).toBe(true, message);
    }

    /**
     * Verify whether an element is enabled or not
     * @param targetElement
     */
    static async verifyEnabledStatus(targetElement: DfElement) {
        const message = ValidationsHelper.getEnabledValidation(targetElement.name);
        StepLogger.subVerification(message);
        await expect(await WaitHelper.waitForElementToBeEnabled(targetElement.item))
            .toBe(true, message);
    }

    static async verifyDisabledStatus(targetElement: DfElement) {
        const message = ValidationsHelper.getDisabledValidation(targetElement.name);
        StepLogger.subVerification(message);
        await expect(await PageHelper.isElementEnabled(targetElement))
            .toBe(false, message);
    }

    /**
     * Verify whether an element is selected or not
     * @param targetElement
     */
    static async verifySelectedStatus(targetElement: DfElement) {
        const message = ValidationsHelper.getSelectedValidation(targetElement.name);
        StepLogger.subVerification(message);
        await expect(await WaitHelper.waitForElementToBeSelected(targetElement.item)).toBe( true,
            message);
    }

    /**
     * Verify that TextBox contains {expected} text
     * @param targetElement
     * @param expected
     */
    static async verifyTextBoxContains(targetElement: DfElement, expected: string) {
        const actual = await targetElement.getText();
        const message = ValidationsHelper.getStringToContain(targetElement.name,
            actual, expected);
        StepLogger.subVerification(message);
        await expect(actual).toContain(expected,
            message);
    }

    /**
     * Verify that element has the exact text ignore casing
     * @param targetElement
     * @param expectedValue
     */
    static async verifyTextIgnoreCase(targetElement: DfElement, expectedValue: string) {
        const message = ValidationsHelper.getFieldShouldHaveValueValidation(targetElement.name,
            additionalAttributes.text, expectedValue);
        StepLogger.subVerification(message);
        await expect((await ElementHelper.getText(targetElement)).toLowerCase())
            .toBe(expectedValue.toLowerCase(), message);
    }

    /**
     * Verify that textbox element's 'value' attribute has same text
     * @param targetElement
     * @param expectedValue
     */
    static async verifyValue(targetElement: DfElement, expectedValue: string) {
        const message = ValidationsHelper.getFieldShouldHaveValueValidation(targetElement.name,
            attributes.value, expectedValue);
        StepLogger.subVerification(message);
        await expect(await TextBoxHelper.hasValue(targetElement, expectedValue))
            .toBe(true, message);
    }

    /**
     * Verify that element contains the text
     * @param targetElement
     * @param expectedText
     */
    static async verifyTextContains(targetElement: DfElement, expectedText: string) {
        const actualText = await ElementHelper.getText(targetElement);
        const message = ValidationsHelper.getStringToContain(targetElement.name,
            actualText, expectedText);

        StepLogger.subVerification(message);
        await expect(actualText).toContain(expectedText, message);
    }

    /**
     * Verify that value is grater than other value
     * @param target
     * @param actualValue
     * @param expectedValue
     */
    static async verifyValueGraterThan(target: DfElement, actualValue: number, expectedValue: number) {
        const message = ValidationsHelper.getGreaterThanValidation(actualValue, expectedValue, target.name);
        StepLogger.subVerification(message);
        await expect(actualValue).toBeGreaterThan(expectedValue, message);
    }

    /**
     * Verify that value is less than or equal to other value
     * @param target
     * @param actualValue
     * @param expectedValue
     */
    static async verifyValueLessOrEqualTo(target: DfElement, actualValue: number, expectedValue: number) {
        const message = ValidationsHelper.getLessThanOrEqualToValidation(actualValue,
            expectedValue, target.name);
        StepLogger.subVerification(message);
        await expect(actualValue).toBeLessThanOrEqual(expectedValue, message);
    }

    /**
     * Verify that value is less than the other value
     * @param actualValue
     * @param expectedValue
     */
    static async verifyValueLessThan(actualValue: number, expectedValue: number) {
        const message = ValidationsHelper.getLessThanValidation(actualValue, expectedValue);
        StepLogger.subVerification(`${actualValue} should be less than ${expectedValue} value`);
        await expect(actualValue).toBeLessThan(expectedValue, message);
    }

    /**
     * Verify that value is greater than or equal to other value
     * @param target
     * @param actualValue
     * @param expectedValue
     */
    static async verifyValueGreaterOrEqualTo(target: DfElement, actualValue: number, expectedValue: number) {
        const message = ValidationsHelper.getGreaterThanOrEqualToValidation(actualValue,
            expectedValue, target.name);
        StepLogger.subVerification(message);
        await expect(actualValue).toBeGreaterThanOrEqual(expectedValue, message);
    }

    /**
     * Verify that value is equal to other value
     * @param target
     * @param actualValue
     * @param expectedValue
     */
    static async verifyValueEqualTo(target: DfElement, actualValue: number, expectedValue: number) {
        const  message = ValidationsHelper.getFieldEqualValidation(target.name,
            String(actualValue), String(expectedValue));
        StepLogger.subVerification(message);
        await expect(actualValue).toEqual(expectedValue, message);
    }

    /**
     * Verify that value is not equal to other value
     * @param target
     * @param actualValue
     * @param expectedValue
     */
    static async verifyValueNotEqualTo(target: DfElement, actualValue: string, expectedValue: string) {
        const message  = ValidationsHelper.getFieldNotEqualValidation(target.name,
            actualValue, expectedValue);
        StepLogger.subVerification(message);
        await expect(actualValue).not.toEqual(expectedValue, message);
    }

    /**
     * Verify that checkbox is not checked
     * @param targetElement
     */
    static async verifyCheckBoxNotSelected(targetElement: DfElement) {
        const message = ValidationsHelper.getUnSelectedValidation(targetElement.name);
        await WaitHelper.waitForElement(targetElement.item);
        const actualValue = await targetElement.item.isSelected();

        StepLogger.subVerification(message);
        await expect(actualValue).toEqual(false, message);
    }

    /**
     * Verify that attribute values is equal to expected Value
     * @param targetElement
     * @param attribute
     * @param expected
     */
    static async verifyAttributeValue(targetElement: DfElement, attribute: string, expected: string) {
        const message = ValidationsHelper.getFieldAttributeValidation(targetElement.name,
            attribute, expected);
        const actualValue = await ElementHelper.getAttributeValue(targetElement, attribute);
        StepLogger.subVerification(message);
        await expect(actualValue).toEqual(expected, message);
    }

    /**
     * Verify that attribute values is not equal to expected Value
     * @param targetElement
     * @param attribute
     * @param expectedValue
     */
    static async verifyAttributeValueNotToBe(targetElement: DfElement,
                                             attribute: string,
                                             expectedValue: string) {
        const message = ValidationsHelper.getFieldNotAttributeValidation(targetElement.name,
            attribute, expectedValue);
        const actualValue = await ElementHelper.getAttributeValue(targetElement, attribute);
        StepLogger.subVerification(message);
        await expect(actualValue).not.toBe(expectedValue, message);
    }

    /**
     * Verify that string value is equal to other value
     * @param targetElement
     * @param actualValue
     * @param expectedValue
     */
    static async verifyStringValueEqualTo(targetElement: DfElement, actualValue: string,
                                          expectedValue: string) {
        const message = ValidationsHelper.getFieldEqualValidation(targetElement.name,
            actualValue, expectedValue);
        StepLogger.subVerification(message);
        await expect(actualValue).toEqual(expectedValue, message);
    }

    /**
     * Verify that string value contains the other value
     * @param target
     * @param actualValue
     * @param expectedValue
     */
    static async verifyStringValueContain(target: DfElement, actualValue: string, expectedValue: string) {
        const message = ValidationsHelper.getFieldContainsValidation(actualValue, expectedValue, target.name);
        StepLogger.subVerification(message);
        await expect(actualValue).toContain(expectedValue, message);
    }

    /**
     * Verify that string value to not contain the other value
     * @param target
     * @param actualValue
     * @param expectedValue
     */
    static async verifyStringValueNotContain(target: DfElement, actualValue: string, expectedValue: string) {
        const message = ValidationsHelper.getFieldNotContainsValidation(actualValue, expectedValue, target.name);
        StepLogger.subVerification(message);
        await expect(actualValue).not.toContain(expectedValue, message);
    }

    /**
     * Verify that string value is not equal to other value
     * @param target
     * @param actualValue
     * @param expectedValue
     */
    static async verifyStringValueNotEqualTo(target: DfElement, actualValue: string, expectedValue: string) {
        const message = ValidationsHelper.getFieldNotEqualValidation(target.name, actualValue, expectedValue);
        StepLogger.subVerification(`${actualValue} should be equal to  ${expectedValue} value`);
        await expect(actualValue).not.toBe(expectedValue, message);
    }

    /**
     * Verify that CSS value is equal to expected Value
     * @param target
     * @param attribute
     * @param expectedValue
     */
    static async verifyCssAttributeValue(target: DfElement, attribute: string, expectedValue: string) {
        const message  = ValidationsHelper.getFieldAttributeValidation(target.name,
            attribute, expectedValue);

        const actualValue = await PageHelper.getCssValue(target, attribute);
        StepLogger.subVerification(message);
        await expect(actualValue).toEqual(expectedValue, message);
    }

    /**
     * Verify that element's attribute contains {expected} value
     * @param targetElement
     * @param attribute
     * @param expected
     */
    static async verifyAttributeContains(targetElement: DfElement, attribute: string, expected: string) {
        const message =  ValidationsHelper.getFieldAttributeValidation(targetElement.name,
            attribute, expected);
        const actualValue = await ElementHelper.getAttributeValue(targetElement, attribute);

        StepLogger.subVerification(message);
        await expect(actualValue).toContain(expected, message);
    }

    /**
     * Verify that element's attribute does not contain {expected} value
     * @param target
     * @param attribute
     * @param expected
     */
    static async verifyAttributeNotContains(target: DfElement, attribute: string, expected: string) {
        const message = ValidationsHelper.getFieldAttributeNotContainsValidation(target.name,
            attribute, expected);
        const actualValue = await ElementHelper.getAttributeValue(target, attribute);
        StepLogger.subVerification(message);
        await expect(actualValue).not.toContain(expected, message);
    }

    /**
     * Verify that element's attribute is present
     * @param target
     * @param attribute
     */
    static async verifyAttributePresent(target: DfElement, attribute: string) {
        const message = ValidationsHelper.getFieldAttributePresentValidation(target.name,
            attribute);
        StepLogger.subVerification(message);
        const attr = await target.getAttribute(attribute);
        await expect(attr).toBeDefined(message);
    }

    /**
     * Verify that element's attribute is not present
     * @param target
     * @param attribute
     */
    static async verifyAttributeNotPresent(target: DfElement, attribute: string) {
        const message = ValidationsHelper.getFieldAttributeNotPresentValidation(target.name,
            attribute);
        StepLogger.subVerification(message);
        await expect(await target.getAttribute(attribute)).toBeUndefined(message);
    }

    /**
     * Verify 'value' attribute of Dropdown option
     * @param selectElement
     * @param text
     * @param index
     */
    static async verifyValueAttributeOfDropdownOption(selectElement: DfElement,
                                                      { text, index }: DropdownField) {
        let actualValue = Constants.EMPTY_STRING;
        if (text) {

            actualValue = await DropDownHelper.getDropdownOptionByCssText(selectElement,
                text).getAttribute(attributes.value);
            StepLogger.subVerification(ValidationsHelper.getDropdownValueShouldBe(selectElement, actualValue));

        } else {

            const elements = DropDownHelper.getDropdownOptionsByText(selectElement, /\w+/).item;
            await WaitHelper.waitUntilElementsCountIsGreaterOrEqual(elements,  1);
            actualValue = await elements
                .get(index)
                .getAttribute(attributes.value);
            StepLogger.subVerification(ValidationsHelper.getDropdownValueShouldBe(selectElement, actualValue));

        }
        const expectedValue = await selectElement.getAttribute(attributes.value);
        await ExpectationHelper.verifyStringValueEqualTo(selectElement,
            actualValue, expectedValue);
    }

    static async verifyTextEntered(target: DfElement, value: string) {
        const actual = await target.getAttribute(HtmlHelper.attributes.value);
        await ExpectationHelper.verifyStringValueEqualTo(target,
            actual, value);
    }

    static async verifyHiddenStatusElement(targetElement: ElementFinder) {
        const message = ValidationsHelper.getNotDisplayedValidation(targetElement.name);
        StepLogger.subVerification(message);
        await expect(await WaitHelper.waitForElementToBeHidden(targetElement))
            .toBe(true, message);
    }

    static async verifyValueIsTrue(expectedValue: boolean) {
        const message = ValidationsHelper.getEqualityValidation(expectedValue.toString(),
            Constants.true, attributes.value);
        StepLogger.subVerification(message);
        await expect(expectedValue).toBe(true, message);
    }
}
