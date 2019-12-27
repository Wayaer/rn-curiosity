import {NativeModules, Platform} from 'react-native';
import {NativeConstant} from './NativeConstant';

const RNCuriosity = NativeModules.RNCuriosity;
const SplashScreen = NativeModules.SplashScreen;


export class NativeUtils {
    /**
     * 检验传入参数是否正确
     * @param content
     */
    static logError(content) {
        console.error('LogError=> Please the incoming ' + content);
    }

    /**
     * promise例子
     * @param message
     * @param successCallback
     * @param failCallback
     * @returns {*}
     */
    static promiseCallback = async (message, successCallback, failCallback) => {
        await RNCuriosity.promiseCallback(message).then((success) => {
            return successCallback(success);
        }).catch((e) => {
            return failCallback(e.code && e.code, e.message && e.message);
        });
    };

    /**
     * Native发消息到JS
     * android
     * ios
     * @param eventName
     * @param map
     */
    static sendMessageNativeToJS(eventName, map) {
        RNCuriosity.sendMessageNativeToJS(eventName, map);
    }


    /**
     * 显示第一屏 （不常用）
     * android
     * ios
     * @constructor
     */
    static SplashScreenHide() {
        if (NativeConstant.IOS) {
            RNCuriosity.hideSplashScreen();
        } else {
            SplashScreen.hideSplashScreen();
        }
    }

    /**
     * 隐藏第一屏
     * android
     * ios
     * @constructor
     */
    static SplashScreenShow() {
        if (NativeConstant.IOS) {
            RNCuriosity.showSplashScreen();
        } else {
            SplashScreen.showSplashScreen();
        }
    }


    /**
     * 安装apk only android
     * apkFile apk路径
     * @param apkFilePath
     */
    static installApp(apkFilePath) {
        if (!apkFilePath) {
            return NativeUtils.logError('apkFilePath');
        }
        RNCuriosity.installApp(apkFilePath);

    }

    /**
     * 退出app
     * android
     * ios
     * @constructor
     */
    static exitApp() {
        RNCuriosity.exitApp();
    }

    /**
     * url获取cookie
     * android
     * ios
     * @param url
     * @param callback
     */
    static getCookie(url, callback) {
        if (!url) {
            return NativeUtils.logError('url');
        }
        if (NativeConstant.Android) {
            RNCuriosity.getAllCookie(url, (data) => {
                return callback(data);
            });
        } else if (NativeConstant.IOS) {
            RNCuriosity.getAllCookie((data) => {
                return callback(data);
            });
        }

    }

    /**
     * android
     * ios
     * @param callback
     */
    static getAppInfo(callback) {
        if (callback) {
            RNCuriosity.getAppInfo((data) => {
                return callback(data);
            });
        }
    }


    /**
     * 解压文件至压缩文件目录
     * data=> Success 解压完成  NotFile文件不存在
     * android
     * ios
     * @param filePath
     * @param callback
     */
    static unZipFile(filePath, callback) {
        if (!filePath) {
            return NativeUtils.logError('filePath');
        }
        RNCuriosity.unZipFile(filePath, callback);//Success   NotFile  没有该文件
    }

    /**
     * 删除文件或目录
     * android
     * ios
     * @param filePath
     */
    static deleteFile(filePath) {
        if (!filePath) {
            return NativeUtils.logError('filePath');
        }
        RNCuriosity.deleteFile(filePath);
    }

    /**
     * 删除目录内容 （不删除目录）
     * android
     * ios
     * @param foldrPath
     */

    static deleteFolder(foldrPath) {
        if (!foldrPath) {
            return NativeUtils.logError('foldrPath');
        }
        RNCuriosity.deleteFolder(foldrPath);
    }

    /**
     * 获取文件或目录大小
     * android
     * ios
     * @param filePath
     * @param callback
     */
    static getFilePathSize(filePath, callback) {
        if (!filePath) {
            return NativeUtils.logError('filePath');
        }
        RNCuriosity.getFilePathSize(filePath, (data) => {
            return callback(data);
        });
    }

    /**
     * 是否有该路径
     * android
     * ios
     * @param filePath
     * @param callback
     */
    static isFolderExists(filePath, callback) {
        if (!filePath) {
            return NativeUtils.logError('filePath');
        }
        RNCuriosity.isFolderExists(filePath, (data) => {
            if (NativeConstant.Android) {
                return callback(data);
            } else if (NativeConstant.IOS) {
                if (data === 'true') {
                    return callback(true);
                } else if (data === 'false') {
                    return callback(false);
                }
            }
        });
    }

    /**
     * 创建目录
     * android
     * 暂时不支持ios
     * @param filePath
     * @param callback
     */
    static createDirectory(filePath, callback) {
        if (!filePath) {
            return NativeUtils.logError('filePath');
        }
        if (NativeConstant.Android) {
            RNCuriosity.isFolderExists(filePath, (data) => {
                if (data) {
                    return callback('success');
                } else {
                    return callback('fail');
                }

            });
        }
    }

    /**
     * 跳转到应用市场
     * 多个应用市场展示应用市场列表
     *
     */
    static goToMarket(packageName, marketPackageName) {
        if (NativeConstant.Android) {
            if (!packageName) {
                return NativeUtils.logError('packageName');
            }
            RNCuriosity.goToMarket(packageName, marketPackageName);
        } else {
            RNCuriosity.goToMarket(packageName);
        }
    }

    /**
     * 设置状态栏背景颜色和字体颜色
     * @param fontIconDark     //Bool 状态栏字体是否为黑色
     * @param statusBarColor  //String  状态栏背景色 仅支持六进制颜色值 #000000 rgb  #00000000 rgba
     */
    static setStatusBarColor(fontIconDark, statusBarColor) {
        RNCuriosity.setStatusBarColor(fontIconDark, statusBarColor || '#00000000');
    }

    /**
     * 设置导航栏背景
     * @param fontIconDark     //Bool 状态栏字体是否为黑色
     * @param navigationBarColor  //String  状态栏背景色 仅支持六进制颜色值 #000000 rgb  #00000000 rgba
     */
    static setNavigationBarColor(fontIconDark, navigationBarColor) {
        if (NativeConstant.Android) {
            RNCuriosity.setNavigationBarColor(fontIconDark, navigationBarColor || '#00000000');
        }
    }

    /**
     * 隐藏底部导航栏
     */
    static hideNavigationBar() {
        RNCuriosity.hideNavigationBar();
    }

    /**
     * 显示底部导航栏
     */
    static showNavigationBar() {
        RNCuriosity.showNavigationBar();
    }

    /**
     * 隐藏状态栏
     */
    static hideStatusBar() {
        RNCuriosity.hideStatusBar();
    }

    /**
     * 显示状态栏
     */
    static showStatusBar() {
        RNCuriosity.showStatusBar();
    }

    /**
     * 单次振动时常，时常不同 震感不同，可搭配for循环 循环振动
     * @param time
     */
    static singleVibration(time) {
        RNCuriosity.singleVibration(time);
    }

    static changeNotificationSetting(time) {
        RNCuriosity.changeNotificationSetting(time);
    }

    static checkNotificationPermission() {
        RNCuriosity.checkNotificationPermission();
    }

}
