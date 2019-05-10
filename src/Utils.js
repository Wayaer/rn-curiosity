'use strict';
import {
    RNFetchBlob,
    DatePicker, React, Component,
    Constant, height, scale, width, ModalIndicator, Overlay, Toast,
    AsyncStorage, NetInfo, NativeUtils
} from "../index";
import Storage from "./component/Storage";
import {NavigationActions, StackActions} from "react-navigation";
import {Platform, DeviceEventEmitter, BackHandler, ToastAndroid,} from "react-native";

const alertStyle = {height: height, width: width}
let storage;


export default class Utils {
    /**
     * promise例子
     * @param message
     * @param successCallback
     * @param failCallback
     */
    static promiseCallback(message, successCallback, failCallback) {
        NativeUtils.promiseCallback(message, successCallback, failCallback)
    }

    /**
     * Native发消息到JS
     * android
     * ios
     * @param message
     */
    static sendMessageNativeToJS(message) {
        NativeUtils.sendMessageNativeToJS(message)
    }


    /*
     * 显示第一屏 （不常用）
     * android
     * ios
     * */
    static SplashScreenHide() {
        NativeUtils.SplashScreenHide()
    }

    /*
     * 隐藏第一屏
     * android
     * ios
     * */
    static SplashScreenShow() {
        NativeUtils.showSplashScreen()
    }


    /*
     * 安装apk only android
     * apkFile apk路径
     * */
    static installApp(apkFilePath) {
        NativeUtils.installApp(apkFilePath)

    }


    /*
    * 退出app
    * android
    * ios
    * */
    static ExitApp() {
        NativeUtils.ExitApp()
    }

    /*
     * url获取cookie
     * android
     * ios
     * */
    static getCookie(url, callback) {
        NativeUtils.getCookie(url, callback);
    }


    /*
     * 获取android 外部 files目录
     * only android
     * */
    static getExternalFilesDir(callback) {
        NativeUtils.getExternalFilesDir(callback)
    }

    /*
     * 获取android 外部 cache目录
     * only android
     * */
    static getExternalCacheDir(callback) {
        NativeUtils.getExternalCacheDir(callback);
    }

    /*
     * 获取android 内部 files目录
     * only android
     * */
    static getFilesDir(callback) {
        NativeUtils.getFilesDir(callback);
    }

    /*
     * 获取android 内部 cache目录
     * only android
     * */
    static getCacheDir(callback) {
        NativeUtils.getCacheDir(callback);
    }


    /*
     * 获取ios HomeDirectory 目录
     * only ios
     * */
    static getHomeDirectory(callback) {
        NativeUtils.getHomeDirectory(callback);
    }

    /*
     * 获取ios Documents 目录
     * only ios
     * */
    static getDocuments(callback) {
        NativeUtils.getDocuments(callback);
    }

    /*
     * 获取ios LibraryDirectory 目录
     * only ios
     * */
    static getLibraryDirectory(callback) {
        NativeUtils.getLibraryDirectory(callback);
    }

    /*
     * 获取ios CachesDirectory 目录
     * only ios
     * */
    static getCachesDirectory(callback) {
        NativeUtils.getCachesDirectory(callback);
    }

    /*
     * 获取ios TemporaryDirectory 目录
     * only ios
     * */
    static getTemporaryDirectory(callback) {
        NativeUtils.getTemporaryDirectory(callback);
    }

    /*
    * 获取app版本名字 => '1.0.1
    * android
    * ios
    * */
    static getVersionName(callback) {
        NativeUtils.getVersionName(callback);
    }

    /*
    * 获取版本号  => 1
    * android
    * ios
    * */
    static getVersionCode(callback) {
        NativeUtils.getVersionCode(callback);
    }

    /*
    * 解压文件至压缩文件目录
    * data=> Success 解压完成  NotFile文件不存在
    * android
    * ios
    * */
    static unZipFile(filePath, callback) {
        NativeUtils.unZipFile(filePath, callback);
    }

    /*
     * 删除文件或目录
     * android
     * ios
     */
    static deleteFile(filePath) {
        NativeUtils.deleteFile(filePath);
    }

