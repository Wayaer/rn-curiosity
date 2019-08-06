
# rn-curiosity

 react-native >0.60.0
```

  yarn add rn-curiosity
 
```
 
 react-native <0.59
```
   yarn add rn-curiosity

   react-native link rn-curiosity 
```
0.60以下版本Android编译会报错 
```
   import androidx . annotation. Nullable;
```
需要在 android/gradle.properties 文件下
加入以下代码
```

   android.useAndroidX=true
   android.enableJetifier=true
   
```

# 必须加入的库

```
  yarn add rn-fetch-blob       

  yarn add @react-native-community/async-storage 

  yarn add @react-native-community/netinfo 
```

#组件方法导入方式

rn-curiosity 继承 react-native 、@react-native-community/netinfo、@react-native-community/async-storage 全部组件和方法

```

  import {TouchView, Curiosity, View, React, Component} from "rn-curiosity";

```
#组件

   
Checkbox
```html
<CustomCheckbox
      onChange={(check)=>{
         //
      }}
      checkedIcon={ }     //选中时 的图片
      uncheckedIcon={  }  //未选中时 的图片
      checked={  }        // 默认状态
   />
```

渐变组件   
```html

   <LinearGradient
       horizontal={true}
       colors={['#000000', '#ffffff']}
       viewStyle={{
           flexDirection: 'row',
           height: Constant.CurrentHeight + Curiosity.getHeight(100),
           paddingTop: Constant.CurrentHeight,
           alignItems: 'center',
           width: Screen_Width,
           justifyContent: 'space-between',
           paddingHorizontal: Curiosity.getWidth(25),
       }}
       style={{}}>
   </LinearGradient>
``` 
单线动画
```html
  <BarLine
    progress={this.state.progress}  //0 ~ 1
    style={{
        width: this.width,
        unfilledColor: Colors.gray999,
        color: Colors.blueStart,
    }}/>}

```

时间选择器 
```html
 <DatePicker/>
```
<img  src="src/res/ios_datePicker.png" width="420" height = "750"> <img  src="src/res/android_datePicker.png" width="420" height = "750">


属性

```pickerType || 'dateTime'  类型  

   
    /* pickerType:
     *       date        =>年月日选择
     *       dateTime    =>年月日时分秒选择
     *       time        =>时分秒选择
     */
     
 itemHeight         单层item高度
 
 title || 'Select'  头部文字
 
 cancelTextStyle    取消文字样式
 
 cancelTouchStyle   取消触摸区域样式
 
 sureTextStyle      确定文字样式
 
 sureTouchStyle     确定触摸区域样式
 
 titleTextStyle     头部文字样式
 
 showUnit || true  是否显示文字（年月日）
 
 pickerTimeInterval || ['2019-01-01', '2029-01-01']   选择时间区间  //不支持time类型
 
 defaultSelectTime: '2019-02-28 03:04:05',  默认选中时间  //不支持time类型
 
 ```

 
 
事件
```
onSure     确定 回调

onCancel   取消 回调
```


例

```
   Curiosity.alertPicker({
            showUnit: true, itemHeight: 30,
            showUnit={pickerValue.showUnit}//是否显示年月日时分秒 文字
            pickerType: 'dateTime', //time date dateTime
            defaultSelectTime: '2019-02-28 03:04:05',    //不支持time类型
            pickerTimeInterval: ['2018-01-12 23:34:45', '2026-01-07 23:34:45'],  //不支持time类型
            sureText: '确定', title: '时间选择器', cancelText: '取消',
        }, (time) => {
            Curiosity.Toast(time)

        }, () => {

        })
```    

常量
加入多个原生app信息[详见Constant](src/BaseConstant.js)
```
import {FontSize, Colors, Constant,} from "rn-curiosity";

  FontSize.textSize_20  => 7 ~ 65 字体大小
  
  Colors.mainWhite    
  
  Constant
     Constant.IOS                     //ios设备
     Constant.Android                 //android设备
     Constant.ActualScreen_Height     //屏幕实际高度 （包含全面屏和非全面屏）
     Constant.Screen_Width            //屏幕宽度
     Constant.Screen_Scale            //屏幕像素密度
     Constant.ShadowStyle             //阴影样式 （兼容ios && android）
       
``` 

#方法 Curiosity
[参考Curiosity文件](src/Curiosity.js)

```
  使用方法
  
  Curiosity.方法名()
  
  Curiosity.sendMessageNativeToJS()

```

