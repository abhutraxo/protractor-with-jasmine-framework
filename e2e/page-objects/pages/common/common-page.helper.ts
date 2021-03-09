import { browser } from 'protractor';

import { PageHelper } from '../../../components/html/page-helper';

export class CommonPageHelper {
  static async deleteAllCookiesAndRefresh() {
    await browser.manage().deleteAllCookies();
    await PageHelper.refreshPage();
  }

  static loginTestUsername(): string {
    return browser.params.users.loginTest.username;
  }

  static adminPassword(): string {
    return 'pass1234';
  }

  static switchUiUsername(): string {
    return browser.params.users.switchUi.username;
  }

  static candidateProfileUsername(): string {
    return browser.params.users.candidateProfile.username;
  }

  static candidateProfileFirstName(): string {
    return browser.params.users.candidateProfile.firstName;
  }

  static candidateProfileLastName(): string {
    return browser.params.users.candidateProfile.lastName;
  }
}
