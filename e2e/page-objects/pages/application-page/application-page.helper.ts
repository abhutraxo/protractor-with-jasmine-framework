import { StepLogger } from '../../../../core/logger/step-logger';
import { CandidateEmailUtils } from '../../../api/candidate-email-utils';
import { DomainUtils } from '../../../api/domains-util';
import { TempEmailUtils } from '../../../api/temp-mail-utils';
import { StaticWait } from '../../../components/html/static-wait';
import { WaitHelper } from '../../../components/html/wait-helper';
import { DfElement } from '../../../components/misc-utils/df-elements-helper';
import { EndpointHelper } from '../../../components/misc-utils/endpoint-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { RandomHelper } from '../../../components/misc-utils/random-helper';
import { BasePageHelper } from '../base-page.helper';
import { LoginPageHelper } from '../login-page/login-page.helper';
import { LoginPage } from '../login-page/login-page.po';

import { ApplicationPageConstants } from './application-page.constants';
import { ApplicationPage } from './application-page.po';

export class ApplicationPageHelper extends BasePageHelper {
  private static vInstance: ApplicationPageHelper;

  private constructor() {
    super();
  }

  public static getInstance(): ApplicationPageHelper {
    return this.vInstance || (this.vInstance = new this());
  }

  static async verifyApplicationForm() {
    StepLogger.subVerification('Verify the application form');
    const form = ApplicationPage.form;
    await ExpectationHelper.verifyTextContains(
      form.applicationHeader,
      ApplicationPageConstants.elementNames.jobPositionHeader,
    );
    await form.firstName.verifyDisplayedStatus();
    await form.lastName.verifyDisplayedStatus();
    await form.email.verifyDisplayedStatus();
    await form.linkedIn.verifyDisplayedStatus();
    await form.country.verifyDisplayedStatus();
    await form.phone.verifyDisplayedStatus();
    await form.oneAccountCheckbox.verifyDisplayedStatus();
    await form.emailOptIn.verifyDisplayedStatus();
    await form.submitApplicationButton.verifyDisplayedStatus();
  }

  static async enterText(dfElement: DfElement, value: string) {
    StepLogger.subStep(`Enter text ${value} in ${dfElement.name}`);
    await dfElement.sendKeys(value);
  }

  static async verifyEnterText(dfElement: DfElement, value: string) {
    StepLogger.subVerification(`Verify text ${value} in entered ${dfElement.name}`);
    await ExpectationHelper.verifyTextEntered(dfElement, value);
  }

  static async verifySubmitApplicationButtonDisabled() {
    StepLogger.subVerification('Verify Submit application button disabled');
    await ApplicationPage.form.submitApplicationButton.verifyDisabledStatus();
  }

  static async verifyCountryIsSelected() {
    StepLogger.subVerification('Verify the Country is selected');
    const selectedCountry = await ApplicationPage.form.country.getText();
    StepLogger.subVerification(`Selected Country: ${selectedCountry}`);
    await ExpectationHelper.verifyValueNotEqualTo(
      ApplicationPage.form.country,
      selectedCountry,
      ApplicationPageConstants.elementNames.noCountrySelected,
    );
  }

  static async verifyTheInvalidEmailError() {
    StepLogger.subStep('Verify the Invalid Email error');
    await ApplicationPage.form.invalidEmailError.verifyDisplayedStatus();
  }

  static async enterPhoneNumberWithCountryCode(phoneNo: string) {
    StepLogger.subStep('Select the Country code');
    const countryName = 'United States';
    await ApplicationPage.form.countryDropDownArrow.clickButton();
    await ApplicationPage.form.countryDropDown.verifyDisplayedStatus();
    await ApplicationPage.form.countrySearchBox.sendKeys(countryName);
    await ApplicationPage.form.countryOption(countryName).clickButton();
    await ApplicationPage.form.countryDropDown.verifyHiddenStatus();
    await ApplicationPage.form.phone.sendKeys(phoneNo);
  }

  static async verifyOneAccountEmailOptInCheckboxUnChecked() {
    StepLogger.subVerification('Verify One Account Confirmation and Email Opt in checkbox unselected');
    await ExpectationHelper.verifyAttributeNotContains(ApplicationPage.form.oneAccountCheckbox, 'class', 'checked');
    await ExpectationHelper.verifyAttributeNotContains(ApplicationPage.form.emailOptIn, 'class', 'checked');
  }

  static async clickSubmitApplicationButton() {
    StepLogger.subStep('Click Submit application button');
    await ApplicationPage.form.submitApplicationButton.clickButton();
  }

