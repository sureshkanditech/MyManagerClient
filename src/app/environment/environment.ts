import packageInfo from '../../../package.json';

export const BASE_URL = 'https://localhost:5013/api';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
};
