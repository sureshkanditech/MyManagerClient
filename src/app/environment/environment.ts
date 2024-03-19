import packageInfo from '../../../package.json';

// export const BASE_URL = 'https://localhost:7166/api';
export const BASE_URL = 'https://mymanagerserver.azurewebsites.net/api';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
};
