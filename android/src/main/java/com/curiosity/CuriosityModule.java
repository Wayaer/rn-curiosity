package com.curiosity;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Vibrator;
import android.view.View;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.PixelUtil;


import java.io.IOException;
import java.util.Map;
import java.util.Objects;

@ReactModule(name = CuriosityModule.NAME)
public class CuriosityModule extends ReactContextBaseJavaModule {
    public static final String NAME = "RNCuriosity";


    public static ReactApplicationContext reactApplicationContext;

    public CuriosityModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactApplicationContext = reactContext;
    }

    @Override
    public String getName() {
        return NAME;
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
     * @param fontIconDark
     * @param navigationBarColor
     */
    @ReactMethod
    public void setNavigationBarColor(Boolean fontIconDark, String navigationBarColor) {
        NativeTools.setNavigationBarColor(getCurrentActivity(), navigationBarColor);
    }

    /**
     * 隐藏状态栏
     */

    @ReactMethod
    public void hideStatusBar() {
        int uiFlags = 0;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.JELLY_BEAN) {
            uiFlags = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_FULLSCREEN;
        }
        uiFlags |= 0x00001000;
        NativeTools.setSystemUiVisibility(getCurrentActivity(), uiFlags);
    }

    /**
     * 显示状态栏
     */

    @ReactMethod
    public void showStatusBar() {
        @SuppressLint("InlinedApi") int uiFlags = View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
        uiFlags |= 0x00001000;
        NativeTools.setSystemUiVisibility(getCurrentActivity(), uiFlags);
    }

    /**
     * 隐藏导航栏
     */
    @ReactMethod
    public void hideNavigationBar() {
        @SuppressLint("InlinedApi") int uiFlags = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_FULLSCREEN;
        NativeTools.setSystemUiVisibility(getCurrentActivity(), uiFlags);
    }

    /**
     * 显示导航栏
     */
    @SuppressLint("InlinedApi")
    @ReactMethod
    public void showNavigationBar() {
        NativeTools.setSystemUiVisibility(getCurrentActivity(), View.SYSTEM_UI_FLAG_VISIBLE);
    }

    /**
     * 单次振动
     *
     * @param time
     */
    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @ReactMethod
    public void singleVibration(int time) {
        Vibrator vibrator = (Vibrator) Objects.requireNonNull(getCurrentActivity()).getSystemService(Context.VIBRATOR_SERVICE);
        vibrator.vibrate(time);
    }

}
