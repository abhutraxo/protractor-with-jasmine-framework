import { HtmlHelper } from '../misc-utils/html-helper';

export class ComponentHelpers {
    static getElementByTagXpath(tag: string, text: string, isContains = false) {
        return `//${tag}[${this.getXPathFunctionForDot(text, isContains)}]`;
    }

    static getElementByClassXpath(tag: string, text: string, isContains = false) {
        return `//${tag}[${this.getXPathFunctionForClass(
            text,
            isContains)}]`;
    }

    static getXPathFunctionForDot(text: string, isContains = false) {
      if (isContains === true) {
        return `contains(., '${text}')`;
      }

      return `normalize-space(.) = '${text}'`;
    }

    static getXPathFunctionForClass(text: string, isContains = false) {
      if (isContains === true) {
        return `contains(@${HtmlHelper.attributes.class}, '${text}')`;
      }

      return `contains = '${text}'`;
    }

    static getXPathFunctionForText(text: string, isContains = false) {
      if (isContains === true) {
        return `contains(text(), '${text}')`;
      }

      return `normalize-space(text()) = '${text}'`;
    }
}
