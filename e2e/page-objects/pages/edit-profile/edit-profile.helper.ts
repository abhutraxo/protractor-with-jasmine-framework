import * as fs from 'fs';
import * as path from 'path';

import { StepLogger } from '../../../../core/logger/step-logger';
import { DateHelper } from '../../../components/misc-utils/date-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { ProfilePage } from '../profile-page/profile-page.po';

import { EditProfilePage } from './edit-profile.po';

const { profileEdit: pe } = EditProfilePage;
export class EditProfileHelper {
  static async clickEditButton() {
    StepLogger.subStep('Click Edit button');
    await pe.editButton.clickButton();
  }

  static async verifyEditDialogOpen() {
    StepLogger.subVerification('Verify Edit Dialog open');
    await pe.editProfileDialog.verifyDisplayedStatus();
  }

  static async verifyEditProfileDialogDetails() {
    StepLogger.subVerification('Verify Edit Profile Screen');
    await pe.header.verifyDisplayedStatus();
    await pe.firstName.verifyDisplayedStatus();
    await pe.firstName.verifyDisabledStatus();
    await pe.lastName.verifyDisplayedStatus();
    await pe.lastName.verifyDisabledStatus();
    await pe.email.verifyDisplayedStatus();
    await pe.email.verifyDisabledStatus();
    await pe.linkedIn.verifyDisplayedStatus();
    await pe.linkedIn.verifyDisabledStatus();
    await pe.country.verifyDisplayedStatus();
    await pe.phone.verifyDisplayedStatus();
    await pe.city.verifyDisplayedStatus();
    await pe.resume.verifyDisplayedStatus();
    await pe.timeZone.verifyDisplayedStatus();
    await pe.availability.verifyDisplayedStatus();
    await pe.cancelButton.verifyDisplayedStatus();
    await pe.saveButton.verifyDisplayedStatus();
    await pe.avatar.verifyDisplayedStatus();
  }

  static async verifyCandidatePersonalInformation(fName: string, lName: string, email: string) {
    StepLogger.subVerification('Verify Candidate Personal Information ex: first name etc');
    await ExpectationHelper.verifyAttributeValue(pe.firstName, 'value', fName);
    await ExpectationHelper.verifyAttributeValue(pe.lastName, 'value', lName);
    await ExpectationHelper.verifyAttributeValue(pe.email, 'value', email);
  }

  static async enterPhoneNumber(phoneNo: string) {
    StepLogger.subStep('Enter Phone Number');
    await pe.phone.sendKeys(phoneNo);
  }

  static async verifyInvalidPhoneErrorMessage() {
    StepLogger.subVerification('Verify Invalid Phone number error is displayed');
    await pe.invalidPhoneNoError.verifyDisplayedStatus();
  }

  static async enterCity(city: string) {
    StepLogger.subStep('Enter the City Name');
    await pe.city.sendKeys(city);
  }

  static async verifyCityName(city: string) {
    StepLogger.subStep('Verify the City Name');
    await ExpectationHelper.verifyAttributeValue(pe.city, 'value', city);
  }

  static async getCurrentPhoneNumber() {
    let currentPhoneNo = await pe.phone.getAttribute('value');
    currentPhoneNo = currentPhoneNo.replace(/[^0-9a-zA-Z]/g, '');
    return currentPhoneNo;
  }

  static async updatePhoneNumber(currentPhoneNo: string) {
    StepLogger.subStep('Update the phone number of candidate');
    let updatedPhoneNo: string;
    if (currentPhoneNo.includes('2024777722')) {
      await this.enterPhoneNumber('2024777733');
      updatedPhoneNo = '2024777733';
    } else {
      await this.enterPhoneNumber('2024777722');
      updatedPhoneNo = '2024777722';
    }
    return updatedPhoneNo;
  }

  static async verifyNoInvalidPhoneErrorMessage() {
    StepLogger.subVerification('Verify Invalid Phone number error is displayed');
    await pe.invalidPhoneNoError.verifyHiddenStatus();
  }