#热更新
```
 *分别在android & ios bundle.zip 中加入version.json文件，

 version.json  * 用于匹配当前app版本号和bundle内app版本号是否匹配，不匹配则删除 bundle.zip

 {
   appVersion:1  //版本号为android:versionCode   ios:Build
 }
```


Android:
[参考ApplicationTest](android/src/main/java/com/curiosity/ApplicationTest.java)

    
```

   android/app/src/com/包名/MainApplication 中加入以下代码
   
   
       
   import com.curiosity.NativeTools;
   import java.io.File;
   
   
   public class MainApplication extends Application implements ReactApplication {
     
     ...
     private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        
       ...
       /*
        * bundle加载判断
        * */
       @Override
       protected String getJSBundleFile() {
         if (NativeTools.isBundle(getApplicationContext()) && NativeTools.matchingVersion(getApplicationContext())) {
           File file = new File(NativeTools.getFilesDir(getApplicationContext()) + "/bundle/index.bundle");
           return file.getAbsolutePath();
         } else {
           return super.getJSBundleFile();
         }
       }
       ...
       
      };
      ...
      
    }
   
```


IOS:

[参考AppDelegateTest](ios/AppDelegateTest.m)

[IOS 运行http请求文件配置信息](ios/ioshttp.png)

```
//热更新导入头部

#import "RNCuriosity.h"



热更新 react-native 0.40>&&<0.59

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{

...
NSURL *jsCodeLocation;
#ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else

   if([NativeTools isBundle]&&[NativeTools matchingVersion]){
        jsCodeLocation=[NativeTools urlBundle];
    }else{
        jsCodeLocation =[[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"/index" fallbackResource:nil];
   }
#endif

...

  [NativeTools showSplashScreen];  //开启启动屏
  return YES;
}



热更新 react-native >0.59
...
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
   return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
    if([RNCuriosity isBundle]&&[RNCuriosity matchingVersion]){
       return [RNCuriosity urlBundle];
   }else{
        return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
    }
#endif
}
...

```
#JS调用热更新

