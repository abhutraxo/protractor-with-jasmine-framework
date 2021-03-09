import { JsonProperty } from 'json-object-mapper';

import { CreatedData } from './created-data';
import { IdData } from './id-data';

export class MailData {
    @JsonProperty({ name: '_id', type: IdData })
    id: IdData;
    @JsonProperty({ type: CreatedData })
    createdAt: CreatedData;
    @JsonProperty({ name: 'mail_id' })
    mailId: string;
    @JsonProperty({ name: 'mail_address_id' })
    mailAddressId: string;
    @JsonProperty({ name: 'mail_from' })
    mailFrom: string;
    @JsonProperty({ name: 'mail_subject' })
    mailSubject: string;
    @JsonProperty({ name: 'mail_preview' })
    mailPreview: string;
    @JsonProperty({ name: 'mail_text_only' })
    mailTextOnly: string;
    @JsonProperty({ name: 'mail_text' })
    mailText: string;
    @JsonProperty({ name: 'mail_html' })
    mailHtml: string;
    @JsonProperty({ name: 'mail_timestamp' })
    mailTimestamp: string;

    constructor() {
        this.id = undefined;
        this.createdAt = undefined;
        this.mailAddressId = undefined;
        this.mailFrom = undefined;
        this.mailHtml = undefined;
        this.mailId = undefined;
        this.mailPreview = undefined;
        this.mailSubject = undefined;
        this.mailText = undefined;
        this.mailTextOnly = undefined;
        this.mailTimestamp = undefined;
    }
}
