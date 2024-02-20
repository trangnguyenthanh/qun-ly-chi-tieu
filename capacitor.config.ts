import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Quản lý chi tiêu',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
