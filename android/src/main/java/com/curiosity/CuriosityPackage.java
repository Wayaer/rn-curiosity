
package com.curiosity;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.curiosity.alipay.AliPayModule;
import com.curiosity.database.Database;
import com.curiosity.lineargradient.LinearGradient;
import com.curiosity.splashscreen.SplashScreenModule;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;

public class CuriosityPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(new CuriosityModule(reactContext), new AliPayModule(reactContext), new SplashScreenModule(reactContext), new Database(reactContext));
    }

    // Deprecated from RN 0.47
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(new LinearGradient());

    }
}
