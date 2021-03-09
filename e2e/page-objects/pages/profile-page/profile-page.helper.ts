import { StepLogger } from '../../../../core/logger/step-logger';
import { CandidateDetailsUtils } from '../../../api/candidate-details-utils';
import { getName } from '../../../components/misc-utils/country-list/country-list';
import { DateHelper } from '../../../components/misc-utils/date-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';

import { ProfilePageConstants } from './profile-page.constant';
import { ProfilePage } from './profile-page.po';

export class ProfilePageHelper {
  static async verifyCandidatePersonalInformation() {
    StepLogger.subVerification('Verify the candidate personal Information');
    await ProfilePage.profile.candidateLocation.verifyDisplayedStatus();
    await ProfilePage.profile.candidateTimeZone.verifyDisplayedStatus();
    await ProfilePage.profile.candidateInfoHeader.verifyDisplayedStatus();
    await ProfilePage.profile.candidatePhone.verifyDisplayedStatus();
    await ProfilePage.profile.candidateEmail.verifyDisplayedStatus();
    await ProfilePage.profile.candidateLinkedIn.verifyDisplayedStatus();
    await ProfilePage.profile.candidateResume.verifyDisplayedStatus();
  }

  static async verifyCandidatePersonalInfoDetails(email: string) {
    StepLogger.subVerification('Verify The Candidate the personal information details');
    const candidateDetails = await CandidateDetailsUtils.getCandidateData(email);
    const record = candidateDetails.content.records[0];

    const timeZone = await ProfilePage.profile.candidateTimeZone.getText();
    await ExpectationHelper.verifyStringValueContain(ProfilePage.profile.candidateTimeZone, timeZone, record.Timezone__c);

    const country = await ProfilePage.profile.candidateLocation.getText();
    await ExpectationHelper.verifyStringValueContain(
      ProfilePage.profile.candidateTimeZone,
      country.toLowerCase(),
      getName(record.PersonMailingCountry).toLowerCase(),
    );

    const phoneNo = await ProfilePage.profile.candidatePhone.getText();
    await ExpectationHelper.verifyStringValueContain(ProfilePage.profile.candidatePhone, phoneNo, record.Phone);

    const personEmail = await ProfilePage.profile.candidateEmail.getText();
    await ExpectationHelper.verifyStringValueContain(ProfilePage.profile.candidateEmail, personEmail, record.PersonEmail);

    const linkedIn = await ProfilePage.profile.candidateLinkedIn.getText();
    await ExpectationHelper.verifyStringValueContain(ProfilePage.profile.candidateLinkedIn, record.Website, linkedIn);
  }

  static async verifyCandidateTimeline() {
    StepLogger.subVerification('Verify Candidate time line');
    const todayDate = DateHelper.getTodayFormattedDate();
    await ProfilePage.profile.candidateTimeline.verifyDisplayedStatus();
    await ProfilePage.profile.appliedFor.verifyDisplayedStatus();
    await ProfilePage.profile.createAccount.verifyDisplayedStatus();
    await ExpectationHelper.verifyStringValueEqualTo(
      ProfilePage.profile.appliedForDate,
      await ProfilePage.profile.appliedForDate.getText(),
      todayDate,
    );
    await ExpectationHelper.verifyStringValueEqualTo(
      ProfilePage.profile.createAccountDate,
      await ProfilePage.profile.createAccountDate.getText(),
      todayDate,
    );
  }

  static async verifySkillAndRealWorkBadgesSection() {
    StepLogger.subVerification('Verify the Skill and Real work Badges Section');
    await ProfilePage.profile.skillBadgeHeading.verifyDisplayedStatus();
    await ProfilePage.profile.skillBadgeAddButton.verifyDisplayedStatus();
    await ProfilePage.profile.realBadgeHeading.verifyDisplayedStatus();
    await ProfilePage.profile.realWorkBadgeAddButton.verifyDisplayedStatus();
  }

  static async verifyCandidateIntroductionSection() {
    StepLogger.subVerification('Verify Candidate Introduction section');
    await ProfilePage.profile.introductionHeader.verifyDisplayedStatus();
    await ProfilePage.profile.addIntroButton.verifyDisplayedStatus();
    await ProfilePage.profile.workExperience.verifyDisplayedStatus();
    await ProfilePage.profile.addWorkExperience.verifyDisplayedStatus();
    await ProfilePage.profile.education.verifyDisplayedStatus();
    await ProfilePage.profile.addEduction.verifyDisplayedStatus();
    await ProfilePage.profile.addSectionButton.verifyDisplayedStatus();
    await this.clickAddSectionMenu();
    await ProfilePage.profile.sectionMenu.verifyDisplayedStatus();
    await ProfilePage.profile.actionSectionMenuItems(ProfilePageConstants.elementNames.award).verifyDisplayedStatus();
    await ProfilePage.profile
      .actionSectionMenuItems(ProfilePageConstants.elementNames.certification)
      .verifyDisplayedStatus();
    await ProfilePage.profile.actionSectionMenuItems(ProfilePageConstants.elementNames.patent).verifyDisplayedStatus();
    await ProfilePage.profile.actionSectionMenuItems(ProfilePageConstants.elementNames.publication).verifyDisplayedStatus();
    await ProfilePage.profile.actionSectionMenuItems(ProfilePageConstants.elementNames.award).clickButton();
    await ProfilePage.profile.sectionMenu.verifyHiddenStatus();
  }