  static async verifySubmitApplicationButtonEnabled() {
    StepLogger.subVerification('Verify Submit application button is enabled.');
    await ApplicationPage.form.submitApplicationButton.verifyEnabledStatus();
  }

  static async verifyAccurateDataError() {
    StepLogger.subVerification('Verify Accurate Data Error');
    await ApplicationPage.form.accurateDataError.verifyDisplayedStatus();
    await ExpectationHelper.verifyTextContains(
      ApplicationPage.form.accurateDataError,
      ApplicationPageConstants.elementNames.accurateDataError,
    );
  }

  static async selectConfirmationCheckBox() {
    const isOneAccountSelected = (await ApplicationPage.form.oneAccountCheckbox.getAttribute('class')).includes('checked');
    const isEmailOptInSelected = (await ApplicationPage.form.emailOptIn.getAttribute('class')).includes('checked');

    if (isOneAccountSelected === false) {
      await ApplicationPage.form.oneAccountCheckbox.clickCheckbox();
    }

    if (isEmailOptInSelected === false) {
      await ApplicationPage.form.emailOptIn.clickCheckbox();
    }
  }

  static async verifyProfileHome(userFullName: string) {
    StepLogger.subVerification('Verify Profile Home Page');
    await LoginPageHelper.verifyAvatarImage();
    await ExpectationHelper.verifyTextContains(ApplicationPage.form.profileHomeUserName, userFullName);
  }

  static async takeTourIfVisible() {
    StepLogger.subStep('Complete App tour if visible');
    const isTourVisible = await WaitHelper.waitForElementOptionallyPresent(ApplicationPage.form.dialog.item);

    if (isTourVisible === true) {
      await ApplicationPage.form.takeTourDialog.verifyDisplayedStatus();
      await ApplicationPage.form.takeTourButton.clickButton();
      await StaticWait.waitForSec(1);
      await ApplicationPage.form.followRecommendationDialog.verifyDisplayedStatus();
      await ApplicationPage.form.nextButton.clickButton();
      await StaticWait.waitForSec(1);
      await ApplicationPage.form.followProgress.verifyDisplayedStatus();
      await ApplicationPage.form.finishButton.clickButtonJs();
      await ApplicationPage.form.dialog.verifyHiddenStatus();
    }
  }

  static async createNewCandidate() {
    StepLogger.subStep('Create New Candidate');
    const firstName = `R${RandomHelper.getRandomStringWithoutNumber(6).toLowerCase()}`;
    const lastName = `Q${RandomHelper.getRandomStringWithoutNumber(4).toLowerCase()}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}_${RandomHelper.getRandomNumber(4)}@qa.test`;
    const user = {
      fName: firstName,
      lName: lastName,
      email: email,
      linkedIn: 'linkedIn123',
      phoneNumber: '2024777722',
    };

    await this.enterText(ApplicationPage.form.firstName, user.fName);
    await this.enterText(ApplicationPage.form.lastName, user.lName);
    await this.enterText(ApplicationPage.form.email, user.email);
    await this.enterText(ApplicationPage.form.linkedIn, user.linkedIn);
    await this.verifyCountryIsSelected();
    await this.enterPhoneNumberWithCountryCode(user.phoneNumber);
    await this.selectConfirmationCheckBox();
    await this.clickSubmitApplicationButton();
    await this.takeTourIfVisible();
    await this.verifyProfileHome(`${user.fName} ${user.lName}`);

    return user;
  }

  static async createNewCandidateWithTempEmail(personEmail: string) {
    StepLogger.subStep('Create New Candidate');
    const firstName = `R${RandomHelper.getRandomStringWithoutNumber(6).toLowerCase()}`;
    const lastName = `Q${RandomHelper.getRandomStringWithoutNumber(4).toLowerCase()}`;
    const user = {
      fName: firstName,
      lName: lastName,
      email: personEmail,
      linkedIn: 'linkedIn123',
      phoneNumber: '2024777722',
    };

    await this.enterText(ApplicationPage.form.firstName, user.fName);
    await this.enterText(ApplicationPage.form.lastName, user.lName);
    await this.enterText(ApplicationPage.form.email, user.email);
    await this.enterText(ApplicationPage.form.linkedIn, user.linkedIn);
    await this.verifyCountryIsSelected();
    await this.enterPhoneNumberWithCountryCode(user.phoneNumber);
    await this.selectConfirmationCheckBox();
    await this.clickSubmitApplicationButton();
    await this.takeTourIfVisible();
    await this.verifyProfileHome(`${user.fName} ${user.lName}`);
    return user;
  }

