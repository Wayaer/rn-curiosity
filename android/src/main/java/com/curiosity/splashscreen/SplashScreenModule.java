package com.curiosity.splashScreen;

import android.app.Activity;
import android.app.Dialog;

import com.curiosity.R;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.lang.ref.WeakReference;


public class SplashScreenModule extends ReactContextBaseJavaModule {

    private static final String REACT_CLASS = "SplashScreen";
    private static Dialog mSplashDialog;
    private static WeakReference<Activity> mActivity;


    public SplashScreenModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public String getName() {
        return REACT_CLASS;
    }

    /**
     * 打开启动屏
     */
    @ReactMethod
    public void showSplashScreen() {
        show(getCurrentActivity(), false);
    }

    /**
     * 关闭启动屏
     */
    @ReactMethod
    public void hideSplashScreen() {
        Activity activity = getCurrentActivity();
        if (activity == null) {
            if (mActivity == null) {
                return;
            }
            activity = mActivity.get();
        }
        if (activity == null) return;

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (mSplashDialog != null && mSplashDialog.isShowing()) {
                    mSplashDialog.dismiss();
                    mSplashDialog = null;
                }
            }
        });
    }


    /**
     * 打开启动屏
     */
    public static void show(final Activity activity, final boolean fullScreen) {
        if (activity == null) return;
        mActivity = new WeakReference<Activity>(activity);
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (!activity.isFinishing()) {
                    mSplashDialog = new Dialog(activity, fullScreen ? R.style.SplashScreen_Fullscreen : R.style.SplashScreen_SplashTheme);
                    mSplashDialog.setContentView(R.layout.launch_screen);
                    mSplashDialog.setCancelable(false);
                    if (!mSplashDialog.isShowing()) {
                        mSplashDialog.show();
                    }
                }
            }
        });
    }
}