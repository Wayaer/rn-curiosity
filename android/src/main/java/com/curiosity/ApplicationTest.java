package com.curiosity;

import android.app.Application;

public class ApplicationTest extends Application {

   /* private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return null;
        }

     **
     * bundle加载判断
     * bundle更新加入代码
     **
        @Override
        protected String getJSBundleFile() {
           if (NativeTools.getBundleFile(getApplicationContext()) != null && NativeTools.matchingVersion(getApplicationContext())) {
                   return NativeTools.getBundleFile(getApplicationContext()).getAbsolutePath();
              } else {
                  return super.getJSBundleFile();
              }
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
        SoLoader.init(this, *//* native exopackage *//* false);
    }*/
}
