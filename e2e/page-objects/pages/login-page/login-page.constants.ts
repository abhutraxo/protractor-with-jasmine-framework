export class LoginPageConstants {
  static readonly attributes = Object.freeze({
    classes: {
      loginHeader: 'login-header',
      error: 'mat-error',
      clickHere: 'login-action',
      resetPasswordButton: 'reset-password-button',
      loginButton: 'login-button',
      errorBar: 'app-snackbar',
      avatarImage: 'user-image',
      menu: 'menu',
      errorClass: 'error',
      success: 'success',
      userMenu: 'xo-user-menu',
      menuItem: 'menu-item',
    },
    formcontrolname: {
      username: 'username',
      password: 'password',
    },
  });

  static readonly elementNames = Object.freeze({
    loginHeader: 'Login',
    username: 'Username',
    password: 'Password',
    emailRequiredError: 'Email is required',
    passwordRequiredError: 'Password is required',
    validEmailError: 'Please enter a valid email',
    clickHere: 'Click Here',
    passwordRecoveryHeader: 'Password Recovery',
    resetPassword: 'RESET PASSWORD',
    loginButton: 'LOGIN',
    invalidLogin: 'Invalid username and/or password',
    avatarImage: 'Avatar Image',
    menu: 'menu',
    logOut: 'Candidate Log out',
    notRegisteredErrorMsg: "We're sorry, we could not find any account associated with the email address you specified",
    passwordResetMsg: 'Your new password has been sent to you over email!',
    loginHere: 'Login Here',
  });
}
