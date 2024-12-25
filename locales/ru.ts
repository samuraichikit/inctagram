import { pluralizeRu } from '@/common/utils'

export const ru = {
  agreementMsg: 'Я соглашаюсь с ',
  emailVerification: {
    expiredLinkMsg: 'Ссылка на подтверждение пароля истекла',
    msg: 'Вероятно, сcылка на подтверждение пароля истекла.  Не волнуйтесь - мы вышлем вам новую!',
    resendMsg: 'Получить новую ссылку',
  },
  generalSettings: {
    notAvailable: 'Ошибка! Сервер недоступен!',
    savedSettings: 'Ваши настройки сохранены!',
  },
  header: {
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
  },
  mainSidebar: {
    create: 'Создать',
    favorites: 'Избранное',
    home: 'Главная',
    messenger: 'Сообщения',
    myProfile: 'Мой профиль',
    search: 'Поиск',
    statistics: 'Статистика',
  },
  passwordForm: {
    backToSignIn: 'Вернуться на страницу входа',
    confirmationLinkMsg: 'Мы отправили вам ссылку для подтверждения на ',
    createNewPassBtn: 'Создать новый пароль',
    createNewPassword: 'Создать новый пароль',
    email: 'Адрес электронной почты',
    emailDoesntExist: 'Пользователь с этим адресом не найден',
    enterPassword: 'Введите пароль',
    expiredLink1: 'Срок действия ссылки для проверки электронной почты истек',
    expiredLink2:
      'Похоже, срок действия проверочной ссылки истек. Не волнуйтесь, мы можем отправить ссылку снова',
    forgotPassword: 'Забыли пароль?',
    forgotPasswordMsg: 'Введите ваш адрес электронной почты и мы вышлем дальнейшие инструкции',
    incorrectEmail: 'Некорректный адрес электронной почты',
    linkSentMsg: 'Ссылка отправлена на указанный адрес',
    linkSentMsg_1: 'Если вы не получили ссылку, нажмите еще раз на "Получить ссылку"',
    mandatoryField: 'Обязательное поле',
    newPassword: 'Новый пароль',
    noAccount: 'Не зарегистрированы?',
    password: 'Пароль',
    passwordConfirmation: 'Подтверждение пароля',
    passwordLengthMsg: 'Длина вашего пароля должна составлять от 6 до 20 символов',
    recaptchaMsg: 'Пожалуйста, подтвердите, что вы не робот',
    resendVerificationLink: 'Получить повторную ссылку для проверки',
    sendLink: 'Получить ссылку',
    sendLinkAgain: 'Получить повторную ссылку',
    signIn: 'Войти',
    signInError: 'Адрес электронной почты или пароль неверны. Попробуйте еще раз, пожалуйста.',
    signUp: 'Зарегистрироваться',
  },
  postModal: {
    addComment: 'Добависть комментарий',
    addPublicationDesc: 'Добавить описание поста',
    confirmationMsg:
      'Вы действительно хотите завершить редактирование? Если вы закроете окно, внесённые изменения не будут сохранены.',
    deletePost: 'Удалить пост',
    editPost: 'Редактировать пост',
    publishMsg: 'Отправить',
    saveChangesBtn: 'Сохранить изменения',
  },
  privacyPolicy: {
    title: 'Политика конфиденциальности',
  },
  profile: {
    aboutMe: 'Обо мне',
    dOB: 'Дата рождения',
    firstName: 'Имя',
    followers: 'Подписчики',
    following: 'Подписан',
    lastName: 'Фамилия',
    publications: 'Публикации',
    saveChanges: 'Сохранить изменения',
    selectCity: 'Выберите ваш город',
    selectCountry: 'Выберите вашу страну',
    settings: {
      accountManagement: 'Управление аккаунтом',
      devices: 'Устройства',
      generalInformation: 'Общая информация',
      myPayments: 'Мои платежи',
      profileDeletePhoto: 'Удалить Фото',
      profileDeletePhotoModal: 'Вы уверены, что хотите удалить фотографию?',
      profilePhoto: 'Добавить фото профиля',
      profilePhotoErrorFormat: 'Ошибка! Формат загруженного фото должен быть\n' + 'PNG и JPEG',
      profilePhotoErrorSize: 'Ошибка! Размер фото должен быть меньше 10 МБ!',
      profilePhotoSelect: 'Выбрать с Компьютера',
      profileSavePhoto: 'Сохранить',
      profileSettings: 'Настройки профиля',
    },
  },
  publicPosts: {
    getCount(count: number) {
      const str = pluralizeRu(count)

      switch (str) {
        case 'one':
          return `${count} лайк`
        case 'few':
          return `${count} лайка`
        case 'many':
          return `${count} лайков`
      }
    },
    hide: 'Скрыть',
    registeredUsers: 'Зарегистрированные пользователи',
    showMore: 'Показать больше',
  },
  schemaErrorMsg: {
    emailFormat: 'Адрес эл.почты должен быть в формате',
    maxAboutMe: 'Максимальное число символов - 200',
    maxFirstLastName: 'Максимальное число символов - 50',
    maxName: 'Максимальное число символов - 30',
    maxPassword: 'Максимальное число символов - 20',
    minFirstLastName: 'Минимальное число символов - 1',
    minName: 'Минимальное число символов - 6',
    minPassword: 'Минимальное число символов - 6',
    passwordContain: 'Пароль должен содержать ',
    passwordMatch: 'Пароли должны совпадать',
  },
  sideBar: {
    confirmButton: 'Да',
    logOut: 'Выйти',
    logOutConfirmation: 'Вы действительно хотите выйти из своей учетной записи?',
    rejectButton: 'Нет',
  },
  signUp: {
    and: 'и',
    backToSignUp: 'Назад к регистрации',
    congratsMsg: 'Поздравляем!',
    emailConfirmed: 'Ваш адрес эл.почты подтвержден',
    emailSent: 'Подтверждение отправлено',
    haveAccount: 'Уже зарегистрированы?',
    signUpHeader: 'Регистрация пользователя',
    signedUp: 'зарегистрирован',
    username: 'Имя пользователя',
  },
  termsOfService: { title: 'Пользовательское соглашение' },
  test: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати',
}

export type Locale = typeof ru
