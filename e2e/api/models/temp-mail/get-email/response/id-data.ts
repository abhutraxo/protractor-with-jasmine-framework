import { JsonProperty } from 'json-object-mapper';

export class IdData {
    @JsonProperty({ name: 'oid' })
    id: string;

    constructor() {
        this.id = undefined;
    }
}
