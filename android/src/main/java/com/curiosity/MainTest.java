package com.curiosity;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.io.File;
import java.util.Arrays;
import java.util.List;

public class MainTest extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        /*
         * bundle加载判断
         */
        @Override
        protected String getJSBundleFile() {
            if (NativeTools.isBundle(getApplicationContext()) && NativeTools.matchingVersion(getApplicationContext())) {
                File file = new File(NativeTools.getFilesDir(getApplicationContext()) + "/bundle/index.bundle");
                return file.getAbsolutePath();
            } else {
                return super.getJSBundleFile();
            }
        }


        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new CuriosityPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }


// MainActivity
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        SplashScreen.show(this, true);  // 添加这一句
//        super.onCreate(savedInstanceState);
//
//        SharedPreferences m = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
//        SharedPreferences.Editor editor = m.edit();
//        editor.putString("debug_http_host", "192.168.3.10:8081");
//        editor.commit();

//    }


}
