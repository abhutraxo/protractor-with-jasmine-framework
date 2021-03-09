import { browser } from 'protractor';

import { SuiteNames } from '../../helpers/suite-names';

import { StepLogger } from '../../../../core/logger/step-logger';
import { DeleteCandidateUtils } from '../../../api/delete-candidate-utils';
import { PageHelper } from '../../../components/html/page-helper';
import { StaticWait } from '../../../components/html/static-wait';
import { ApplicationPageHelper } from '../../../page-objects/pages/application-page/application-page.helper';
import { BasicFitConstants } from '../../../page-objects/pages/basic-fit/basic-fit.constant';
import { BasicFitHelper } from '../../../page-objects/pages/basic-fit/basic-fit.helper';
import { LoginPageHelper } from '../../../page-objects/pages/login-page/login-page.helper';
import { ProfilePageConstants } from '../../../page-objects/pages/profile-page/profile-page.constant';
import { ProfilePageHelper } from '../../../page-objects/pages/profile-page/profile-page.helper';

describe(SuiteNames.rapidQa, () => {
  let applicationHelper: ApplicationPageHelper;
  let user: any;

  beforeAll(async () => {
    applicationHelper = ApplicationPageHelper.getInstance();
    await PageHelper.maximizeBrowser();
  });

  // Jira Reference - LAMBDA-3713
  it('Answer the Basic Fit questioner correctly to update the basic fit status - [26491532]', async () => {
    /**
     * Test cover answering the basic fit question correctly and updating its status on the UI
     */
    StepLogger.caseId = 26491532;
    const jobName = ProfilePageConstants.elementNames;

    StepLogger.preCondition('Create a new candidate and application');
    await applicationHelper.goTo();
    user = await ApplicationPageHelper.createNewCandidate();

    StepLogger.stepId(1);
    StepLogger.step('Click on my application tab');
    await ProfilePageHelper.clickMyApplicationTab();
    StepLogger.verification('My Application tab opens with a job application and Check Basic Fit button');
    if (browser.baseUrl.includes('staging' || 'sandbox')) {
      await ProfilePageHelper.verifyJobApplicationSection(jobName.stagingTestPosition);
    } else {
      await ProfilePageHelper.verifyJobApplicationSection(jobName.prodTestPosition);
    }

    StepLogger.stepId(2);
    StepLogger.step('Click the "Check Basic Fit" button');
    if (browser.baseUrl.includes('staging' || 'sandbox')) {
      await ProfilePageHelper.clickNextStepButton(jobName.stagingTestPosition);
    } else {
      await ProfilePageHelper.clickNextStepButton(jobName.prodTestPosition);
    }
    StepLogger.verification('Survey monkey form open with Basic Fit Questioner and Submit Button');
    await BasicFitHelper.verifyBasicFitPage();

    StepLogger.stepId(3);
    StepLogger.step(`Select the correct option for the question ${user.fName}
    Example: Between 5 and 8 year`);
    await BasicFitHelper.selectTheBfqAnswer(BasicFitConstants.elementNames.over8Years);
    StepLogger.verification('Option is selected');
    await BasicFitHelper.verifyBasicFitAnswerSelected(BasicFitConstants.elementNames.over8Years);

    StepLogger.stepId(4);
    StepLogger.step('Click Submit button');
    await BasicFitHelper.clickSubmitButton();
    StepLogger.verification('Waiting page with "We are evaluating your submission" is displayed');
    await BasicFitHelper.verifyWaitingMessage();

    StepLogger.stepId(5);
    StepLogger.step('Wait for some time');
    StepLogger.verification(`Application navigates to My Application tab.
    Verify the Basic Fit is updated with a Green tick mark
    Status / Next step is updated with Earn Next badge Button
    Success message toast "Congratulation! You've passed the Basic Fit for Test Position Production!"`);
    await PageHelper.switchToDefaultContent();
    await ProfilePageHelper.verifyMyApplicationTabIsActive();
    await BasicFitHelper.verifyTheSuccessNotification();
    if (browser.baseUrl.includes('staging' || 'sandbox')) {
      await BasicFitHelper.verifyBfqSuccessStatus(jobName.stagingTestPosition);
      await BasicFitHelper.verifyNextActiveBadge(jobName.stagingTestPosition, 'Cognitive Aptitude');
    } else {
      await BasicFitHelper.verifyBfqSuccessStatus(jobName.prodTestPosition);
      await BasicFitHelper.verifyNextActiveBadge(jobName.prodTestPosition, 'Cognitive Aptitude');
    }

    StepLogger.stepId(6);
    StepLogger.step('Hover over the Green Tick Mark');
    if (browser.baseUrl.includes('staging' || 'sandbox')) {
      await BasicFitHelper.hoverOverBasicFitStatusSuccess(jobName.stagingTestPosition);
    } else {
      await BasicFitHelper.hoverOverBasicFitStatusSuccess(jobName.prodTestPosition);
    }
    StepLogger.verification(`Tool tip is displayed with message "Congratulation! You've Passed the Basic fit for
    you application Test Position Production`);
    await StaticWait.waitForMillSec(3);
    await BasicFitHelper.verifyBfqToolTipContent();
  });

  afterAll(async () => {
    await LoginPageHelper.logout();
    DeleteCandidateUtils.deleteCandidate(user.email);
  });
});
