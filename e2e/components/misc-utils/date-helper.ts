import { Constants } from '../misc-utils/constants';

export class DateHelper {
  static getTodayFormattedDate() {
    const today = new Date();
    let month: string;
    let date: string;

    month = Constants.MONTH_NAMES[today.getMonth()];
    date = this.getDateSubScript(today.getDate());

    return `${month} ${date} ${today.getFullYear()}`;
  }

  static getFormattedDate(dayOffset = 0, monthOffset = 0, yearOffset = 0, delimiter = '/', format = 'MMDDYYYY') {
    const today = new Date();
    let month: string;
    let date: string;

    if (today.getMonth() < 10) {
      month = `${monthOffset}${today.getMonth() + 1}`;
    } else {
      month = `${today.getMonth() + 1}`;
    }

    if (today.getDate() < 10) {
      date = `${dayOffset}${today.getDate()}`;
    } else {
      date = `${today.getDate()}`;
    }

    if (format === 'YYYYMMDD') {
      return `${today.getFullYear() + yearOffset}${delimiter}${month}${delimiter}${date}`;
    }
    return `${month}${delimiter}${date}${delimiter}${today.getFullYear() + yearOffset}`;
  }

  static getDateSubScript(date: number) {
    if (date !== 11 && date !== 12 && date !== 13) {
      if (date % 10 === 1) {
        return `${date}st`;
      } else if (date % 10 === 2) {
        return `${date}nd`;
      } else if (date % 10 === 3) {
        return `${date}rd`;
      }
    }
    return `${date}th`;
  }
}