```
  调用方式
  参数传递见方法注解，bundle 本地储存地址均为固定地址，不可改变

  Curiosity.uploadBundle()  //bundle版本校验及下载解压，
  
  Curiosity.downloadBundleZipWithUnZip()  //bundle 下载和解压，具体的版本校验自行判断

```
[参考Curiosity文件uploadBundle方法和downloadBundleZipWithUnZip方法](src/Curiosity.js)
```
    /**
     * 此方法包含 校验bundle版本号匹配问题已经下载和解压
     * 版本号必须为int类型，字段key 不可改变
     * netVersion={
     *     androidBundleVersion:0,
     *     androidVersion:1,
     *     iosBundleVersion:0,
     *     iosVersion:1,
     *   }
     * OSS目录文件 服务器文件下载目录,目录不可更改
     *
     * ├── OSS
     *      ├──android
     *            ├──bundle
     *                 ├── 0  (版本号)
     *                     └──bundle.zip
     *                 ├── 1  (版本号)
     *                     └──bundle.zip
     *                 ├── 2  (版本号)
     *                     └──bundle.zip
     *            ├──apk
     *                 ├── 0  (版本号)
     *                     └──0.apk
     *                 ├── 1  (版本号)
     *                     └──1.apk
     *                 ├── 2  (版本号)
     *                     └──2.apk
     *       ├──ios
     *            ├──bundle
     *                 ├── 0  (版本号)
     *                     └──bundle.zip
     *                 ├── 1  (版本号)
     *                     └──bundle.zip
     *                 ├── 2  (版本号)
     *                     └──bundle.zip
     *            ├──ipa     //分发平台版本号
     *                 ├── 0  (版本号)
     *                     └──0.apk
     *                 ├── 1  (版本号)
     *                     └──1.apk
     *                 ├── 2  (版本号)
     *                     └──2.apk
     *            ├──store_ipa  //官方版本号
     *                 ├── 0  (版本号)
     *                     └──0.apk
     *                 ├── 1  (版本号)
     *                     └──1.apk
     *                 ├── 2  (版本号)
     *                     └──2.apk
     *
     * @param netVersion
     * @param localAndroidBundleVersion    可在package.json中加入两个字段 并从中获取
     * @param localIosBundleVersion        可在package.json中加入两个字段 并从中获取
     * @param OSSUrl
     * @param bundleUnZip
     */
     static uploadBundle(netVersion, localAndroidBundleVersion, localIosBundleVersion, OSSUrl, bundleUnZip) {
       if (this.checkNumber(netVersion.androidBundleVersion) &&
         this.checkNumber(netVersion.androidVersion) &&
         this.checkNumber(netVersion.iosBundleVersion) &&
         this.checkNumber(netVersion.iosVersion) &&
         this.checkNumber(localAndroidBundleVersion) &&
         this.checkNumber(localIosBundleVersion)) {
         const localVersionCode = Constant.VersionCode;
         if (Constant.Android) {
           if ((netVersion.androidVersion) === localVersionCode && (netVersion.androidBundleVersion) > localAndroidBundleVersion) {
             Curiosity.downloadBundleZipWithUnZip(OSSUrl + 'android/bundle/' + (netVersion.androidBundleVersion) + '/bundle.zip', (percent) => {
             }, () => {
               bundleUnZip && bundleUnZip();
             });
           } else if ((netVersion.iosVersion) === localVersionCode && (netVersion.iosBundleVersion) < localAndroidBundleVersion) {
             Curiosity.deleteBundle();
           }
         } else if (Constant.IOS) {
           if ((netVersion.iosVersion) === localVersionCode && (netVersion.iosBundleVersion) > localIosBundleVersion) {
             Curiosity.downloadBundleZipWithUnZip(OSSUrl + 'android/bundle/' + (netVersion.androidBundleVersion) + '/bundle.zip', (percent) => {
             }, () => {
               bundleUnZip && bundleUnZip();
             });
           } else if ((netVersion.iosVersion) === localVersionCode && (netVersion.iosBundleVersion) < localIosBundleVersion) {
             this.deleteBundle();
           }
         }
       } else {
         return console.error('version type error (not number)');
       }
     }
     
     
     
     
   /**
    * 下载并解压bundle文件,此方法只可以下载和解压至固定位置，
    * 固定位置
    * android:/data/user/0/{packageName}/files/
    * ios:/var/mobile/Containers/Data/Application/{186EE408-3B95-4A09-B8E2-E1C14B333E2B}/Library/
    *
    * @param url
    * @param callbackPercent
    * @param callbackUnzip
    */
   static downloadBundleZipWithUnZip(url, callbackPercent, callbackUnzip) {
     if (Constant.IOS) {
       const path = Constant.LibraryDirectory + '/';
       FetchBlob.downloadFile(url, path, 'bundle.zip', (percent) => {
         return callbackPercent(percent);
       }, () => {
         NativeUtils.unZipFile(path + 'bundle.zip', (zip) => {
           return callbackUnzip(zip);
         });
       }, (fail) => {
         return console.error('download Fail');
       });
     } else if (Constant.Android) {
       const path = Constant.FilesDir + '/';
       FetchBlob.downloadFile(url, path, 'bundle.zip', (percent) => {
         return callbackPercent(percent);
       }, () => {
         NativeUtils.unZipFile(path + 'bundle.zip', (zip) => {
           return callbackUnzip(zip);
         });
       }, (fail) => {
         return console.error('download Fail');
       });
     }
   }

     
     
     
```

Android问题解决

android react-native-gesture-handler 编译爆红

<img  src="src/res/android_support.v4.png" width="852" height = "294">

``` 
   问题： 程序包android.support.v4 不存在
   
   原因： 0.60.0以下旧版本无法兼容 AndroidX  
 
   解决办法： （所有v4包找不到的问题 都可用此办法，如果yarn或者npm后，都需要执行以下代码）
  
   npm install --save-dev jetifier （如若已安装jetifier 可省略此步骤）
   
   npx jetify
   
   cd android && ./gradlew clean
   
   react-native run-android
   
```

   如果你安装新的第三方库 一定要执行
   
   npx jetify


android 9.0 无法请求接口问题解决

```
android/src/main/AndroidManiTest.xml  中加入代码

  
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.happylife">

    <uses-permission android:name="android.permission.INTERNET" />
 
    <application
        android:name=".MainApplication"
        android:allowBackup="false"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:networkSecurityConfig="@xml/network_config"     //加入代码
        android:roundIcon="@mipmap/ic_launcher_round"
        android:theme="@style/AppTheme">
        <activity
            android:name=".MainActivity"
            android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
            android:label="@string/app_name"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />
    </application>

</manifest>


```

推荐库

```

 react-native-fast-image `  //大图片优化

 react-native-syan-image-picker //图片选择
 
 lottie-react-native 动画库
```


