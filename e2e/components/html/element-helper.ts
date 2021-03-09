import { browser, by, protractor } from 'protractor';
import { ILocation, ISize } from 'selenium-webdriver';

import { StepLogger } from '../../../core/logger/step-logger';
import { Constants } from '../misc-utils/constants';
import { DfElement } from '../misc-utils/df-elements-helper';
import { ElementType } from '../misc-utils/element-type';

import { PageHelper } from './page-helper';
import { TextBoxHelper } from './textbox-helper';
import { WaitHelper } from './wait-helper';

const { jsScripts } = Constants;

export class ElementHelper {
  private static readonly EC = protractor.ExpectedConditions;

  /**
   * Click using Javascript
   * @param targetElement
   * @param eType
   */
  private static async clickJs(targetElement: DfElement, eType: ElementType) {
    StepLogger.subStep(`Click '${targetElement.name}' ${eType}`);
    await this.clickUsingJs(targetElement);
  }

  /**
   * Perform click
   * @param targetElement
   * @param eType
   */
  private static async click(targetElement: DfElement, eType: ElementType) {
    StepLogger.subStep(`Click '${targetElement.name}' ${eType}`);
    await PageHelper.click(targetElement);
  }

  /**
   * Get browser name
   */
  static async getBrowser() {
    const capabilities = await browser.getCapabilities();
    return capabilities.get('browserName');
  }

  /**
   * Move mouse with Action class
   * @param target
   */
  static async actionMouseMove(target: DfElement) {
    StepLogger.subStep(`MouseMove '${target.name}' with Action class`);
    await WaitHelper.waitForElementToBeDisplayed(target.item);
    return browser
      .actions()
      .mouseMove(target.item)
      .perform();
  }

  /**
   * Perform Mouse down with Action class
   * @param target
   */
  static async actionMouseDown(target: DfElement) {
    StepLogger.subStep(`MouseDown '${target.name}' with Action class`);
    await WaitHelper.waitForElementToBeDisplayed(target.item);
    return browser
      .actions()
      .mouseDown(target.item)
      .perform();
  }

  /**
   * Sendkeys with Action class
   * @param key
   */
  static async actionSendKeys(key: string) {
    StepLogger.subStep(`Sendkeys '${key}' with Action class`);
    return browser
      .actions()
      .sendKeys(key)
      .perform();
  }

  /**
   * Perform 'Keyup' operation with Action class
   * @param key
   */
  static async actionKeyUp(key: string) {
    StepLogger.subStep(`KeyUp '${key}' with Action class`);
    return browser
      .actions()
      .keyUp(key)
      .perform();
  }

  /**
   * Helps in performing 'Mouse up' operation with Action class
   * @param target
   */
  static async actionMouseUp(target?: DfElement) {
    StepLogger.subStep('Move mouse up');
    if (target) {
      await WaitHelper.waitForElementToBeDisplayed(target.item);
    }
    return browser
      .actions()
      .mouseUp(target.item.getWebElement())
      .perform();
  }

  /**
   * Perform 'DragAndDrop' operation with Action class
   * @param source
   * @param destination
   */
  static async actionDragAndDrop(source: DfElement, destination: DfElement) {
    StepLogger.subStep(`DragAndDrop '${source.name}' to ${destination.name} with Action class`);
    await WaitHelper.waitForElement(source.item);
    return browser
      .actions()
      .dragAndDrop(source.item, destination.item)
      .perform();
  }

  /**
   * Perform 'DoubleClick' operation with Action class
   * @param target
   */
  static async actionDoubleClick(target: DfElement) {
    StepLogger.subStep(`DoubleClick '${target.name}' with Action class`);
    await WaitHelper.waitForElementToBeDisplayed(target.item);
    return await browser
      .actions()
      .doubleClick(target.item)
      .perform();
  }

  /**
   * Perform 'Click' operation with Action class
   * @param target
   */
  static async actionClick(target: DfElement) {
    StepLogger.subStep(`Click '${target.name}' with Action class`);
    await WaitHelper.waitForElementToBeDisplayed(target.item);
    return await browser
      .actions()
      .click(target.item)
      .perform();
  }

  /**
   * Perform 'HoverOver' operation with Action class
   * @param target
   */
  static async actionHoverOver(target: DfElement) {
    StepLogger.subStep(`Hover over '${target.name}'`);
    await WaitHelper.waitForElementToBeDisplayed(target.item);
    await browser
      .actions()
      .mouseMove(target.item)
      .perform();
  }

  /**
   * Perform 'HoverOverAndClick' operation with Action class
   * @param hoverOverLocator
   * @param clickLocator
   */
  static async actionHoverOverAndClick(hoverOverLocator: DfElement, clickLocator = hoverOverLocator) {
    await WaitHelper.waitForElement(hoverOverLocator.item);
    await browser
      .actions()
      .mouseMove(hoverOverLocator.item)
      .click(clickLocator.item)
      .perform();
  }