    /*
     * 删除目录内容 （不删除目录）
     * android
     * ios
     */
    static deleteFolder(foldrPath) {
        NativeUtils.deleteFolder(foldrPath);
    }

    /*
     * 获取文件或目录大小
     * android
     * ios
     */
    static getFilePathSize(filePath, callback) {
        NativeUtils.getFilePathSize(filePath, callback);
    }

    /*是否有该路径
     * android
     * ios
     */
    static isFolderExists(filePath, callback) {
        NativeUtils.isFolderExists(filePath, callback);
    }

    /*
     * 创建目录
     * android
     * 暂时不支持ios
     */
    static createDirectory(filePath, callback) {
        NativeUtils.createDirectory(filePath, callback);
    }


    static log(content) {
        if (!content) return Utils.logError('content')
        console.warn("LogInfo=> ", content)
    }

    static logError(content) {
        console.error("LogError=> Please the incoming " + content)
    }

    /*
    * react-navigation组件
    * */
    static navigationDidFocus(self, callback) {//页面已获取到焦点
        return self.props.navigation.addListener('didFocus', callback)
    }

    static navigationWillBlur(self, callback) {//页面已获取到焦点
        return self.props.navigation.addListener('willBlur', callback)
    }

    static navigationRemoveListener(navigation) {//去除页面焦点监听
        navigation.remove()
    }

    static goBack(self) {
        self.props.navigation.goBack(null)
    }

    static goBackRouteName(self, routeName) {
        const backAction = NavigationActions.back({
            key: routeName,
        });
        self.props.navigation.dispatch(backAction);
    }

    static pop(self, n) {//返回路由数量
        self.props.navigation.pop(n)
    }

    static goBackCallback(self, data) {
        const {goBack, state} = self.props.navigation;
        state.params.callback(data);
        goBack();
    }

