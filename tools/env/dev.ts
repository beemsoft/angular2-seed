import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  API: 'http://localhost:8080',
  DIGIPOORT_API: 'http://localhost:8081/api/digipoort'
};

export = DevConfig;

