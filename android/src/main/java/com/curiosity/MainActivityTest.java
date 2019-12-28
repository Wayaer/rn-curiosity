package com.curiosity;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;

import com.curiosity.splashscreen.SplashScreenModule;
import com.facebook.react.ReactActivity;

public class MainActivityTest extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Curiosity";
    }


    protected void onCreate(Bundle savedInstanceState) {
        SplashScreenModule.show(this, true);  // 开启启动屏 添加这一句
        super.onCreate(savedInstanceState);
        /**
         * run-android  固定服务端访问ip
         */
        SharedPreferences m = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
        SharedPreferences.Editor editor = m.edit();
        editor.putString("debug_http_host", "192.168.3.10:8081"); //修改为自己电脑的ip地址
        editor.commit();
    }

}