  static async createTemporaryEmail(firstName: string, lastName: string) {
    const res = await DomainUtils.getDomains();
    let domains = `${res.response.body}`;
    const end = domains.length;
    const start = domains.lastIndexOf(',') + 1;
    domains = domains.substr(start, end);
    const tempEmail = `${firstName}.${lastName}_${RandomHelper.getRandomNumber(4)}${domains}`.toLowerCase();
    return tempEmail;
  }

  static async verifyResetEmailPresent(email: string) {
    StepLogger.subVerification('Verify Reset password email is preset');
    StepLogger.subStep('Get emails');
    const response = await TempEmailUtils.getEmails(email);
    StepLogger.subStep(`${response.length}`);
    const result = response[1].mailSubject;
    await ExpectationHelper.verifyStringValueContain(
      LoginPage.login.resetPasswordButton,
      result,
      ApplicationPageConstants.elementNames.passwordResetEmailSubject,
    );
    return response[1].mailTextOnly;
  }

  static getResetPassword(response: string) {
    const emailContent = response.match(/"([^']+)"/)[1];
    return emailContent;
  }

  static async getPasswordRecoveryCount(email: string) {
    StepLogger.subStep('Get the Password recovery count');
    const recoveryCount = await CandidateEmailUtils.getCandidateLoginDetails(email);
    return recoveryCount.content.records[0];
  }

  static async verifyResetPasswordTimeAndCount(record: any) {
    StepLogger.subVerification('Verify Reset Password password time and count');
    const recoveryCount = record.Password_Recovery_Count__c;
    const recoveryTime = record.Last_Password_Recovery__c;
    const flag = recoveryTime != null && recoveryCount === 1;
    await ExpectationHelper.verifyValueIsTrue(flag);
  }

  static async verifyTakeTourAlertPresent() {
    StepLogger.subVerification('Verify Take tour Alert is present');
    await ApplicationPage.form.takeTourDialog.verifyDisplayedStatus();
    await ApplicationPage.form.takeTourButton.verifyDisplayedStatus();
  }

  static async clickTakeTourButton() {
    StepLogger.subStep('Click take the tour button');
    await ApplicationPage.form.takeTourButton.clickButton();
  }

  static async clickNextButton() {
    StepLogger.subStep('Click Next Button on tutorial');
    await ApplicationPage.form.nextButton.clickButton();
  }

  static async clickFinishButton() {
    StepLogger.subStep('Click Finish Button on tutorial');
    await ApplicationPage.form.finishButton.clickButton();
  }

  static async verifyFollowRecommendationDialog() {
    StepLogger.subVerification('Verify Follow Recommendation alert is present');
    await ApplicationPage.form.followRecommendationDialog.verifyDisplayedStatus();
    await ApplicationPage.form.nextButton.verifyDisplayedStatus();
  }

  static async verifyFollowProgressDialog() {
    StepLogger.subVerification('Verify the Follow Progress Dialog');
    await ApplicationPage.form.followProgress.verifyDisplayedStatus();
    await ApplicationPage.form.finishButton.verifyDisplayedStatus();
  }

  static async verifyTutorialIsHidden() {
    StepLogger.subVerification('Verify the tutorial is hidden');
    await ApplicationPage.form.takeTourDialog.verifyHiddenStatus();
  }

  static async verifyApplicationFormForLoggedInCandidate(user: any) {
    StepLogger.subVerification('Verify Application form for logged in candidate');
    await ExpectationHelper.verifyAttributeContains(ApplicationPage.form.firstName, 'value', user.fName);
    await ExpectationHelper.verifyAttributeContains(ApplicationPage.form.lastName, 'value', user.lName);
    await ExpectationHelper.verifyAttributeContains(ApplicationPage.form.email, 'value', user.email);
    await ExpectationHelper.verifyAttributeContains(ApplicationPage.form.linkedIn, 'value', user.linkedIn);
  }

  static async verifyYouHaveActiveApplicationAlert() {
    StepLogger.subVerification('Verify the You have active application');
    await ApplicationPage.form.youHaveApplication.verifyDisplayedStatus();
    await ExpectationHelper.verifyTextContains(
      ApplicationPage.form.youHaveApplication,
      ApplicationPageConstants.elementNames.haveApplication,
    );
    await ApplicationPage.form.goToMyApplicationButton.verifyDisplayedStatus();
  }

  static async clickGotoMyApplicationButton() {
    StepLogger.subStep('Click Go to My Active application Button');
    await ApplicationPage.form.goToMyApplicationButton.clickButton();
  }

  url(): string {
    return EndpointHelper.applicationPage();
  }
}
