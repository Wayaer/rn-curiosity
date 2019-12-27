'use strict';

const {RNCuriosity:{changeNotificationSetting,checkNotificationPermission}} = NativeModules

export  {changeNotificationSetting,checkNotificationPermission};
export * from './src/NativeConstant';
export * from './src/NativeUtils';
export * from './src/NativeSQLite';

