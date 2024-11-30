import { pluralizeEn } from '@/common/utils'

import { Locale } from './ru'

export const en: Locale = {
  agreementMsg: 'I agree to the',
  emailVerification: {
    expiredLinkMsg: 'Email verification link expired',
    msg: 'Looks like the verification link has expired. Not to worry, we can send the link again',
    resendMsg: 'Resend verification link',
  },
  generalSettings: {
    notAvailable: 'Error! Server is not available!',
    savedSettings: 'Your settings are saved!',
  },
  header: {
    signIn: 'Log in',
    signUp: 'Sign up',
  },
  mainSidebar: {
    create: 'Create',
    favorites: 'Favorites',
    home: 'Home',
    messenger: 'Messenger',
    myProfile: 'My Profile',
    search: 'Search',
    statistics: 'Statistics',
  },
  passwordForm: {
    backToSignIn: 'Back to Sign In',
    confirmationLinkMsg: 'We have sent a link to confirm your email to ',
    createNewPassBtn: 'Create new password',
    createNewPassword: 'Create New Password',
    email: 'Email',
    enterPassword: 'Enter password',
    forgotPassword: 'Forgot Password',
    forgotPasswordMsg: 'Enter your email address and we will send you further instructions',
    incorrectEmail: 'The email must match the format example@example.com',
    linkSentMsg: 'The link has been sent by email.',
    linkSentMsg_1: 'If you don’t receive an email send link again',
    mandatoryField: 'Mandatory field',
    newPassword: 'New Password',
    noAccount: "Don't have an account?",
    password: 'Password',
    passwordConfirmation: 'Password confirmation',
    passwordLengthMsg: 'Your password must be between 6 and 20 characters',
    recaptchaMsg: 'Please verify that you are not a robot',
    sendLink: 'Send Link',
    sendLinkAgain: 'Send  Link Again',
    signIn: 'Sign In',
    signInError: 'The email or password are incorrect. Try again please.',
    signUp: 'Sign Up',
  },
  privacyPolicy: {
    title: 'Privacy Policy',
  },
  profile: {
    aboutMe: 'About me',
    dOB: 'Date of Birth',
    firstName: 'First Name',
    followers: 'Followers',
    following: 'Following',
    lastName: 'Last Name',
    publications: 'Publications',
    saveChanges: 'Save changes',
    selectCity: 'Select your city',
    selectCountry: 'Select your country',
    settings: {
      accountManagement: 'Account Management',
      devices: 'Devices',
      generalInformation: 'General information',
      myPayments: 'My payments',
      profileDeletePhoto: 'Delete Photo',
      profileDeletePhotoModal: 'Are you sure you want to delete the photo?',
      profilePhoto: 'Add a Profile Photo',
      profilePhotoErrorFormat: 'Error! The format of the uploaded photo must be\n' + 'PNG and JPEG',
      profilePhotoErrorSize: 'Error! Photo size must be less than 10 MB!',
      profilePhotoSelect: 'Select from Computer',
      profileSavePhoto: 'Save',
      profileSettings: 'Profile Settings',
    },
  },
  publicPosts: {
    getCount(count: number) {
      const str = pluralizeEn(count)

      switch (str) {
        case 'one':
          return `${count} Like`
        case 'other':
          return `${count} Likes`
      }
    },
    hide: 'Hide',
    registeredUsers: 'Registered users',
    showMore: 'Show more',
  },
  schemaErrorMsg: {
    emailFormat: 'The email must match the format',
    maxAboutMe: 'Maximum number of characters 200',
    maxFirstLastName: 'Maximum number of characters 50',
    maxName: 'Maximum number of characters 30',
    maxPassword: 'Maximum number of characters 6',
    minFirstLastName: 'Minimum number of characters 1',
    minName: 'Minimum number of characters 6',
    minPassword: 'Minimum number of characters 6',
    passwordContain: 'Password must contain ',
    passwordMatch: 'Passwords must match',
  },
  sideBar: {
    confirmButton: 'Yes',
    logOut: 'Log out',
    logOutConfirmation: 'Are you really want to log out of your account',
    rejectButton: 'No',
  },
  signUp: {
    and: 'and',
    backToSignUp: 'Back to Sign Up',
    congratsMsg: 'Congratulations!',
    emailConfirmed: 'Your email has been confirmed',
    emailSent: 'Email sent',
    haveAccount: 'Do you have an account?',
    signUpHeader: 'Sign Up',
    signedUp: 'registered',
    username: 'Username',
  },
  termsOfService: { title: 'Terms of Service' },
  test: 'Lorem Ipsum is simply dummy text of the printing',
}
