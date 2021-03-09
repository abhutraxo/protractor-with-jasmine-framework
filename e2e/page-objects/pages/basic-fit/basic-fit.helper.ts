import { StepLogger } from '../../../../core/logger/step-logger';
import { ElementHelper } from '../../../components/html/element-helper';
import { PageHelper } from '../../../components/html/page-helper';
import { WaitHelper } from '../../../components/html/wait-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { HtmlHelper } from '../../../components/misc-utils/html-helper';
import { ProfilePage } from '../profile-page/profile-page.po';

import { BasicFitConstants } from './basic-fit.constant';
import { BasicFitPage } from './basic-fit.po';

export class BasicFitHelper {
  static async verifyBasicFitPage() {
    StepLogger.subVerification('Verify the Basic Fit Survey Monkey Test');
    await PageHelper.switchToiFrame(BasicFitPage.bfq.iframe);
    await BasicFitPage.bfq.bfqQuestion.verifyDisplayedStatus();
    await BasicFitPage.bfq.bfqOptions(BasicFitConstants.elementNames.over8Years).verifyDisplayedStatus();
    await BasicFitPage.bfq.submitButton.verifyDisplayedStatus();
  }

  static async selectTheBfqAnswer(option: string) {
    StepLogger.subStep('Select the BFQ Answer');
    await BasicFitPage.bfq.bfqOptions(option).clickButton();
  }

  static async verifyBasicFitAnswerSelected(option: string) {
    StepLogger.subVerification('Verify the Basic Fit Answer is selected');
    await ExpectationHelper.verifyAttributeValue(BasicFitPage.bfq.bfqOptionsInput(option), HtmlHelper.attributes.checked , 'true');
  }

  static async clickSubmitButton() {
    StepLogger.subStep('Click the Submit Button');
    await BasicFitPage.bfq.submitButton.clickButton();
  }

  static async verifyWaitingMessage() {
    StepLogger.subVerification('Verify Waiting Message is displayed');
    const today = new Date();
    StepLogger.subVerification(`${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`);
    const isWaitingMessageDisplayed = await WaitHelper.waitForElementOptionallyPresent(BasicFitPage.bfq.waitingMessage.item, 20000);
    const today1 = new Date();
    StepLogger.subVerification(`${today1.getHours()}:${today1.getMinutes()}:${today1.getSeconds()}`);
    if (isWaitingMessageDisplayed === true) {
      await BasicFitPage.bfq.waitingMessage.verifyDisplayedStatus();
    }
  }

  static async verifyBfqSuccessStatus(positionName: string) {
    StepLogger.subVerification('Verify the BFQ success status');
    await BasicFitPage.bfq.bfqSuccessStatus(positionName).verifyDisplayedStatus();
  }

  static async verifyTheSuccessNotification() {
    StepLogger.subVerification('Verify the Success Notification');
    await BasicFitPage.bfq.bfqStatusNotification.verifyDisplayedStatus();
    await ExpectationHelper.verifyTextContains(BasicFitPage.bfq.bfqStatusNotification,
      BasicFitConstants.elementNames.congrats);
  }

  static async verifyNextActiveBadge(positionName: string, activeBadge: string) {
    StepLogger.subVerification('Verify the next active step');
    await BasicFitPage.bfq.activeSkillBadge(positionName).verifyDisplayedStatus();
    await ElementHelper.actionHoverOver(BasicFitPage.bfq.activeSkillBadge(positionName));
    const toolTipContent = await BasicFitPage.bfq.toolTip.getText();
    await ExpectationHelper.verifyStringValueContain(BasicFitPage.bfq.activeSkillBadge(positionName),
      toolTipContent, activeBadge);
    await ElementHelper.actionHoverOver(ProfilePage.profile.jobApplicationName(positionName));
    await BasicFitPage.bfq.toolTip.verifyHiddenStatus();
  }

  static async hoverOverBasicFitStatusSuccess(positionName: string) {
    StepLogger.subStep('Hover over the Basic fit Success');
    await ElementHelper.actionHoverOver(BasicFitPage.bfq.bfqSuccessStatus(positionName));
  }

  static async verifyBfqToolTipContent() {
    StepLogger.subVerification('Verify BFQ Tool tip content');
    const toolTipContent = await BasicFitPage.bfq.toolTip.getText();
    await ExpectationHelper.verifyStringValueContain(BasicFitPage.bfq.toolTip,
      toolTipContent, BasicFitConstants.elementNames.congrats);
  }

}
