import { by } from 'protractor';

import { $ } from '../../../components/misc-utils/df-elements-helper';

import { LoginPageConstants } from './login-page.constants';

const { attributes: { classes, formcontrolname: fNames }, elementNames: eNames } = LoginPageConstants;
export class LoginPage {
  static readonly login = Object.freeze({
    get loginHeader() {
      return $(by.css(`[class*='${classes.loginHeader}']`), eNames.loginHeader);
    },

    get username() {
      return $(by.css(`[formcontrolname = ${fNames.username}`), eNames.username);
    },

    get password() {
      return $(by.css(`[formcontrolname = ${fNames.password}`), eNames.password);
    },

    get emailRequiredError() {
      return $(by.cssContainingText(`[class*='${classes.error}']`, eNames.emailRequiredError), eNames.emailRequiredError);
    },

    get passRequiredError() {
      return $(by.cssContainingText(`[class*='${classes.error}']`, eNames.passwordRequiredError), eNames.passwordRequiredError);
    },

    get validEmailError() {
      return $(by.cssContainingText(`[class*='${classes.error}']`, eNames.validEmailError), eNames.validEmailError);
    },

    get clickHereLink() {
      return $(by.cssContainingText(`[class*='${classes.clickHere}']`, eNames.clickHere), eNames.clickHere);
    },

    get passwordRecoveryHeader() {
      return $(by.cssContainingText(`[class*='${classes.loginHeader}']`, eNames.passwordRecoveryHeader), eNames.passwordRecoveryHeader);
    },

    get resetPasswordButton() {
      return $(by.cssContainingText(`[class*='${classes.resetPasswordButton}']`, eNames.resetPassword), eNames.resetPassword);
    },

    get loginButton() {
      return $(by.xpath('//app-login/form/button'), eNames.loginButton);
    },

    get invalidLoginErrorMsg() {
      return $(by.css(`${classes.errorBar}[message*='${eNames.invalidLogin}']`), eNames.invalidLogin);
    },

    get avatarImage() {
      return $(by.xpath(`//*[contains(@class, '${classes.userMenu}')]
        /button/img[contains(@class, '${classes.avatarImage}')]`), eNames.avatarImage);
    },

    get menu() {
      return $(by.css(`[role='${classes.menu}']`), eNames.menu);
    },

    get logoutButton() {
      return $(by.xpath(`//div[@role = 'menu']/div
        /*[contains(@role, 'menuitem') and contains(.,'${eNames.logOut}')]`), eNames.logOut);
    },

    get notRegisteredErrorMsg() {
      return $(by.css(`${classes.errorBar}[faclass='${classes.errorClass}']`), eNames.notRegisteredErrorMsg);
    },

    get resetPasswordMsg() {
      return $(by.css(`${classes.errorBar}[faclass*='${classes.success}']`), eNames.passwordResetMsg);
    },

    get loginHereLink() {
      return $(by.cssContainingText(`[class*='${classes.clickHere}']`, eNames.loginHere), eNames.loginHere);
    },
  });
}
