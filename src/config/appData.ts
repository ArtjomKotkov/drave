export const appData = {
  localStorageData: {
    driveRootKey: 'drives'
  },
  yandex: {
    client_id: '79b59f1e0ef441f8a6956f4b6f1e5a48',
    client_secret: '',
    redirect_uri: 'http://localhost:4200/connections/make',
    scope: 'login:avatar login:birthday cloud_api:disk.app_folder cloud_api:disk.read cloud_api:disk.write login:email login:info cloud_api:disk.info',
    rootUrl: 'https://oauth.yandex.ru/',
    force_confirm: true
  },
  google: {
    client_id: '947582912970-vn5frh4j68u11bda21l51bjrkoqre7gs.apps.googleusercontent.com',
    client_secret: '',
    redirect_uri: 'http://localhost:4200/connections/make',
    rootUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata'
  }
};
