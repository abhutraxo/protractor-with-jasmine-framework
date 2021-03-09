import { deserialize } from 'json-typescript-mapper';

import { StepLogger } from '../../core/logger/step-logger';

import { ApiUtils } from './api-utils';
import { RestWrapper } from './rest-wrapper';

import { OpportunityData } from './models/opportunity-data/response/opportunity-data';

export class OpportunityUtils {

    /**
     * Get Opportunity data
     * @returns {Promise<{content: any; statusCode: any}>}
     */
    static async getOpportunity(orderId: string, token: string): Promise<{ content: any; statusCode: any; }> {
        const requestUrl = `${ApiUtils.salesforceUrlSelect()}${ApiUtils.stepResult}SELECT Id FROM Opportunity where AccountId =
                '${orderId}' ORDER BY CreatedDate DESC`;

        if (StepLogger != null ) {
            StepLogger.step(`GET Request Url: ${requestUrl}`);
        }
        const response = await new RestWrapper()
            .get(requestUrl)
            .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' })
            .type('json')
            .header('Authorization', 'Bearer ' + token)
            .end();

        const content = deserialize(OpportunityData, response.body);
        return  {
            content,
            statusCode: response.status,
        };
    }
}
