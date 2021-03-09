import { StepLogger } from '../../../../core/logger/step-logger';
import { CandidateEmailUtils } from '../../../api/candidate-email-utils';
import { StaticWait } from '../../../components/html/static-wait';
import { WaitHelper } from '../../../components/html/wait-helper';
import { Constants } from '../../../components/misc-utils/constants';
import { DfElement } from '../../../components/misc-utils/df-elements-helper';
import { EndpointHelper } from '../../../components/misc-utils/endpoint-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { BasePageHelper } from '../base-page.helper';

import { LoginPageConstants } from './login-page.constants';
import { LoginPage } from './login-page.po';

export class LoginPageHelper extends BasePageHelper {
  private static vInstance: LoginPageHelper;

  private constructor() {
    super();
  }

  public static getInstance(): LoginPageHelper {
    return this.vInstance || (this.vInstance = new this());
  }

  static async verifyLoginPage() {
    StepLogger.subVerification('Verify the login page');
    await LoginPage.login.loginHeader.verifyDisplayedStatus();
    await LoginPage.login.username.verifyDisplayedStatus();
    await LoginPage.login.password.verifyDisplayedStatus();
  }

  static async enterText(dfElement: DfElement, value = Constants.EMPTY_STRING) {
    StepLogger.subStep(`Enter ${value} in ${dfElement.name}`);
    await dfElement.sendKeys(value);
  }

  static async verifyEmailRequiredError() {
    StepLogger.subVerification('Verify the Email is required error');
    await LoginPage.login.emailRequiredError.verifyDisplayedStatus();
  }

  static async verifyPasswordRequiredError() {
    StepLogger.subVerification('Verify the Password Required error message');
    await LoginPage.login.passRequiredError.verifyDisplayedStatus();
  }

  static async verifyInvalidEmailError() {
    StepLogger.subVerification('Verify the invalid email error');
    await LoginPage.login.validEmailError.verifyDisplayedStatus();
  }

  static async clickForgotPassClickHereLink() {
    StepLogger.subStep('Click Forgot Password Click here link');
    await LoginPage.login.clickHereLink.clickLink();
  }

  static async verifyForgotPasswordCard() {
    StepLogger.subVerification('Verify the Forgot password Card');
    await LoginPage.login.passwordRecoveryHeader.verifyDisplayedStatus();
    await LoginPage.login.username.verifyDisplayedStatus();
    await LoginPage.login.resetPasswordButton.verifyDisplayedStatus();
  }

  static async verifyEnteredText(dfElement: DfElement, value: string) {
    StepLogger.subVerification(`Verify Entered ${value} in ${dfElement.name}`);
    await ExpectationHelper.verifyTextEntered(dfElement, value);
  }

  static async clickLoginButton() {
    StepLogger.subStep('Click Login Button');
    await LoginPage.login.loginButton.clickButton();
  }

  static async verifyInvalidLoginError() {
    StepLogger.subVerification('Verify Invalid Login Error');
    await LoginPage.login.invalidLoginErrorMsg.verifyDisplayedStatus();
  }

  static async getInvalidLoginCount(email: string) {
    StepLogger.subStep('Get the Invalid login count');
    const invalidCount = await CandidateEmailUtils.getCandidateLoginDetails(email);
    return invalidCount.content.records[0].Failed_Login_Count__c;
  }

  static async verifyInvalidLoginCountIncrement(email: string, previousCount: number) {
    StepLogger.subVerification('Verify Invalid Login count incremented');
    const lastFailedCount = await this.getInvalidLoginCount(email);
    const flag =  ((previousCount + 1) === (lastFailedCount));
    await ExpectationHelper.verifyValueIsTrue(flag);
  }

  static async verifyAvatarImage() {
    StepLogger.subStep('Verify the Avatar Image');
    await LoginPage.login.avatarImage.verifyDisplayedStatus();
  }

  static async getSuccessLoginCount(email: string) {
    StepLogger.subStep('Get the Success login count');
    const successCount = await CandidateEmailUtils.getCandidateLoginDetails(email);
    return successCount.content.records[0].Successful_Login_Count__c;
  }

  static async verifySuccessfulCount(email: string, previousSuccessCount: number) {
    StepLogger.subStep('Verify Successful count');
    const lastSuccessLoginCount = await this.getSuccessLoginCount(email);
    const flag = (lastSuccessLoginCount === (previousSuccessCount + 1));
    await ExpectationHelper.verifyValueIsTrue(flag);
  }

  static async clickAvatarImage() {
    StepLogger.subStep('Click Avatar Image');
    await LoginPage.login.avatarImage.clickButton();
  }

  static async verifyMenuOpen() {
    StepLogger.subVerification('Verify Menu is open');
    await LoginPage.login.menu.verifyDisplayedStatus();
  }

  static async clickLogoutOption() {
    StepLogger.subStep('Click Logout option');
    await WaitHelper.waitForElementToBePresent(LoginPage.login.logoutButton.item);
    await LoginPage.login.logoutButton.clickButtonJs();
  }

  static async profileLogin(username: string, password: string) {
    StepLogger.subStep('Login into the profile');
    await this.enterText(LoginPage.login.username, username);
    await this.enterText(LoginPage.login.password, password);
    await this.clickLoginButton();
    await this.verifyAvatarImage();
  }

  static async logout() {
    StepLogger.subStep('Logout of the application');
    await this.clickAvatarImage();
    await this.verifyMenuOpen();
    await StaticWait.waitForSec(2);
    await this.clickLogoutOption();
    await this.verifyLoginPage();
  }

  static async clickClickHereLink() {
    StepLogger.subStep('Click "Click Here" link');
    await LoginPage.login.clickHereLink.clickLink();
  }

  static async clickResetPasswordButton() {
    StepLogger.subStep('Click Forgot password button');
    await LoginPage.login.resetPasswordButton.clickButton();
  }

  static async verifyNotRegisteredErrorMsg() {
    StepLogger.subVerification('Verify Not Registered Error Message');
    await ExpectationHelper.verifyTextContains(LoginPage.login.notRegisteredErrorMsg, LoginPageConstants.elementNames.notRegisteredErrorMsg);
  }

  static async clickLoginHereLink() {
    StepLogger.subStep('Click Login here link');
    await LoginPage.login.loginHereLink.clickLink();
  }

  static async verifyResetPasswordMessage() {
    StepLogger.subVerification('Verify Reset Password Success Message');
    await ExpectationHelper.verifyTextContains(LoginPage.login.resetPasswordMsg, LoginPageConstants.elementNames.passwordResetMsg);
  }

  static async candidateLogin(userName: string, password: string) {
    StepLogger.subStep('Login in to the profile page');
    await LoginPageHelper.enterText(LoginPage.login.username, userName);
    await LoginPageHelper.enterText(LoginPage.login.password, password);
    await this.clickLoginButton();
  }

  static async candidateLogout() {
    StepLogger.subVerification('Verify the Candidate Avatar is displayed');
    const elementPresent = await WaitHelper.waitForElementOptionallyPresent(LoginPage.login.avatarImage.item, 5000);
    if (elementPresent === true) {
      await this.clickAvatarImage();
      await this.verifyMenuOpen();
      await this.clickLogoutOption();
      await this.verifyLoginPage();
    }
  }

  url(): string {
    return EndpointHelper.login;
  }

}
