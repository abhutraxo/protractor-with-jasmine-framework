import { By } from 'protractor';

import { HtmlHelper } from './html-helper';

export function xpath(tag?: string) {
    return new XpathBuilder(tag);
}

const TEXT_TO_BE_REPLACED = 'TEXT_TO_BE_REPLACED';

export class XpathBuilder {
    vItem: string;

    constructor(tag = HtmlHelper.tags.any) {
        this.vItem = `//${tag}`;
    }

    get item() {
        return this.vItem;
    }

    set item(value: string) {
        this.vItem = value;
    }

    where(attr: string, value?: string) {
        this.vItem += value ? `[@${attr}="${value}"]` : `[@${attr}]`;
        return this;
    }

    not(attr: string) {
        this.vItem += `[not(@${attr})]`;
        return this;
    }

    contains(attr: string, value: string, insideNot = false) {
        const locator = `[contains(@${attr},"${value}")]`;
        if (insideNot) {
            this.vItem = this.vItem.replace(TEXT_TO_BE_REPLACED,
                locator.substring(1, locator.length - 1));
        } else {
            this.vItem += locator;
        }
        return this;
    }

    hasAttribute(attr: string) {
        const locator = `[@${attr}]`;
        this.vItem += locator;
        return this;
    }

    startsWith(attr: string, value: string) {
        this.vItem += `[starts-with(@${attr},"${value}")]`;
        return this;
    }

    endsWith(attr: string, value: string) {
        this.vItem += `[ends-with(@${attr},${value})]`;
        return this;
    }

    ancestor(tag: string) {
        this.vItem += `/ancestor::${tag}`;
        return this;
    }

    goToParent(times = 1) {
        while (times-- > 0) {
            this.vItem += '/..';
        }
        return this;
    }

    parent(tag: string) {
        this.vItem += `/parent::${tag}`;
        return this;
    }

    followingSibling(tag: string) {
        this.vItem += `/following-sibling::${tag}`;
        return this;
    }

    precendingSibling(tag: string) {
        this.vItem += `/preceding-sibling::${tag}`;
        return this;
    }

    count() {
        this.vItem = `count(${this.vItem})`;
        return this;
    }

    normalizedSpace(attr: string, value: string) {
        this.vItem += `[normalize-space(${attr})="${value}"]`;
        return this;
    }

    text(value: string) {
        this.vItem += `[text()="${value}"]`;
        return this;
    }

    textContains(value: string) {
        this.vItem += `[contains(text(),"${value}")]`;
        return this;
    }

    textContainsOr(values: string[]) {
        const text: string[] = [];
        values.map((value: string) => text.push(`contains(text(),"${value}")`));
        this.vItem += `[${text.join(' or ')}]`;
        return this;
    }

    descendant(tag: string) {
        this.vItem += `/${tag}`;
        return this;
    }

    anywhere(tag: string) {
        this.vItem += `//${tag}`;
        return this;
    }

    or(xpaths: string[]) {
        this.vItem += xpaths.join(' or ');
        return this;
    }

    and(xpaths: string[]) {
        this.vItem += xpaths.join(' and ');
        return this;
    }

    first() {
        this.vItem = `(${this.vItem})[1]`;
        return this;
    }

    last() {
        this.vItem = `(${this.vItem})[last()]`;
        return this;
    }

    nthChild(index: number) {
        this.vItem = `(${this.vItem})[${index}]`;
        return this;
    }

    odd() {
        this.vItem = `(${this.vItem})[position() mod 2 = 1 and position() > 0]`;
        return this;
    }

    buildByObject() {
        return By.xpath(this.vItem);
    }

    build() {
        return this.vItem;
    }
}
