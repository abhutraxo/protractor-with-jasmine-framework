import { by, element, By } from 'protractor';

import { $, DfElement } from '../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../components/misc-utils/html-helper';
import { xpath } from '../../../components/misc-utils/xpath-builder';

export class CommonPage {

    static getElementByPlaceHolder(value: string, name: string): DfElement {
        return $(by.css(`[${HtmlHelper.attributes.placeholder}='${value}']`),
            name);
    }

    static getElementByTextAndHref(href: string, text: string): DfElement {
        return $(xpath()
            .contains(HtmlHelper.attributes.href, href)
            .text(text)
            .buildByObject(), text);
    }

    static getElementByContainsTextAndHref(href: string, text: string): DfElement {
        return $(xpath()
            .contains(HtmlHelper.attributes.href, href)
            .textContains(text)
            .buildByObject(), text);
    }

    static getElementByIdEndsWith(idValue: string, name: string): DfElement {
        return $(by.css(`[${HtmlHelper.attributes.id}$='${idValue}']`), name);
    }

    static getElementByIdContains(idValue: string, name: string): DfElement {
        return $(by.css(`[${HtmlHelper.attributes.id}*='${idValue}']`), name);
    }

    static getElementByIdStartsWith(idValue: string, name: string): DfElement {
        return $(by.css(`[${HtmlHelper.attributes.id}^='${idValue}']`), name);
    }

    static getElementByNameStartsWith(nameValue: string, name: string): DfElement {
        return $(by.css(`[${HtmlHelper.attributes.name}^='${nameValue}']`), name);
    }

    static getElementByNameContains(nameValue: string, name: string): DfElement {
        return $(by.css(`[${HtmlHelper.attributes.name}*='${nameValue}']`), name);
    }

    static getElementByNameEndsWith(nameValue: string, name: string): DfElement {
        return $(by.css(`[${HtmlHelper.attributes.name}$='${nameValue}']`), name);
    }

    static getElementByClassContains(className: string, name: string): DfElement {
        return $(by.css(`[${HtmlHelper.attributes.class}*='${className}']`), name);
    }

    static getElementByClassEndsWith(className: string, name: string): DfElement {
        return $(by.css(`[${HtmlHelper.attributes.class}$='${className}']`), name);
    }

    static getElementByClassStartsWith(className: string, name: string): DfElement {
        return $(by.css(`[${HtmlHelper.attributes.class}^='${className}']`), name);
    }

    static getDivAllTextElement(text: string) {
        return element.all(By.xpath(`//div[normalize-space(text())='${text}']`));
    }
}
