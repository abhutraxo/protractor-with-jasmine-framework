import { by } from 'protractor';

import { ComponentHelpers } from '../../../components/component-helpers/component-helpers';
import { $ } from '../../../components/misc-utils/df-elements-helper';
import { ValidationsHelper } from '../../../components/misc-utils/validation-helper';

import { ApplicationPageConstants } from './application-page.constants';

const {
  attributes: { classes, ids, formcontrolname: fNames },
  elementNames: eNames,
} = ApplicationPageConstants;
export class ApplicationPage {
  static readonly form = Object.freeze({
    get firstName() {
      return $(by.css(`[formcontrolname='${fNames.firstName}']`), eNames.firstName);
    },

    get lastName() {
      return $(by.css(`[formcontrolname='${fNames.lastName}']`), eNames.lastName);
    },

    get email() {
      return $(by.css(`[formcontrolname='${fNames.email}']`), fNames.email);
    },

    get linkedIn() {
      return $(by.css(`[formcontrolname='${fNames.linkedIn}']`), fNames.linkedIn);
    },

    get country() {
      return $(by.css(`[formcontrolname='${fNames.country}']`), eNames.country);
    },

    get phone() {
      return $(by.css(`input[id='${fNames.phone}']`), eNames.phone);
    },

    get oneAccountCheckbox() {
      return $(by.css(`[formcontrolname='${fNames.oneAccount}']`), eNames.oneAccount);
    },

    get emailOptIn() {
      return $(by.css(`[formcontrolname='${fNames.emailOptIn}']`), eNames.emailOptIn);
    },

    get submitApplicationButton() {
      return $(by.css(`[class*='${classes.submitApplication}']`), eNames.submitApplication);
    },

    get applicationHeader() {
      return $(by.css(`[class*='${classes.jobPositionHeader}']`), eNames.jobPositionHeader);
    },

    get invalidEmailError() {
      return $(by.cssContainingText(`[class*='${classes.error}']`, eNames.invalidEmail), eNames.invalidEmail);
    },

    get countryDropDownArrow() {
      return $(by.css(`[class='${classes.dropDownArrow}']`), eNames.countryCodeDropDownArrow);
    },

    get countryDropDown() {
      return $(by.css(`[class*='${classes.countryDropdown}']`), eNames.countryDropDown);
    },

    get countrySearchBox() {
      return $(by.id(`${ids.countrySearchBox}`), eNames.countrySearchBox);
    },

    countryOption(countryName: string) {
      return $(by.cssContainingText(`span[class*='${classes.countryCodeDropDown}']`, countryName), countryName);
    },

    get accurateDataError() {
      return $(by.css(`[class*='${classes.accurateDataError}']`), eNames.accurateDataError);
    },

    get profileHomeUserName() {
      return $(by.css(`[class='${classes.profileUserName}']`), eNames.profileHomeUserName);
    },

    get dialog() {
      return $(by.css(`[class*='${classes.dialogContainer}']`), eNames.takeTour);
    },

    get takeTourButton() {
      return $(
        by.xpath(`//*[contains(text(), '${eNames.takeTour}')]/parent::button`),
        ValidationsHelper.getButtonDisplayedValidation(eNames.takeTour),
      );
    },

    get nextButton() {
      return $(
        by.xpath(`//*[${ComponentHelpers.getXPathFunctionForText(eNames.next, true)}]/parent::button`),
        ValidationsHelper.getButtonDisplayedValidation(eNames.next),
      );
    },

    get finishButton() {
      return $(
        by.xpath(`//*[${ComponentHelpers.getXPathFunctionForText(eNames.finish, true)}]/parent::button`),
        ValidationsHelper.getButtonDisplayedValidation(eNames.finish),
      );
    },

    get takeTourDialog() {
      return $(
        by.xpath(`//*[${ComponentHelpers.getXPathFunctionForClass(classes.tutorialTitle, true)} and
        ${ComponentHelpers.getXPathFunctionForText(eNames.takeTourTitle, true)}]/
        parent::*`),
        eNames.takeTourTitle,
      );
    },

    get followRecommendationDialog() {
      return $(
        by.xpath(`//*[${ComponentHelpers.getXPathFunctionForClass(classes.tutorialTitle, true)} and
        ${ComponentHelpers.getXPathFunctionForText(eNames.followRecommendation)}]/parent::*`),
        eNames.followRecommendation,
      );
    },

    get followProgress() {
      return $(
        by.xpath(`//*[${ComponentHelpers.getXPathFunctionForClass(classes.tutorialTitle, true)} and
        ${ComponentHelpers.getXPathFunctionForText(eNames.followProgress)}]/parent::*`),
        eNames.followProgress,
      );
    },

    get youHaveApplication() {
      return $(by.xpath(`//div[contains(@class, '${classes.alterTitle}')]/span`), eNames.haveApplication);
    },

    get goToMyApplicationButton() {
      return $(
        by.xpath(`//div[contains(@class, '${classes.dialogActions}')]
      /button[contains(., '${eNames.goToMyApplication}')]`),
        eNames.goToMyApplication,
      );
    },
  });
}
