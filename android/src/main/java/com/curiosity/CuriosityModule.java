package com.curiosity;

import android.content.Context;
import android.os.Vibrator;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.PixelUtil;


import java.io.IOException;
import java.util.Map;


public class CuriosityModule extends ReactContextBaseJavaModule {


    public static ReactApplicationContext reactApplicationContext;

    public CuriosityModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactApplicationContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNCuriosity";
    }

    @Override
    public @javax.annotation.Nullable
    Map<String, Object> getConstants() {
        WritableMap map = NativeTools.getAppInfo();
        map.putDouble("StatusBarHeight", getResourcesPixel("status_bar_height"));
        map.putDouble("NavigationBarHeight", getResourcesPixel("navigation_bar_height"));
        return MapBuilder.<String, Object>of("constants", map);
    }

    public float getResourcesPixel(String name) {
        final int id = reactApplicationContext.getResources()
                .getIdentifier(name, "dimen", "android");
        final float pixel = id > 0 ?
                PixelUtil.toDIPFromPixel(reactApplicationContext.getResources().getDimensionPixelSize(id)) : 0;
        return pixel;
    }

    /**
     * promise例子
     *
     * @param options
     * @param promise
     */
    @ReactMethod
    public void promiseCallback(@Nullable String options, Promise promise) {
        if (options == null) {
            promise.reject("0", "取消操作");
        } else {
            WritableArray map = new WritableNativeArray();
            map.pushString("第一个参数");
            map.pushString("第二个参数");
            promise.resolve(map);
        }
    }

    /**
     * 退出app
     */
    @ReactMethod
    public void exitApp() {
        NativeTools.exitApp();
    }

    @ReactMethod
    public void sendMessageNativeToJS(String eventName, WritableMap map) {
        NativeTools.sendMessageToJS(eventName, map);
    }


    /**
     * 获取cookie
     *
     * @param url
     * @param callback
     */
    @ReactMethod
    public void getAllCookie(String url, Callback callback) {
        callback.invoke(NativeTools.getAllCookie(url));
    }

    /**
     * 清除cookie
     */
    @ReactMethod
    public void clearAllCookie() {
        NativeTools.clearAllCookie();
    }


    /**
     * 获取app信息
     *
     * @param callback
     */
    @ReactMethod
    public void getAppInfo(Callback callback) {
        callback.invoke(NativeTools.getAppInfo());
    }


    /**
     * 安装apk
     *
     * @param apkFile
     */
    @ReactMethod
    public void installApp(String apkFile) {
        NativeTools.installApp(apkFile);
    }


    /**
     * 解压文件
     *
     * @param path
     * @param callback
     * @throws IOException
     */
    @ReactMethod
    public void unZipFile(String path, Callback callback) throws IOException {
        callback.invoke(NativeTools.unZipFile(path));
    }

    /**
     * 删除文件
     *
     * @param path
     */
    @ReactMethod
    public void deleteFile(String path) {
        NativeTools.deleteFile(path);
    }

    /**
     * 删除文件夹内容 （不删除文件夹）
     *
     * @param path
     */
    @ReactMethod
    public void deleteFolder(String path) {
        NativeTools.deleteFolder(path);
    }


    /**
     * 判断路径是否存在
     *
     * @param path
     * @param callback
     */
    @ReactMethod
    public void isFolderExists(String path, Callback callback) {
        callback.invoke(NativeTools.isFolderExists(path));
    }

    /**
     * 创建目录
     *
     * @param path
     * @param callback
     */
    @ReactMethod
    public void createFolder(String path, Callback callback) {
        callback.invoke(NativeTools.createFolder(path));
    }


    /**
     * 获取路径文件和文件夹大小
     *
     * @param path
     * @param callback
     */
    @ReactMethod
    public void getFilePathSize(String path, Callback callback) {
        callback.invoke(NativeTools.getFilePathSize(path));
    }


    /**
     * 跳转到应用商店
     *
     * @param packageName
     * @param marketPackageName
     */
    @ReactMethod
    public void goToMarket(String packageName, String marketPackageName) {
        NativeTools.goToMarket(packageName, marketPackageName);
    }

    /**
     * 修改状态栏背景颜色和字体颜色
     *
     * @param fontIconDark
     * @param statusBarColor
     */

    @ReactMethod
    public void setStatusBarColor(Boolean fontIconDark, String statusBarColor) {
        NativeTools.setStatusBarColor(getCurrentActivity(), fontIconDark, statusBarColor);
    }

    /**
     * 单次振动
     *
     * @param time
     */
    @ReactMethod
    public void singleVibration(int time) {
        Vibrator vibrator = (Vibrator) getCurrentActivity().getSystemService(getCurrentActivity().VIBRATOR_SERVICE);
        vibrator.vibrate(time);
    }


}