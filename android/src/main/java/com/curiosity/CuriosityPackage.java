
package com.curiosity;

import androidx.annotation.NonNull;

import com.curiosity.alipay.AliPayModule;
import com.curiosity.lineargradient.LinearGradient;
import com.curiosity.splashscreen.SplashScreenModule;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class CuriosityPackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(new CuriosityModule(reactContext), new AliPayModule(reactContext),
                new SplashScreenModule(reactContext));
    }

    // Deprecated from RN 0.47
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(new LinearGradient());

    }
}