  /**
   * Get currently focused element
   */
  static async getFocusedElement() {
    StepLogger.subStep('Get FocusedElement');
    return browser.driver.switchTo().activeElement();
  }

  /**
   * Get element location
   * @param target
   */
  static async getLocation(target: DfElement): Promise<ILocation> {
    StepLogger.subStep(`Get location of '${target.name}'`);
    await WaitHelper.waitForElement(target.item);
    const location = await target.item.getLocation();
    StepLogger.subStep(`Received location: '${JSON.stringify(location)}'`);
    return location;
  }

  /**
   * Get element size
   * @param target
   */
  static async getSize(target: DfElement): Promise<ISize> {
    StepLogger.subStep(`Get size of '${target.name}'`);
    await WaitHelper.waitForElement(target.item);
    const size = await target.item.getSize();
    StepLogger.subStep(`Received size: '${JSON.stringify(size)}'`);
    return size;
  }

  /**
   * Check if element is visible
   * @param target
   */
  static isVisible(target: DfElement) {
    return this.EC.visibilityOf(target.item);
  }

  /**
   * Check if element is not visible
   * @param locator
   */
  static isNotVisible(locator: DfElement) {
    return this.EC.invisibilityOf(locator.item);
  }

  /**
   * Check if element is in dom
   * @param locator
   */
  static inDom(locator: DfElement) {
    return this.EC.presenceOf(locator.item);
  }

  /**
   * Check if element is not in dom
   * @param locator
   */
  static notInDom(locator: DfElement) {
    return this.EC.stalenessOf(locator.item);
  }

  /**
   * Check if element is clickable
   * @param locator
   */
  static isClickable(locator: DfElement) {
    return this.EC.elementToBeClickable(locator.item);
  }

  /**
   * Check if element has {text}
   * @param locator
   * @param text
   */
  static hasText(locator: DfElement, text: string) {
    return this.EC.textToBePresentInElement(locator.item, text);
  }

  /**
   * Check if element page title is {title}
   * @param title
   */
  static titleIs(title: string) {
    return this.EC.titleIs(title);
  }

  /**
   * Check if element has {klass} class
   * @param locator
   * @param klass
   */
  static async hasClass(locator: DfElement, klass: string) {
    const classes = (await locator.item.getAttribute('class')) as string;
    return classes && classes.split(' ').indexOf(klass) !== -1;
  }

  /**
   * Class has regex
   * @param target
   * @param klass
   */
  static async hasClassRegex(target: DfElement, klass: string) {
    const classAttribute = await target.getAttribute('class');
    return classAttribute.includes(klass);
  }

  /**
   * Perform 'Click' using JS
   * @param targetElement
   */
  static async clickUsingJs(targetElement: DfElement) {
    await WaitHelper.waitForElementToBeClickable(targetElement.item);
    await this.clickUsingJsNoWait(targetElement);
  }

  /**
   * Perform 'Click' using JS without waiting for element to be clickable
   * @param target
   */
  static async clickUsingJsNoWait(target: DfElement) {
    await browser.executeScript(jsScripts.click, await target.item.getWebElement());
  }

  /**
   * Select dropdown by index
   * @param target
   * @param optionNum
   */
  static async selectDropDownByIndex(target: DfElement, optionNum: number) {
    if (optionNum) {
      const options = await target.item.findElements(by.tagName('option'));
      await options[optionNum].click();
    }
  }

  /**
   * Scroll to element
   * @param target
   */
  static async scrollToElement(target: DfElement) {
    await browser.executeScript(jsScripts.scrollIntoView, target.item);
  }

  /**
   * Get attribute value
   * @param elem
   * @param attribute
   */
  static async getAttributeValue(elem: DfElement, attribute: string) {
    await WaitHelper.waitForElement(elem.item);
    const value = await elem.item.getAttribute(attribute);
    return value.trim();
  }

  /**
   * Get text
   * @param elem
   */
  static async getText(elem: DfElement) {
    StepLogger.subStep(`Get text of element: '${elem.name}'`);
    await WaitHelper.waitForElementToHaveText(elem.item);
    let text = await elem.item.getText();
    text = text.trim();
    StepLogger.subStep(`Received text: '${text}'`);
    return text;
  }

  /**
   * Open link in new tab
   * @param target
   */
  static async openLinkInNewTabUsingTarget(target: DfElement) {
    const script = 'const item = arguments[0];item.setAttribute("target", "_blank");item.click()';
    await browser.executeScript(script, await target.item.getWebElement());
  }

  /**
   * Open link in new window
   * @param target
   */
  static async openLinkInNewTabUsingWindowOpener(target: DfElement) {
    const script = 'return window.open(arguments[0].getAttribute("href"),"_blank")';
    await browser.executeScript(script, await target.item.getWebElement());
  }

