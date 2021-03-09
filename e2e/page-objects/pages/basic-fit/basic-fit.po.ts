import { by } from 'protractor';

import { ComponentHelpers } from '../../../components/component-helpers/component-helpers';
import { $ } from '../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../components/misc-utils/html-helper';

import { BasicFitConstants } from './basic-fit.constant';

const { attributes: { classes }, elementNames: eNames } = BasicFitConstants;
export class BasicFitPage {
  static readonly bfq = Object.freeze({
    get bfqQuestion() {
      return $(by.css(`[class*='${classes.questionTitle}']`), eNames.question);
    },

    bfqOptions(option: string) {
      return $(by.cssContainingText(`[class*='${classes.radioButtonDisplay}']`, option), option);
    },

    get submitButton() {
      return $(by.xpath(`//*[contains(@class, '${classes.submitButton}') and @type = 'submit']`), eNames.submit);
    },

    bfqOptionsInput(option: string) {
      return $(by.xpath(`//*[contains(@class, '${classes.radioButtonDisplay}') and contains(text(), '${option}')]
        /parent::label/parent::div/input `), `${option} input`);
    },

    get iframe() {
      return $(by.css(`iframe[class*='${classes.iframe}']`), 'Iframe');
    },

    get waitingMessage() {
      return $(by.cssContainingText(HtmlHelper.tags.h4, eNames.waitingMessage), eNames.waitingMessage);
    },

    bfqSuccessStatus(position: string) {
      return $(by.xpath(`//*[${ComponentHelpers.getXPathFunctionForClass(classes.roleColum, true)}
      and ${ComponentHelpers.getXPathFunctionForDot(position, true)}]
      /following-sibling::td[${ComponentHelpers.getXPathFunctionForClass(classes.bfqColum, true)}]
          /i[${ComponentHelpers.getXPathFunctionForClass(classes.successCheck, true)}]`), eNames.successCheck);
    },

    get bfqStatusNotification() {
      return $(by.css(`[class*='${classes.successBar}']`), eNames.successBar);
    },

    activeSkillBadge(position: string) {
      return $(by.xpath(`//*//*[${ComponentHelpers.getXPathFunctionForClass(classes.roleColum, true)}
        and ${ComponentHelpers.getXPathFunctionForDot(position, true)}]
        /following-sibling::*[${ComponentHelpers.getXPathFunctionForClass(classes.skillColum, true)}]
        /div/*[${ComponentHelpers.getXPathFunctionForClass(classes.tableBadge, true)} and
          ${ComponentHelpers.getXPathFunctionForClass(classes.active, true)}]`), eNames.nextActiveSkillBadge);
    },

    get toolTip() {
      return $(by.css(`${classes.tooltipComponent} div[class*='${classes.tooltip}']`), eNames.toolTip);
    },
  });
}
