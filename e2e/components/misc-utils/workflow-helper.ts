import { StepLogger } from '../../../core/logger/step-logger';

export class WorkflowHelper {

    private testsArray: number[] = [];
    private beforeAll: () => Promise<void>;
    private beforeAllStarted = false;
    private beforeAllSuccess = false;
    private beforeAllMessageFailure = 'beforeAll failed.';
    private failureMessage = (testId: number) => `Previous test: ${testId} should be passed.`;

    addPassedTest(testId: number) {
        if (typeof testId === 'number') {
            this.testsArray.push(testId);
        } else {
            StepLogger.subStep('Test Case Id is not valid');
        }
    }

    ensureTestPassed(testId: number) {
        if (this.testsArray.indexOf(testId) < 0) {
            throw new Error(this.failureMessage(testId));
        } else {
            StepLogger.subStep('Test Case Id is not valid');
        }
    }

    registerBeforeAll(beforeAll: () => Promise<void>) {
        this.beforeAll = beforeAll;
    }

    async ensureBeforeAllPassed() {
        if (this.beforeAllStarted) {
            if (this.beforeAllSuccess) {
                return;
            }
            throw new Error(this.beforeAllMessageFailure);
        }

        this.beforeAllStarted = true;
        await this.beforeAll();
        this.beforeAllSuccess = true;
    }
}
