package com.curiosity;


import android.support.annotation.Nullable;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;

import java.io.IOException;


public class CuriosityModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;


    public CuriosityModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNCuriosity";
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

    /*
     * 退出app
     * */
    @ReactMethod
    public void exitApp() {
        NativeTools.exitApp();
    }

    /*
     * 获取cookie
     * */
    @ReactMethod
    public void getAllCookie(String url, Callback callback) {
        callback.invoke(NativeTools.getAllCookie(url));
    }

    /*
     * 清除cookie
     * */
    @ReactMethod
    public void clearAllCookie() {
        NativeTools.clearAllCookie();
    }

    /*
     * 获取VersionCode
     * */
    @ReactMethod
    public void getVersionCode(Callback callback) {
        callback.invoke(NativeTools.getAppVersionCode(getReactApplicationContext()));
    }

    /*
     * 获取VersionName
     * */
    @ReactMethod
    public void getVersionName(Callback callback) {
        callback.invoke(NativeTools.getAppVersionName(getReactApplicationContext()));
    }

    /*
     * 安装apk
     * */
    @ReactMethod
    public void installApp(String apkFile) {
        NativeTools.installApp(getReactApplicationContext(), apkFile);
    }

    /*
     * 获取android 外部 Files文件
     * getExternalFilesDir
     * */
    @ReactMethod
    public void getExternalFilesDir(Callback callback) {
        callback.invoke(NativeTools.getExternalFilesDir(getReactApplicationContext()));
    }

    /*
     * 获取android 外部 Cache文件
     * getExternalCacheDir
     * */
    @ReactMethod
    public void getExternalCacheDir(Callback callback) {
        callback.invoke(NativeTools.getExternalCacheDir(getReactApplicationContext()));
    }

    /*
     * 获取android 内部 Files文件
     * getFilesDir
     * */
    @ReactMethod
    public void getFilesDir(Callback callback) {
        callback.invoke(NativeTools.getFilesDir(getReactApplicationContext()));
    }

    /*
     * 获取android 内部 Cache文件
     * getCacheDir
     * */
    @ReactMethod
    public void getCacheDir(Callback callback) {
        callback.invoke(NativeTools.getCacheDir(getReactApplicationContext()));
    }

    /**
     * 解压文件
     */
    @ReactMethod
    public void unZipFile(String path, Callback callback) throws IOException {
        //callback.invoke(NativeTools.unZipFile(path,getReactApplicationContext()));
        callback.invoke(NativeTools.unZipFile(path));
    }

    /*
     * 删除文件
     * */
    @ReactMethod
    public void deleteFile(String path) {
        NativeTools.deleteFile(path);
    }

    /*
     * 删除文件夹内容 （不删除文件夹）
     * */
    @ReactMethod
    public void deleteFolder(String path) {
        NativeTools.deleteFolder(path);
    }


    /*
     * 判断路径是否存在
     * */
    @ReactMethod
    public void isFolderExists(String path, Callback callback) {
        callback.invoke(NativeTools.isFolderExists(path));
    }

    /*
     * 创建目录
     * */
    @ReactMethod
    public void createFolder(String path, Callback callback) {
        callback.invoke(NativeTools.createFolder(path));
    }

    /*
     * 创建目录
     * */
    @ReactMethod
    public void getFilePathSize(String path, Callback callback) {
        callback.invoke(NativeTools.getFilePathSize(path));
    }


    /*
     * 跳转到应用商店
     * */
    @ReactMethod
    public void goToMarket() {
        NativeTools.goToMarket(getReactApplicationContext());
    }


}