  static async uploadAvatarImage(filepath: string) {
    StepLogger.subStep('Upload Image to Avatar');
    await pe.avatarInput.item.sendKeys(filepath);
  }

  static fileWrite(filepath: string) {
    const today = DateHelper.getFormattedDate();
    const time = new Date();
    const resumeText = `This is resume file write on ${today}::${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    fs.writeFile(filepath, resumeText, function(err: any) {
      console.log(err);
    });
    return resumeText;
  }

  static async uploadResume(filepath: string) {
    StepLogger.subStep('Upload the resume');
    await pe.uploadInput.item.sendKeys(filepath);
  }

  static async verifyResumeFileUploaded(fileName: string) {
    StepLogger.subVerification('Verify Resume is added');
    await ExpectationHelper.verifyAttributeValue(pe.resume, 'value', fileName);
  }

  static async uploadDifferentAvatarImage() {
    StepLogger.subVerification('Upload Different Avatar Image');
    let fileName: string;
    let filePath: string;
    const currentFilePath = await pe.avatar.getAttribute('src');
    if (currentFilePath.includes('avatar-1')) {
      fileName = 'avatar-2.jpg';
      filePath = path.join(path.resolve('.') + '/e2e/resources/' + fileName);
      this.uploadAvatarImage(filePath);
    } else {
      fileName = 'avatar-1.jpg';
      filePath = path.join(path.resolve('.') + '/e2e/resources/' + fileName);
      this.uploadAvatarImage(filePath);
    }
    return fileName;
  }

  static async clickSaveButton() {
    StepLogger.subStep('Click Save button');
    await pe.saveButton.clickButton();
  }

  static async verifyEditDialogClose() {
    StepLogger.subVerification('Verify Edit Dialog open');
    await pe.editProfileDialog.verifyHiddenStatus();
  }

  static async verifyAvatarImageOnProfileHome(fileName: string) {
    StepLogger.subStep('Verify Avatar Image on Profile Home');
    await ExpectationHelper.verifyAttributeContains(ProfilePage.profile.avatar, 'src', fileName);
  }

  static async verifyCandidateUpdateMobileNo(updateNo: string) {
    let phoneNo = await ProfilePage.profile.candidatePhone.getText();
    phoneNo = phoneNo.replace(/-/g, '');
    await ExpectationHelper.verifyStringValueContain(ProfilePage.profile.candidatePhone, phoneNo, updateNo);
  }

  static deleteAlreadyDownloadedFiles() {
    const today = DateHelper.getFormattedDate(0, 0, 0, '-', 'YYYYMMDD');
    const fileName = `Candidate Profile QA Data-CV-${today}.txt`;
    const filepath = path.join(path.resolve('.') + `/e2e/resources/Downloads/${fileName}`);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }

  static verifyResumeFileDownload() {
    const today = DateHelper.getFormattedDate(0, 0, 0, '-', 'YYYYMMDD');
    const fileName = `Candidate Profile QA Data-CV-${today}.txt`;
    const filepath = path.join(path.resolve('.') + `/e2e/resources/Downloads/${fileName}`);
    StepLogger.step(`${filepath}`);
    if (fs.existsSync(filepath)) {
      console.log('Resume File downloaded.');
    } else {
      console.log('Getting the ERROR while downloading file as file is not downloaded.');
    }
  }

  static verifyResumeContent(content: string) {
    const today = DateHelper.getFormattedDate(0, 0, 0, '-', 'YYYYMMDD');
    const fileName = `Candidate Profile QA Data-CV-${today}.txt`;
    const filepath = path.join(path.resolve('.') + `/e2e/resources/Downloads/${fileName}`);
    fs.readFile(filepath, function(err: any, data: Buffer) {
      if (err) {
        console.log(err);
      }
      StepLogger.subVerification(`Resume content: ${data.toString()}`);
      expect(content).toEqual(data.toString());
    });
  }
}