  static async clickAddSectionMenu() {
    StepLogger.subStep('Click Add Section Menu');
    await ProfilePage.profile.addSectionButton.clickButton();
  }

  static async clickMyApplicationTab() {
    StepLogger.subStep('Click My application tab');
    await ProfilePage.profile.myApplicationTab.clickButton();
  }

  static async clickMyProfileTab() {
    StepLogger.subStep('Click My Profile tab');
    await ProfilePage.profile.myProfileTab.clickButton();
  }

  static async verifyJobApplicationSection(jobApplicationName: string) {
    StepLogger.subVerification('Verify the job application section');
    const eNames = ProfilePageConstants.elementNames;
    await ProfilePage.profile.jobApplicationHeader.verifyDisplayedStatus();
    await ProfilePage.profile.jobApplicationColumnHeader(eNames.role).verifyDisplayedStatus();
    await ProfilePage.profile.jobApplicationColumnHeader(eNames.basicFit).verifyDisplayedStatus();
    await ProfilePage.profile.jobApplicationColumnHeaderNonMobile(eNames.requiredSkillBadge).verifyDisplayedStatus();
    await ProfilePage.profile.jobApplicationColumnHeader(eNames.requiredRealWorkBadges).verifyDisplayedStatus();
    await ProfilePage.profile.jobApplicationColumnHeader(eNames.statusNextStep).verifyDisplayedStatus();
    StepLogger.subVerification(
      `Verify job application ${await ProfilePage.profile.jobApplicationName(jobApplicationName).getText()}`,
    );
    await ProfilePage.profile.jobApplicationName(jobApplicationName).verifyDisplayedStatus();
    // await ProfilePage.profile.jobApplicationNextStep(jobApplicationName).verifyDisplayedStatus();
  }

  static async verifyRecommendedJobSection(jobApplicationName: string) {
    StepLogger.subVerification('Verify the Recommended Job Section');
    const eNames = ProfilePageConstants.elementNames;
    await ProfilePage.profile.recommendedJobHeader.verifyDisplayedStatus();
    await ProfilePage.profile.recommendedColumnHeader(eNames.role).verifyDisplayedStatus();
    await ProfilePage.profile.recommendedColumnHeader(eNames.basicFit).verifyDisplayedStatus();
    await ProfilePage.profile.recommendedColumnHeaderNonMobile(eNames.requiredSkillBadge).verifyDisplayedStatus();
    await ProfilePage.profile.recommendedColumnHeader(eNames.requiredRealWorkBadges).verifyDisplayedStatus();
    await ProfilePage.profile.recommendedColumnHeader(eNames.statusNextStep).verifyDisplayedStatus();
    StepLogger.subVerification(
      `Verify job application ${await ProfilePage.profile.recommendedJobName(jobApplicationName).getText()}`,
    );
    await ProfilePage.profile.recommendedJobName(jobApplicationName).verifyDisplayedStatus();
    // await ProfilePage.profile.recommendedJobNextStep(jobApplicationName).verifyDisplayedStatus();
  }

  static async clickNextStepButton(pipelineName: string) {
    StepLogger.subStep('Click Next Step Button');
    await ProfilePage.profile.jobApplicationNextStep(pipelineName).clickButton();
  }

  static async verifyMyApplicationTabIsActive() {
    StepLogger.subVerification('Verify the My application tab is active');
    await ExpectationHelper.verifyAttributeValue(ProfilePage.profile.myApplicationTab, 'aria-selected', 'true');
  }

  static async verifyNonProfileCentricJobApplication(positionName: string) {
    StepLogger.subVerification('Verify Non Profile Centric Job Position ');
    await ProfilePage.profile.jobApplicationName(positionName).verifyDisplayedStatus();
    await ProfilePage.profile.redirectMessage(positionName).verifyDisplayedStatus();
  }

  static async clickRedirectLink(positionName: string) {
    StepLogger.subVerification('Click the redirect link');
    await ProfilePage.profile.redirectLink(positionName).clickLink();
  }

  static async verifyBasicFitStartDialog() {
    StepLogger.subVerification('Verify Basic Fit Heading');
    await ProfilePage.profile.basicFitHeading.verifyDisplayedStatus();
    StepLogger.subVerification('Verify Start Application Button');
    await ProfilePage.profile.startAssessmentButton.verifyDisplayedStatus();
  }

  static async clickApplicationHeader() {
    StepLogger.subStep('Click the Application Header');
    await ProfilePage.profile.applicationHeader.clickButton();
  }

  static async verifyOtherApplicationMenuItem() {
    await ProfilePage.profile.otherApplicationButton.verifyDisplayedStatus();
  }

  static async clickOtherApplicationMenuItem() {
    await ProfilePage.profile.otherApplicationButton.clickButton();
  }

  static async clickResumeButton() {
    await ProfilePage.profile.resumeDownloadButton.clickButton();
  }
}
