import {Constant} from "./BaseConstant";
import {NativeModules} from "react-native";
import Utils from "./Utils";

const RNCuriosity = NativeModules.RNCuriosity;
const SplashScreen = NativeModules.SplashScreen;
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
    static exitApp() {
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
     * android
     * ios
     * @param callback
     */
    static getAppInfo(callback) {
        if (callback) RNCuriosity.getAppInfo((data) => {
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

    /**
     * 跳转到应用市场
     * 多个应用市场展示应用市场列表
     *
     */
    static goToMarket(packageName, marketPackageName) {
        if (Constant.Android) {
            if (!packageName) return Utils.logError('packageName')
            RNCuriosity.goToMarket(packageName, marketPackageName)
        } else {
            RNCuriosity.goToMarket(packageName)
        }
    }

    /**
     * 设置状态栏背景颜色和字体颜色
     * @param fontIconDark     //Bool 状态栏字体是否为黑色
     * @param statusBarColor  //String  状态栏背景色 仅支持六进制颜色值 #000000 rgb  #00000000 rgba
     */
    static setStatusBarColor(fontIconDark, statusBarColor) {
        RNCuriosity.setStatusBarColor(fontIconDark, statusBarColor || "#00000000")
    }


}