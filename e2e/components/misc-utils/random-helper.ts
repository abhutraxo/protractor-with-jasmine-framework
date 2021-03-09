export class RandomHelper {
    static getRandomString(size = 6) {
        let randomText = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            + 'abcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < size; i++) {
            randomText += possible.charAt(
                Math.floor(Math.random() * possible.length));
        }
        return randomText;
    }

    static getRandomNumber(size = 6) {
        let randomNumber = '';
        const possible = '0123456789';

        for (let i = 0; i < size; i++) {
            randomNumber += possible.charAt(
                Math.floor(Math.random() * possible.length));
        }
        return randomNumber;
    }

    static getRandomEmail(size = 6, domain = '@email.com') {
        const randomEmailId = this.getRandomString(size);
        const randomEmail = `${randomEmailId}${domain}`;
        return randomEmail;
    }

    static getRandomStringWithoutNumber(size = 6) {
      let randomText = '';
      const possible = 'abcdefghijklmnopqrstuvwxyz';

      for (let i = 0; i < size; i++) {
          randomText += possible.charAt(
              Math.floor(Math.random() * possible.length));
      }
      return randomText;
  }
}
