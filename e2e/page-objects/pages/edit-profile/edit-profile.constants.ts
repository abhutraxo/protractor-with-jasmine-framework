export class EditProfilePageConstants {
  static readonly attributes = Object.freeze({
    classes: {
      editTextButton: 'edit-text',
      editProfile: 'edit-profile',
      avatar: 'avatar-image',
      changePictureButton: 'edit-btn',
      header: 'header',
      error: 'mat-error',
      uploadResume: 'upload-button',
    },
    formControlName: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      linkedIn: 'website',
      country: 'country',
      city: 'city',
      resume: 'resume',
      timeZone: 'timeZone',
      availability: 'availability',
    },
    ids: {
      phone: 'phone',
    },
  });

  static readonly elementNames = Object.freeze({
    edit: 'Edit',
    editProfile: 'Edit Profile',
    cancel: 'Cancel',
    save: 'Save',
    avatar: 'Avatar',
    invalidPhoneError: 'Invalid Phone Number',
  });
}
