import { browser } from 'protractor';

import { User, UserType } from '../../page-objects/pages/models/user.model';

export class CredentialsHelper {
    private static readonly users = browser.params.users;

    static get loginTestUser(): User {
        return Object.freeze({username: this.users.loginTest.username,
            password: this.users.loginTest.password,
            firstName: this.users.loginTest.firstName,
            lastName: this.users.loginTest.lastName,
            userType: UserType.CANDIDATE,
        });
    }
}
