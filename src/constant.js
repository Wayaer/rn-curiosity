'use strict';
import {Platform, NativeModules, Dimensions} from 'react-native';

export const {height, width, scale} = Dimensions.get('window');
const RNCuriosity = NativeModules.RNCuriosity;
export const NativeConstant = {
  // 系统是iOS
  IOS: (Platform.OS === 'ios'),
  // 系统是安卓
  Android: (Platform.OS === 'android'),
  // 实际屏幕高度
  ActualScreen_Height: height,
  // 获取屏幕宽度
  Screen_Width: width,
  // 获取屏幕分辨率
  Screen_Scale: scale,

  //系统版本
  SystemVersion: RNCuriosity.constants.systemVersion,
  //app 版本号
  VersionCode: RNCuriosity.constants.versionCode,
  //app  版本名字
  VersionName: RNCuriosity.constants.versionName,
  //android 包名  ios bundleID
  PackageName: RNCuriosity.constants.packageName,
  //手机品牌
  PhoneBrand: RNCuriosity.constants.phoneBrand,
  //手机厂商
  PhoneModel: Platform.OS === 'android' ? RNCuriosity.constants.phoneModel : 'Apple',
  //状态栏高度
  StatusBarHeight: RNCuriosity.constants.StatusBarHeight,
  //状态栏宽度
  StatusBarWidth: Platform.OS === 'android' ? width : RNCuriosity.constants.StatusBarWidth,

  //Android Constants
  DIRECTORY_ALARMS: Platform.OS === 'android' ? RNCuriosity.constants.DIRECTORY_ALARMS : null,
  DIRECTORY_DCIM: Platform.OS === 'android' ? RNCuriosity.constants.DIRECTORY_DCIM : null,
  DIRECTORY_DOCUMENTS: Platform.OS === 'android' ? RNCuriosity.constants.DIRECTORY_DOCUMENTS : null,
  DIRECTORY_DOWNLOADS: Platform.OS === 'android' ? RNCuriosity.constants.DIRECTORY_DOWNLOADS : null,
  DIRECTORY_MOVIES: Platform.OS === 'android' ? RNCuriosity.constants.DIRECTORY_MOVIES : null,
  DIRECTORY_MUSIC: Platform.OS === 'android' ? RNCuriosity.constants.DIRECTORY_MUSIC : null,
  DIRECTORY_NOTIFICATIONS: Platform.OS === 'android' ? RNCuriosity.constants.DIRECTORY_NOTIFICATIONS : null,
  DIRECTORY_PICTURES: Platform.OS === 'android' ? RNCuriosity.constants.DIRECTORY_PICTURES : null,
  DIRECTORY_PODCASTS: Platform.OS === 'android' ? RNCuriosity.constants.DIRECTORY_PODCASTS : null,
  DIRECTORY_RINGTONES: Platform.OS === 'android' ? RNCuriosity.constants.DIRECTORY_RINGTONES : null,
  SDKVersion: Platform.OS === 'android' ? RNCuriosity.constants.SDKVersion : null,
  CacheDir: Platform.OS === 'android' ? RNCuriosity.constants.cacheDir : null,
  FilesDir: Platform.OS === 'android' ? RNCuriosity.constants.filesDir : null,
  ExternalCacheDir: Platform.OS === 'android' ? RNCuriosity.constants.externalCacheDir : null,
  ExternalFilesDir: Platform.OS === 'android' ? RNCuriosity.constants.externalFilesDir : null,
  ExternalStorageDirectory: Platform.OS === 'android' ? RNCuriosity.constants.externalStorageDirectory : null,
  FirstInstallTime: Platform.OS === 'android' ? RNCuriosity.constants.firstInstallTime : null,
  LastUpdateTime: Platform.OS === 'android' ? RNCuriosity.constants.lastUpdateTime : null,
  NavigationBarHeight: Platform.OS === 'android' ? RNCuriosity.constants.NavigationBarHeight : null,

  //IOS Constants
  AppName: Platform.OS === 'ios' ? RNCuriosity.constants.AppName : null,
  CachesDirectory: Platform.OS === 'ios' ? RNCuriosity.constants.CachesDirectory : null,
  DocumentDirectory: Platform.OS === 'ios' ? RNCuriosity.constants.DocumentDirectory : null,
  HomeDirectory: Platform.OS === 'ios' ? RNCuriosity.constants.HomeDirectory : null,
  LibraryDirectory: Platform.OS === 'ios' ? RNCuriosity.constants.LibraryDirectory : null,
  MinimumOSVersion: Platform.OS === 'ios' ? RNCuriosity.constants.MinimumOSVersion : null,
  PlatformName: Platform.OS === 'ios' ? RNCuriosity.constants.PlatformName : null,
  PlatformVersion: Platform.OS === 'ios' ? RNCuriosity.constants.PlatformVersion : null,
  SDKBuild: Platform.OS === 'ios' ? RNCuriosity.constants.SDKBuild : null,
  TemporaryDirectory: Platform.OS === 'ios' ? RNCuriosity.constants.TemporaryDirectory : null,
  SystemName: Platform.OS === 'ios' ? RNCuriosity.constants.systemName : null,

};


