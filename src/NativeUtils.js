import {Constant} from "./BaseConstant";
import {NativeModules} from "react-native";
import Utils from "./Utils";

const RNCuriosity = NativeModules.RNCuriosity;
const SplashScreen = NativeModules.SplashScreen;
export {RNCuriosity}
export default class NativeUtils {

    /**
     * promise例子
     * @param message
     * @param successCallback
     * @param failCallback
     * @returns {*}
     */
    static promiseCallback = async (message, successCallback, failCallback) => {
        await RNCuriosity.promiseCallback(message).then((success) => {
            return successCallback(success)
        }).catch((e) => {
            return failCallback(e.code && e.code, e.message && e.message)
        })
    }

    /**
     * Native发消息到JS
     * android
     * ios
     * @param message
     */
    static sendMessageNativeToJS(message) {
        RNCuriosity.sendMessageNativeToJS(message)
    }


    /**
     * 显示第一屏 （不常用）
     * android
     * ios
     * @constructor
     */
    static SplashScreenHide() {
        if (Constant.IOS) {
            RNCuriosity.hideSplashScreen()
        } else {
            SplashScreen.hideSplashScreen()
        }
    }

    /**
     * 隐藏第一屏
     * android
     * ios
     * @constructor
     */
    static SplashScreenShow() {
        if (Constant.IOS) {
            RNCuriosity.showSplashScreen()
        } else {
            SplashScreen.showSplashScreen()
        }
    }


    /**
     * 安装apk only android
     * apkFile apk路径
     * @param apkFilePath
     */
    static installApp(apkFilePath) {
        if (!apkFilePath) return Utils.logError('apkFilePath')
        RNCuriosity.installApp(apkFilePath)

    }

    /**
     * 退出app
     * android
     * ios
     * @constructor
     */
    static ExitApp() {
        RNCuriosity.exitApp()
    }

    /**
     * url获取cookie
     * android
     * ios
     * @param url
     * @param callback
     */
    static getCookie(url, callback) {
        if (!url) return Utils.logError('url')
        if (Constant.Android) {
            RNCuriosity.getAllCookie(url, (data) => {
                return callback(data)
            });
        } else if (Constant.IOS) {
            RNCuriosity.getAllCookie((data) => {
                return callback(data)
            })
        }

    }


    /**
     * 获取android 外部 files目录
     * only android
     * @param callback
     */
    static getExternalFilesDir(callback) {
        if (Constant.Android && callback) RNCuriosity.getExternalFilesDir((data) => {
            return callback(data + '/')
        });
    }

    /**
     * 获取android 外部 cache目录
     * only android
     * @param callback
     */
    static getExternalCacheDir(callback) {
        if (Constant.Android && callback) RNCuriosity.getExternalCacheDir((data) => {
            return callback(data + '/')
        });
    }

    /**
     * 获取android 内部 files目录
     * only android
     * @param callback
     */
    static getFilesDir(callback) {
        if (Constant.Android && callback) RNCuriosity.getFilesDir((data) => {
            return callback(data + '/')
        });
    }

    /**
     * 获取android 内部 cache目录
     * only android
     * @param callback
     */
    static getCacheDir(callback) {
        if (Constant.Android && callback) RNCuriosity.getCacheDir((data) => {
            return callback(data + '/')
        });
    }


    /**
     * 获取ios HomeDirectory 目录
     * only ios
     * @param callback
     */
    static getHomeDirectory(callback) {
        if (Constant.IOS && callback) RNCuriosity.getHomeDirectory((data) => {
            return callback(data + '/')
        });
    }

    /**
     * 获取ios Documents 目录
     * only ios
     * @param callback
     */
    static getDocuments(callback) {
        if (Constant.IOS && callback) RNCuriosity.getDocuments((data) => {
            return callback(data + '/')
        });
    }

    /**
     * 获取ios LibraryDirectory 目录
     * only ios
     * @param callback
     */
    static getLibraryDirectory(callback) {
        if (Constant.IOS && callback) RNCuriosity.getLibraryDirectory((data) => {
            return callback(data + '/')
        });
    }

    /**
     * 获取ios CachesDirectory 目录
     * only ios
     * @param callback
     */
    static getCachesDirectory(callback) {
        if (Constant.IOS && callback) RNCuriosity.getCachesDirectory((data) => {
            return callback(data + '/')
        });
    }

    /**
     * 获取ios TemporaryDirectory 目录
     * only ios
     * @param callback
     */
    static getTemporaryDirectory(callback) {
        if (Constant.IOS && callback) RNCuriosity.getTemporaryDirectory((data) => {
            return callback(data)
        });
    }

    /**
     * 获取app版本名字 => '1.0.1
     * android
     * ios
     * @param callback
     */
    static getVersionName(callback) {
        if (callback) RNCuriosity.getVersionName((data) => {
            return callback(data)
        });
    }

    /**
     * 获取版本号  => 1
     * android
     * ios
     * @param callback
     */
    static getVersionCode(callback) {
        if (callback) RNCuriosity.getVersionCode((data) => {
            return callback(data)
        });
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
        if (!filePath) return Utils.logError('filePath')
        RNCuriosity.unZipFile(filePath, callback)//Success   NotFile  没有该文件
    }

    /**
     * 删除文件或目录
     * android
     * ios
     * @param filePath
     */
    static deleteFile(filePath) {
        if (!filePath) return Utils.logError('filePath')
        RNCuriosity.deleteFile(filePath)
    }

    /**
     * 删除目录内容 （不删除目录）
     * android
     * ios
     * @param foldrPath
     */
    stati

    static deleteFolder(foldrPath) {
        if (!foldrPath) return Utils.logError('foldrPath')
        RNCuriosity.deleteFolder(foldrPath)
    }

    /**
     * 获取文件或目录大小
     * android
     * ios
     * @param filePath
     * @param callback
     */
    static getFilePathSize(filePath, callback) {
        if (!filePath) return Utils.logError('filePath')
        RNCuriosity.getFilePathSize(filePath, (data) => {
            return callback(data)
        })
    }

    /**
     * 是否有该路径
     * android
     * ios
     * @param filePath
     * @param callback
     */
    static isFolderExists(filePath, callback) {
        if (!filePath) return Utils.logError('filePath')
        RNCuriosity.isFolderExists(filePath, (data) => {
            if (Constant.Android) {
                return callback(data)
            } else if (Constant.IOS) {
                if (data === "true") {
                    return callback(true)
                } else if (data === 'false') {
                    return callback(false)
                }
            }
        })
    }

    /**
     * 创建目录
     * android
     * 暂时不支持ios
     * @param filePath
     * @param callback
     */
    static createDirectory(filePath, callback) {
        if (!filePath) return Utils.logError('filePath')
        if (Constant.Android) {
            RNCuriosity.isFolderExists(filePath, (data) => {
                if (data) {
                    return callback('success')
                } else {
                    return callback('fail')
                }

            })
        }
    }


}