  /**
   * Click 'Button' using JS
   * It logs X button is clicked using subStep
   * @param targetElement
   */
  static async clickButtonJs(targetElement: DfElement) {
    await this.clickJs(targetElement, ElementType.Button);
  }

  /**
   * Click 'Link' using JS
   * It logs X link is clicked using subStep
   * @param targetElement
   */
  static async clickLinkJs(targetElement: DfElement) {
    await this.clickJs(targetElement, ElementType.Link);
  }

  /**
   * Click 'Button'
   * It logs X button is clicked using subStep
   * @param targetElement
   */
  static async clickButton(targetElement: DfElement) {
    await this.click(targetElement, ElementType.Button);
  }

  /**
   * Click 'Link' using JS
   * It logs X link is clicked using subStep
   * @param targetElement
   */
  static async clickLink(targetElement: DfElement) {
    await this.click(targetElement, ElementType.Link);
  }

  /**
   * Click 'Checkbox' using JS
   * It logs X checkbox is clicked using subStep
   * @param targetElement
   */
  static async clickCheckbox(targetElement: DfElement) {
    await this.click(targetElement, ElementType.Checkbox);
  }

  /**
   * Click 'RadioButton' using JS
   * It logs X radio-button is clicked using subStep
   * @param targetElement
   */
  static async clickRadioButton(targetElement: DfElement) {
    await this.click(targetElement, ElementType.RadioButton);
  }

  /**
   * Click element with offset
   * @param targetElement
   * @param offset
   */
  static async clickElementWithOffset(targetElement: DfElement, offset: ILocation) {
    StepLogger.subStep(`Click '${targetElement.name}' with offset: ${JSON.stringify(offset)}`);
    await WaitHelper.waitForElementToBeDisplayed(targetElement.item);
    await browser
      .actions()
      .mouseMove(targetElement.item, offset)
      .click()
      .perform();
  }

  /**
   * Refresh page and click button
   * @param targetElement
   */
  static async refreshAndClickButton(targetElement: DfElement) {
    await browser.refresh(PageHelper.DEFAULT_TIMEOUT);
    await this.click(targetElement, ElementType.Button);
  }

  /**
   * Wait and click
   * @param targetElement
   * @param wait
   */
  static async waitAndClickButton(targetElement: DfElement, wait = PageHelper.timeout.xs) {
    await WaitHelper.waitForElementToBeDisplayed(targetElement.item);
    await WaitHelper.sleep(wait);
    try {
      await this.click(targetElement, ElementType.Button);
    } catch (e) {
      await this.clickJs(targetElement, ElementType.Button);
    }
  }

  /**
   * Perform 'MouseMoveAndClick' operation with Action class
   * @param target
   */
  static async actionMouseMoveAndClick(target: DfElement) {
    await WaitHelper.waitForElement(target.item);
    await browser
      .actions()
      .mouseMove(target.item.getWebElement())
      .perform();
    await browser
      .actions()
      .click()
      .perform();
  }

  /**
   * Perform 'MouseMoveAndClick' operation with Displayed wait using Action class
   * @param target
   */
  static async actionClickWithWait(target: DfElement) {
    await WaitHelper.waitForElementToBeDisplayed(target.item);
    await this.actionMouseMoveAndClick(target);
  }

  /**
   * Perform 'Senfkeys' operation
   * @param targetElement
   * @param value
   * @param sendEnter
   */
  static async sendKeys(targetElement: DfElement, value: string, sendEnter = false) {
    StepLogger.subStep(`Enter '${value}' in '${targetElement.name}' textbox`);
    await TextBoxHelper.sendKeys(targetElement, value, sendEnter);
  }

  /**
   * Enter text only passed {value} is defined
   * @param targetElement
   * @param value
   * @param sendEnter
   */
  static async sendKeysIfTextIsDefined(targetElement: DfElement, value: string, sendEnter = false) {
    if (value) {
      await this.sendKeys(targetElement, value, sendEnter);
    }
  }

  /**
   * Click element by coordinates
   * @param location
   */
  static async clickViaCoordinates(location: ILocation) {
    const script = (x: number, y: number) => `document.elementFromPoint(${x}, ${y}).click();`;
    await browser.driver.executeScript(script(location.x, location.y));
  }

  static async scrollToElementAlternativeMethod(target: DfElement) {
    await browser.executeScript('arguments[0].scrollIntoView();', target.item.getWebElement());
  }

  /**
   * Perform 'sendKeys' using JS
   * @param target
   */
  static async sendKeysUsingJs(target: DfElement, attributeValue: string) {
    await browser.executeScript(
      `arguments[0].setAttribute('value','${attributeValue}');`,
      await target.item.getWebElement(),
    );
  }

  static async setVisibilityOfElementInline(id: string) {
    const script = `document.getElementById('${id}').style.setProperty('display', 'inline', 'important')`;
    await browser.executeScript(script);
  }
}