    static goToResetView(self, routeName) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: routeName})
            ]
        })
        self.props.navigation.dispatch(resetAction)
    }

    static jumpView(self, routeName) {
        self.props.navigation.navigate(routeName)
    }

    static jumpDataView(self, routeName, data) {
        self.props.navigation.navigate(routeName, {data})
    }

    static jumpCallbackView(self, routeName, callback) {
        self.props.navigation.navigate(routeName, {
            callback: (data) => {
                return callback(data)
            }
        })
    }

    static jumpDataCallbackView(self, routeName, data, callback) {
        self.props.navigation.navigate(routeName, {
            data,
            callback: (data) => {
                return callback(data)
            }
        })
    }


    /*
  * loading弹窗
  * */
    static loadingShow(content) {
        ModalIndicator.show(content ? content : '加载中...')
        setTimeout(() => {
            ModalIndicator.hide()
        }, 30000)
    }

    static loadingHide() {
        ModalIndicator.hide()
    }

    //确保输入的全部是数字
    static allAreNum(number) {
        number = number.replace(/[^\d]/g, '' + '');
        return number;
    }

    /*
     * 全面屏适配
     * */
    static phoneFit() {
        const y = scale * height
        if (Platform.OS === 'android') {
            if (y < 1300) { //720p以下手机
                return false
            } else if (y > 1300 && y < 1650) {//720p 18:9
                return true
            } else if (y > 1700 && y < 1930) {//1080p 16:9
                return false
            } else if (y > 1930 && y < 2400) {//1080p 18:9 19.5:9
                return true
            } else if (y > 2400 && y < 2560) {//2k 16:9
                return false
            } else if (y > 2560 && y < 3300) {//2k 18:9  19.5:9
                return true
            } else {
                return false
            }
        } else if (Platform.OS === 'ios') {
            if (y < 1400) {//4.7寸 16:9
                return false
            } else if (y > 1400 && y < 1850) {//iphone xr 18:9
                return true
            } else if (y > 1850 && y < 2300) {//iphone plus 16:9
                return false
            } else if (y > 2300) {//iphone x  18:9
                return true
            }
        }
    }

    static phoneFitHeight() {
        const s = scale, h = height, y = scale * height
        if (Platform.OS === 'android') {
            if (y < 1000) { //720p以下手机
                return h
            } else if (y > 1000 && y < 1300) {//720p 16:9
                return h
            } else if (y > 1300 && y < 1650) {//720p 18:9
                return 1280 / s
            } else if (y > 1700 && y < 1930) {//1080p 16:9
                return h
            } else if (y > 1930 && y < 2400) {//1080p 18:9 19.5:9
                return 1920 / s
            } else if (y > 2400 && y < 2560) {//2k 16:9
                return h
            } else if (y > 2560 && y < 3300) {//2k 18:9  19.5:9
                return 2560 / s
            } else {
                return h
            }
        } else if (Platform.OS === 'ios') {
            if (y < 1400) {//4.7寸 16:9
                return h
            } else if (y > 1400 && y < 1850) {//iphone xr 18:9
                return 1334 / s
            } else if (y > 1850 && y < 2300) {//iphone plus 16:9
                return h
            } else if (y > 2300) {//iphone x  18:9
                return 2208 / s
            }
        }
    }

    /*
      * 获取等比例 设备宽度
      * */
    static getWidth(w) {
        return (w / 750) * width
    }

    /*
    * 获取等比例 设备高度//18:9高度转换16:9屏幕高度
    * */
    static getHeight(h) {
        return (h / 1334) * this.phoneFitHeight()
    }

    /*
     * 获取等比例 设备高度//真实高度=>包含18:9
     * */
    static getActualHeight(h) {
        return (h / 1334) * height
    }


    /*
      * 消息   发送  接收  注销监听
      * */
    static sendMessage(eventType, data) {
        DeviceEventEmitter.emit(eventType, data || '')
    }

    static receivesMessage(eventType, callback) {
        return DeviceEventEmitter.addListener(eventType, callback)
    }

    static removeReceivesMessage(receivesMessage) {
        receivesMessage.remove();
    }

    /*
     * 设备网络变化监听
     * */
    static netInfoAddEventListener(listener) {
        NetInfo.addEventListener("connectionChange", listener)
    }

    static netInfoRemoveEventListener(listener) {
        NetInfo.removeEventListener("connectionChange", listener)
    }

    static getNetInfo(callback, errorCallback) {
        NetInfo.getConnectionInfo().then(({type, effectiveType}) => {
            return callback(type, effectiveType)
        }).catch((e) => {
            return errorCallback(e)
        })
    }

    /*
      * android 返回键监听
      * */
    static backHandlerAddEventListener(listener) {
        if (Platform.OS === 'android') BackHandler.addEventListener("hardwareBackPress", listener)
    }

    static backHandlerRemoveEventListener(listener) {
        if (Platform.OS === 'android') BackHandler.removeEventListener("hardwareBackPress", listener)
    }

    static toastAndroid(text) {
        if (Platform.OS === 'android') ToastAndroid.show(text, ToastAndroid.SHORT);
    }

    /*
      * 自定义弹窗
      * */
    static alertPopView(view, style) {
        return Overlay.show(
            <Overlay.PopView
                overlayOpacity={style && style.overlayOpacity || 0.5}
                modal={style && style.modal || false}
                style={[alertStyle, style && style]}>{view}</Overlay.PopView>)
    }

    static alertPullView(view, style) {
        return Overlay.show(
            <Overlay.PullView
                overlayOpacity={style && style.overlayOpacity || 0.5}
                side={style && style.side || 'bottom'}
                modal={style && style.modal || false}
                style={[alertStyle, {justifyContent: 'flex-end'}, style && style]}>{view}</Overlay.PullView>)
    }

    static alertPopoverView(view, style) {
        return Overlay.show(
            <Overlay.PopoverView
                overlayOpacity={style && style.overlayOpacity || 0.5}
                direction={style && style.direction || "down"}
                autoDirection={style && style.autoDirection || true}
                align={style && style.align || 'end'}
                alignInsets={style && style.alignInsets || 0}
                showArrow={style && style.showArrow || true}
                paddingCorner={style && style.paddingCorner || 0}
                mmodal={style && style.modal || false}
                style={[alertStyle, {justifyContent: 'flex-end'}, style && style]}>{view}</Overlay.PopoverView>)
    }

    static alertPicker(pickerType, sureText, title, cancelText, onSureCallback, onCancelCallback) {
        let pickerView = Utils.alertPullView(
            <DatePicker
                pickerType={pickerType}
                sureText={sureText}
                cancelText={cancelText}
                title={title}
                onSure={(v) => {
                    Overlay.hide(pickerView)
                    return onSureCallback && onSureCallback(v)
                }}
                onCancel={() => {
                    Overlay.hide(pickerView)
                    return onCancelCallback && onCancelCallback()
                }}/>
        )
    }

    static getStorage() {
        if (storage === undefined) {
            storage = new Storage({
                size: 1000,
                // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
                // 如果不指定则数据只会保存在内存中，重启后即丢失
                storageBackend: AsyncStorage,
                defaultExpires: null,
                // 读写时在内存中缓存数据。默认启用。
                enableCache: true,
            });
        }
        return storage;
    }

    /*
     *保存数据
     * */
    static saveData(key, object) {
        Utils.isInit();
        storage.save({
            key: key,  // 注意:请不要在key中使用_下划线符号!
            data: object,
            expires: null
        });
    }

    /*
     *删除单个数据
     * */
    static removeData(key) {
        Utils.isInit();
        storage.remove({
            key: key,
        });
    }

    /*
     *移除所有"key-id"数据（但会保留只有key的数据）
     * */
    static removeAll() {
        Utils.isInit();
        storage.clearMap();
    }

    /*
     *清除某个key下的所有数据
     * */
    static clearDataByKey(key) {
        Utils.isInit();
        storage.clearMapForKey(key);
    }

    /*
     *查找某个key下的所有数据
     * */
    static findData(key, successCallBack, errorCallback) {
        Utils.isInit();
        storage.load({
            key: key,
        }).then(data => {
            return successCallBack(data);
        }).catch((error) => {
            return errorCallback(error)
        });
    }

    static isInit() {
        if (storage === undefined) {
            console.log("请先调用getStorage()进行初始化");
        }
    }

    /**
     * Toast
     */
    static Toast = (content) => {
        Toast.show({text: content, position: 'center', duration: 1500})
    };
    static ToastSuccess = (content) => {
        Toast.success(content)
    };
    static ToastFail = (content) => {
        Toast.fail(content)
    };
    static ToastSmile = (content) => {
        Toast.smile(content)
    };
    static ToastSad = (content) => {
        Toast.sad(content)
    };
    static ToastInfo = (content) => {
        Toast.info(content)
    };
    static ToastStop = (content) => {
        Toast.stop(content)
    }


    /**
     * netVersion={
     *     androidBundleVersion:0,
     *     androidVersion:1,
     *     iosBundleVersion:0,
     *     iosVersion:1,
     *   }
     * OSS目录文件
     *
     * OSS{
     *     android{
     *         bundle{
     *            版本号{
     *             bundle.zip
     *            }
     *         }
     *         apk{
     *            版本号{
     *               版本号.apk
     *           }
     *         }
     *     }
     *
     *     ios{
     *        bundle{
     *            版本号{
     *                bundle.zip
     *            }
     *        }
     *        ipa{  //分发平台版本号
     *            版本号{
     *                版本号.ipa
     *            }
     *        }
     *        store_ipa{ //官方版本号
     *            版本号{
     *                版本号.ipa
     *            }
     *        }
     *     }
     *
     * }
     */
    static uploadBundle(netVersion, OSSUrl) {
        this.getVersionCode((localVersionCode) => {
                if (Constant.Android) {
                    Utils.findData('androidBundleVersion', (bundleVersion) => {
                        if ((Number(netVersion.androidVersion)) === localVersionCode && (Number(netVersion.androidBundleVersion)) > bundleVersion) {
                            this.downloadFile(OSSUrl + 'android/bundle/' + Number(netVersion.androidBundleVersion) + '/bundle.zip', 'bundle.zip', (progress) => {
                            }, (finish) => {
                                Utils.unZipJsBundle((data) => {
                                    if (data === 0) {
                                        Utils.saveData('androidBundleVersion', (Number(netVersion.androidBundleVersion)))
                                    }
                                })
                            }, (callbackFail) => {
                                Utils.cleanCache()
                            })
                        } else if ((Number(netVersion.iosVersion)) === localVersionCode && (Number(netVersion.iosBundleVersion)) < bundleVersion) {
                            Utils.cleanCache()
                        }
                    }, (error) => {
                        Utils.saveData('androidBundleVersion', 0)
                        Utils.uploadBundle(netVersion)
                    })

                } else if (Constant.IOS) {
                    Utils.findData('iosBundleVersion', (bundleVersion) => {
                        if ((Number(netVersion.iosVersion)) === localVersionCode && (Number(netVersion.iosBundleVersion)) > bundleVersion) {
                            this.downloadFile(OSSUrl + 'ios/bundle/' + Number(localVersionCode) + '/bundle.zip', '/bundle.zip', (progress) => {
                                }, (finish) => {
                                    this.unZipJsBundle((data) => {
                                        if (data === 0) {
                                            Utils.saveData('iosBundleVersion', (Number(netVersion.androidBundleVersion)))
                                        }
                                    })
                                },
                                (callbackFail) => {
                                    this.cleanCache()
                                }
                            )
                        } else if ((Number(netVersion.iosVersion)) === localVersionCode && (Number(netVersion.iosBundleVersion)) < bundleVersion) {
                            this.cleanCache()
                        }
                    }, (error) => {
                        this.saveData('iosBundleVersion', 0)
                        this.uploadBundle(netVersion)
                    })
                }
            }
        )
    }

    /*
     *
     * 下载文件
     * */
    static downloadFile(url, path, fileNmae, callbackPercent, callbackFinish, callbackFail) {
        RNFetchBlob.config({
            path: path + fileNmae,
            fileCache: false,
        }).fetch('GET', url,).progress((received, total) => {
            return callbackPercent(received / total)
        }).then((finish) => {
            return callbackFinish(finish)
        }).catch((error) => {
            return callbackFail(error)
        })
    }


    /*
    * 清除本地缓存
    * */
    static cleanCache() {
        if (Constant.IOS) {
            NativeUtils.getCachesDirectory((cache) => {
                NativeUtils.deleteFolder(cache)
            })
        } else if (Constant.Android) {

        }
    }


    /*
    * 解压bundle文件
    * 固定位置
    * android:/data/user/0/{packageName}/files/
    * ios:/var/mobile/Containers/Data/Application/{186EE408-3B95-4A09-B8E2-E1C14B333E2B}/Library/
    * */
    static downloadBundleZipWithUnZip(url, callbackPercent, callbackUnzip) {
        if (Constant.IOS) {
            NativeUtils.getLibraryDirectory((path) => {
                Utils.downloadFile(url, path, 'bundle.zip', (percent) => {
                    return callbackPercent(percent)
                }, () => {
                    NativeUtils.unZipFile(path + 'bundle.zip', (zip) => {
                        return callbackUnzip(zip)
                    })
                })
            })
        } else if (Constant.Android) {
            NativeUtils.getFilesDir((path) => {
                console.log(path)
                Utils.downloadFile(url, path, 'bundle.zip', (percent) => {
                    return callbackPercent(percent)
                }, () => {
                    console.log(path + 'bundle.zip')
                    NativeUtils.unZipFile(path + 'bundle.zip', (zip) => {
                        return callbackUnzip(zip)
                    })
                })
            })
        }
    }


    /*
   * 删除Bundle文件或目录
   * android
   * ios 固定路径 /var/mobile/Containers/Data/Application/{570EAD8E-C3F9-4A8D-9A17-ACD3355AC501}/Library/bundle.zip
   *     固定路径 /var/mobile/Containers/Data/Application/{570EAD8E-C3F9-4A8D-9A17-ACD3355AC501}/Library/bundle/
   */
    static deleteBundle() {
        if (Constant.IOS) {
            NativeUtils.getLibraryDirectory((library) => {
                NativeUtils.deleteFile(library + 'bundle')
                NativeUtils.deleteFile(library + 'bundle.zip')
            })
        } else if (Constant.Android) {

        }
    }


}