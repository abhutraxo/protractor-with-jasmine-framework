import { by } from 'protractor';

import { ComponentHelpers } from '../../../components/component-helpers/component-helpers';
import { $ } from '../../../components/misc-utils/df-elements-helper';

import { EditProfilePageConstants } from './edit-profile.constants';

const {
  attributes: { classes, formControlName: fNames, ids },
  elementNames: eNames,
} = EditProfilePageConstants;
export class EditProfilePage {
  static readonly profileEdit = Object.freeze({
    get editButton() {
      return $(
        by.xpath(`//*[${ComponentHelpers.getXPathFunctionForClass(classes.editTextButton, true)}]
      /parent::span/parent::button`),
        eNames.edit,
      );
    },

    get editProfileDialog() {
      return $(by.css(`div[class*='${classes.editProfile}']`), eNames.editProfile);
    },

    get header() {
      return $(by.cssContainingText(`[class*='${classes.header}']`, eNames.editProfile), eNames.editProfile);
    },

    get firstName() {
      return $(by.css(`[formcontrolname='${fNames.firstName}']`), fNames.firstName);
    },

    get lastName() {
      return $(by.css(`[formcontrolname='${fNames.lastName}']`), fNames.lastName);
    },

    get email() {
      return $(by.css(`[formcontrolname='${fNames.email}']`), fNames.email);
    },

    get linkedIn() {
      return $(by.css(`[formcontrolname='${fNames.linkedIn}']`), 'LinkedIn');
    },

    get country() {
      return $(by.css(`[formcontrolname='${fNames.country}']`), fNames.country);
    },

    get city() {
      return $(by.css(`[formcontrolname='${fNames.city}']`), fNames.city);
    },

    get resume() {
      return $(by.css(`[formcontrolname='${fNames.resume}']`), fNames.resume);
    },

    get timeZone() {
      return $(by.css(`[formcontrolname='${fNames.timeZone}']`), fNames.timeZone);
    },

    get availability() {
      return $(by.css(`[formcontrolname='${fNames.availability}']`), fNames.availability);
    },

    get phone() {
      return $(by.css(`[id='${ids.phone}']`), ids.phone);
    },

    get saveButton() {
      return $(by.buttonText(`${eNames.save}`), eNames.save);
    },

    get cancelButton() {
      return $(by.buttonText(`${eNames.cancel}`), eNames.cancel);
    },

    get avatar() {
      return $(by.css(`[class='${classes.avatar}']`), eNames.avatar);
    },

    get invalidPhoneNoError() {
      return $(by.cssContainingText(`[class*='${classes.error}']`, eNames.invalidPhoneError), eNames.invalidPhoneError);
    },

    get avatarInput() {
      return $(by.xpath(`//img[@class='${classes.avatar}']/parent::div/following-sibling::input`), eNames.avatar);
    },

    get uploadInput() {
      return $(by.css(`[class*='${classes.uploadResume}'] input[type='file']`), 'Upload Resume Input');
    },
  });
}
