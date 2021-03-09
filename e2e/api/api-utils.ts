import { browser } from 'protractor';

export class ApiUtils {

    static coreUrl = 'https://lr58e2fcx7.execute-api.us-east-1.amazonaws.com/';
    static tempMail = 'https://privatix-temp-mail-v1.p.rapidapi.com/request/';
    static apiVersion = 'v48.0';
    static authUrlStaging = 'https://test.salesforce.com/';
    static authUrlProd = 'https://login.salesforce.com/';

    /** login **/
    static login = '/login';

    /** Candidate */
    static candidate = '/candidate';

    /** Candidate Email */
    static candidateEmail = '/candidate-email';

    /** Get Domains */
    static domains = 'domains/';

    /** Get Emails */
    static emails = 'mail/id/';

    /**Auth Token */
    static token = 'services/oauth2/token';

    /** Get application step results */
    static applicationStepResults = `data/${ApiUtils.apiVersion}/sobjects/Application_Step_Result__c/`;

    /** Get opportunity */
    static getOpportunity = `data/${ApiUtils.apiVersion}/sobjects/Opportunity/`;

    /** Survey Monkey */
    static getSurveyMonkey = `data/${ApiUtils.apiVersion}/sobjects/SurveyMonkeyApp__Response__c/`;

    /** Get candidate*/
    static getCandidate = `data/${ApiUtils.apiVersion}/sobjects/Account/`;

    /** Get Case URL */
    static getCase = `data/${ApiUtils.apiVersion}/sobjects/Case/`;

     /** Step Result */
     static stepResult = `data/${ApiUtils.apiVersion}/query?q=`;

    static salesforceUrlSelect(): string {
        if (browser.baseUrl.includes('staging')) {
            return 'https://crossover--staging.my.salesforce.com/services/';
        } else if (browser.baseUrl.includes('sandbox')) {
            return 'https://crossover--fullshared.my.salesforce.com/services/';
        }

        return 'https://crossover.my.salesforce.com/services/';
    }

    static coreApiSelect(): string {
        if (browser.baseUrl.includes('staging')) {
            return 'Staging';
        } else if (browser.baseUrl.includes('sandbox')) {
            return 'Sandbox';
        }

        return 'Prod';
    }
}
