import { by } from 'protractor';

import { ComponentHelpers } from '../../../components/component-helpers/component-helpers';
import { $ } from '../../../components/misc-utils/df-elements-helper';

import { ProfilePageConstants } from './profile-page.constant';

const {
  attributes: { classes },
  elementNames: eNames,
} = ProfilePageConstants;
export class ProfilePage {
  static readonly profile = Object.freeze({
    get candidateLocation() {
      return $(by.css(`[class*='${classes.location}']`), eNames.location);
    },

    get candidateTimeZone() {
      return $(by.css(`[class*='${classes.timezone}']`), eNames.timezone);
    },

    get candidateInfoHeader() {
      return $(by.cssContainingText(`[class*='${classes.candidateInfo}']`, eNames.candidateInfo), eNames.candidateInfo);
    },

    get candidatePhone() {
      return $(by.css(`[class*='${classes.candidatePhone}']`), eNames.candidatePhone);
    },

    get candidateEmail() {
      return $(by.css(`[class*='${classes.candidateEmail}']`), eNames.candidateEmail);
    },

    get candidateLinkedIn() {
      return $(by.css(`[class*='${classes.linkedIn}']`), eNames.linkedIn);
    },

    get candidateResume() {
      return $(by.css(`[class*='${classes.candidateResume}']`), eNames.resume);
    },

    get candidateTimeline() {
      return $(
        by.cssContainingText(`[class*='${classes.candidateTimeline}']`, eNames.candidateTimeline),
        eNames.candidateTimeline,
      );
    },

    get appliedFor() {
      return $(
        by.cssContainingText(`[class*='${classes.candidateTimelineDescription}']`, eNames.appliedFor),
        eNames.appliedFor,
      );
    },

    get createAccount() {
      return $(
        by.cssContainingText(`[class*='${classes.candidateTimelineDescription}']`, eNames.createAccount),
        eNames.createAccount,
      );
    },

    get appliedForDate() {
      return $(
        by.xpath(`//*[contains(text(), '${eNames.appliedFor}')]
        /span[contains(@class, '${classes.timelineDate}')]`),
        `${eNames.appliedFor} date`,
      );
    },

    get createAccountDate() {
      return $(
        by.xpath(`//*[contains(text(), '${eNames.createAccount}')]
        /span[contains(@class, '${classes.timelineDate}')]`),
        `${eNames.createAccount} date`,
      );
    },

    get skillBadgeAddButton() {
      return $(
        by.xpath(`//*[${ComponentHelpers.getXPathFunctionForClass(classes.badgesHeadline, true)}
        and ${ComponentHelpers.getXPathFunctionForText(eNames.skillBadge, true)}]
          /parent::div/div/a/div[contains(@class, '${classes.newBadge}')]`),
        `${eNames.skillBadge} add button`,
      );
    },

    get realWorkBadgeAddButton() {
      return $(
        by.xpath(`//*[${ComponentHelpers.getXPathFunctionForClass(classes.badgesHeadline, true)}
        and ${ComponentHelpers.getXPathFunctionForText(eNames.realWorkBadge, true)}]
          /parent::div/div/a/div[contains(@class, '${classes.newBadge}')]`),
        `${eNames.realWorkBadge} add button`,
      );
    },

    get realBadgeHeading() {
      return $(
        by.xpath(`//*[${ComponentHelpers.getXPathFunctionForClass(classes.badgesHeadline, true)}
        and ${ComponentHelpers.getXPathFunctionForText(eNames.realWorkBadge, true)}]`),
        eNames.realWorkBadge,
      );
    },

    get skillBadgeHeading() {
      return $(
        by.xpath(`//*[${ComponentHelpers.getXPathFunctionForClass(classes.badgesHeadline, true)}
        and ${ComponentHelpers.getXPathFunctionForText(eNames.skillBadge, true)}]`),
        eNames.skillBadge,
      );
    },

    get introductionHeader() {
      return $(
        by.xpath(`//*[${ComponentHelpers.getXPathFunctionForClass(classes.infoHeader, true)}]
        /div[contains(@class, 'headline') and contains(text(), '${eNames.introduction}')]`),
        eNames.introduction,
      );
    },

    get workExperience() {
      return $(
        by.xpath(`//*[${ComponentHelpers.getXPathFunctionForClass(classes.infoHeader, true)}]
      /div[contains(@class, 'headline') and contains(text(), '${eNames.workExperience}')]`),
        eNames.workExperience,
      );
    },

    get education() {
      return $(
        by.xpath(`//*[${ComponentHelpers.getXPathFunctionForClass(classes.infoHeader, true)}]
      /div[contains(@class, 'headline') and contains(text(), '${eNames.education}')]`),
        eNames.education,
      );
    },

    get addSectionButton() {
      return $(by.css(`[class*='${classes.addSectionButton}']`), eNames.addSection);
    },

    get addIntroButton() {
      return $(by.buttonText(`${eNames.introduceYourself}`), eNames.introduceYourself);
    },

    get addWorkExperience() {
      return $(by.buttonText(`${eNames.addWorkExp}`), eNames.addWorkExp);
    },

    get addEduction() {
      return $(by.buttonText(`${eNames.addEduction}`), eNames.addEduction);
    },

    get sectionMenu() {
      return $(by.css(`div[class*='${classes.sectionMenu}']`), eNames.sectionMenu);
    },

    actionSectionMenuItems(option: string) {
      return $(by.cssContainingText(`[class*='${classes.sectionMenuItem}']`, option), option);
    },

    get myApplicationTab() {
      return $(by.xpath(`//*[(@role = 'tab') and contains(., '${eNames.myApplication}')]`), eNames.myApplication);
    },

    get myProfileTab() {
      return $(by.xpath(`//*[(@role = 'tab') and contains(., '${eNames.myProfile}')]`), eNames.myProfile);
    },

    jobApplicationColumnHeader(header: string) {
      return $(
        by.xpath(`//*[contains(text(), '${eNames.jobApplication}')]/parent::div/following-sibling::table/
      thead/tr/th[contains(text(), '${header}')]`),
        header,
      );
    },

    jobApplicationColumnHeaderNonMobile(header: string) {
      return $(
        by.xpath(`//*[contains(text(), '${eNames.jobApplication}')]/parent::div/following-sibling::table/
      thead/tr/th/span[contains(text(), '${header}')]`),
        header,
      );
    },

    get jobApplicationHeader() {
      return $(by.cssContainingText(`[class*='${classes.header}']`, eNames.jobApplication), eNames.jobApplication);
    },

    jobApplicationName(pipelineName: string) {
      return $(
        by.xpath(`//*[contains(text(), '${eNames.jobApplication}')]/parent::div/following-sibling::table/
        tbody/tr/td[contains(@class, '${eNames.role}')]/
          a[contains(@class,'${classes.pipelineName}') and contains(text(), '${pipelineName}')]`),
        eNames.pipelineName,
      );
    },

    jobApplicationNextStep(pipelineName: string) {
      return $(
        by.xpath(`//*[contains(text(), '${eNames.jobApplication}')]/parent::div/following-sibling::table/
        tbody/tr[contains(. , '${pipelineName}')]
          /td[contains(@class, '${classes.applicationStatus}')]/div/button`),
        eNames.statusNextStep,
      );
    },

    get recommendedJobHeader() {
      return $(by.cssContainingText(`[class*='${classes.header}']`, eNames.recommendedJobs), eNames.recommendedJobs);
    },

    recommendedColumnHeader(header: string) {
      return $(
        by.xpath(`//*[contains(text(), '${eNames.recommendedJobs}')]/parent::div/following-sibling::table/
        thead/tr/th[contains(text(), '${header}')]`),
        header,
      );
    },

    recommendedColumnHeaderNonMobile(header: string) {
      return $(
        by.xpath(`//*[contains(text(), '${eNames.recommendedJobs}')]/parent::div/following-sibling::table/
        thead/tr/th/span[contains(text(), '${header}')]`),
        header,
      );
    },

    recommendedJobName(pipelineName: string) {
      return $(
        by.xpath(`//*[contains(text(), '${eNames.recommendedJobs}')]/parent::div/following-sibling::table/
      tbody/tr/td[contains(@class, '${eNames.role}')]/
        a[contains(@class,'${classes.pipelineName}') and contains(text(), '${pipelineName}')]`),
        eNames.pipelineName,
      );
    },

    recommendedJobNextStep(pipelineName: string) {
      return $(
        by.xpath(`//*[contains(., '${eNames.recommendedJobs}')]/parent::div/following-sibling::table/
        tbody/tr[contains(. , '${pipelineName}')]
          /td[contains(@class, '${classes.applicationStatus}')]/div/button[contains(text(), 'APPLY')]`),
        eNames.statusNextStep,
      );
    },

    redirectMessage(positionName: string) {
      return $(
        by.xpath(`//td[contains(.,'${positionName}')]
      /following-sibling::td/div/span[contains(@class, 'redirect-text')]`),
        `${positionName} redirect message`,
      );
    },

    redirectLink(positionName: string) {
      return $(
        by.xpath(`//td[contains(.,'${positionName}')]
      /following-sibling::td/div/span[contains(@class, 'redirect-text')]/a`),
        `${positionName} redirect link`,
      );
    },

    get applicationHeader() {
      return $(by.css("button[class*='application']"), 'Old Ui Application Header');
    },

    get otherApplicationButton() {
      return $(
        by.xpath(`//*[contains(@class, '${classes.otherApplication}')]/following-sibling::button`),
        'Other Application button',
      );
    },

    get basicFitHeading() {
      return $(by.cssContainingText(`h4[class*='${classes.stepHeader}']`, eNames.basicFitHeader), eNames.basicFitHeader);
    },

    get startAssessmentButton() {
      return $(by.css(`button[class*='${classes.startAppButton}']`), eNames.startAssessment);
    },

    get avatar() {
      return $(by.css(`[class='${classes.avatar}']`), 'Avatar');
    },

    get resumeDownloadButton() {
      return $(by.css(`[class*='${classes.candidateResume}'] button`), `${eNames.resume}`);
    },
  });
}
