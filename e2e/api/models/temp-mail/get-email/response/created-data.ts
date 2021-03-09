import { JsonProperty } from 'json-object-mapper';

export class CreatedData {
    @JsonProperty()
    milliseconds: number;

    constructor() {
        this.milliseconds = undefined;
    }
}
