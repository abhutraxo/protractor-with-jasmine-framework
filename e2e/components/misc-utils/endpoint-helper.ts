import { browser } from 'protractor';

export class EndpointHelper {
  public static login = '/auth/login';
  public static profilePage = '/profile/001N000001v3KbyIAE';

    static applicationPage(): string {
      if (browser.baseUrl.includes('sandbox')) {
        return '/jobs/7777/test-position-sandbox/apply';
      } else if ( browser.baseUrl.includes('staging')) {
        return '/jobs/6665/test-position-staging/apply';
      } else {
        return '/jobs/9998/test-position-production/apply';
      }
    }
}
