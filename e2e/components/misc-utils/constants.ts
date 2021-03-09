export class Constants {
  static readonly MAX_RETRY_ATTEMPTS = 3;
  static readonly EMPTY_STRING = '';
  static readonly none = 'None';
  static readonly MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  static readonly true = 'True';

  static readonly separators = Object.freeze({
    comma: ',',
    semiColon: ';',
    apostrophe: "'",
    pipe: '|',
  });

  static readonly jsScripts = Object.freeze({
    scrollIntoView: 'arguments[0].scrollIntoView();',
    scrollToBottom: 'window.scrollTo(0, document.body.scrollHeight)',
    windowClose: 'window.close();',
    click: 'arguments[0].click();',
    scrollToTop: 'window.scrollTo(0, 0)',
  });
}
