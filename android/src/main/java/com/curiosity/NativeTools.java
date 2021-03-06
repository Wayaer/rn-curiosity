package com.curiosity;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.ValueCallback;

import androidx.annotation.RequiresApi;
import androidx.core.content.FileProvider;

import com.curiosity.utils.FileUtils;
import com.facebook.react.bridge.GuardedRunnable;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.PixelUtil;

import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;


/**
 * Created by Wayaer on 2017/9/15.
 */

public class NativeTools {

    public static float getResourcesPixel(ReactApplicationContext reactApplicationContext, String name) {
        final int id = reactApplicationContext.getResources()
                .getIdentifier(name, "dimen", "android");
        return id > 0 ?
                PixelUtil.toDIPFromPixel(reactApplicationContext.getResources().getDimensionPixelSize(id)) : 0;
    }

    /**
     * @param content
     */
    public static void LogInfo(String content) {
        Log.i("LogInfo==> ", content);
    }


    /**
     * 判断是否有该路径
     *
     * @param path
     * @return
     */

    public static boolean isFolderExists(String path) {
        File file = new File(path);
        if (!file.exists()) {
            return false;
        } else {
            return true;
        }
    }


    /**
     * 判断是否有该路径,如果没有就创建,传入路径
     *
     * @param folder
     * @return
     */
    public static boolean createFolder(String folder) {
        File file = new File(folder);
        if (!file.exists()) {
            if (file.mkdirs()) {
                return true;
            }
        }
        return true;
    }

    /**
     * 退出app
     */
    public static void exitApp() {
        //杀死进程，否则就算退出App，App处于空进程并未销毁，再次打开也不会初始化Application
        //从而也不会执行getJSBundleFile去更换bundle的加载路径 !!!
        android.os.Process.killProcess(android.os.Process.myPid());
        System.exit(0);
    }

    /**
     * 获取cookie
     *
     * @param url
     * @return
     */
    public static String getAllCookie(String url) {
        return CookieManager.getInstance().getCookie(url);
    }

    /**
     * 清除cookie
     */
    public static void clearAllCookie() {
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP) {
            CookieManager.getInstance().removeAllCookies(new ValueCallback<Boolean>() {
                @Override
                public void onReceiveValue(Boolean value) {
                }
            });
        } else {
            CookieManager.getInstance().removeAllCookie();
        }
    }


    @SuppressLint({"MissingPermission", "NewApi"})
    public static WritableMap getAppInfo() {
        Context context = CuriosityModule.reactApplicationContext;
        PackageManager appInfo = context.getPackageManager();
        WritableMap map = new WritableNativeMap();
        String filesDir = context.getFilesDir().getPath();
        String cacheDir = context.getCacheDir().getPath();
        if (Environment.MEDIA_MOUNTED.equals(Environment.getExternalStorageState()) || !Environment.isExternalStorageRemovable()) {
            map.putString("externalCacheDir", context.getExternalCacheDir().getPath() + "");
            map.putString("externalFilesDir", context.getExternalFilesDir(null).getPath() + "");
            map.putString("externalStorageDirectory", Environment.getExternalStorageDirectory() + "");
            map.putString("DIRECTORY_DCIM", Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM) + "");
            map.putString("DIRECTORY_DOWNLOADS", Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS) + "");
            map.putString("DIRECTORY_MOVIES", Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES) + "");
            map.putString("DIRECTORY_MUSIC", Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MUSIC) + "");
            map.putString("DIRECTORY_PICTURES", Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES) + "");
            map.putString("DIRECTORY_ALARMS", Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_ALARMS) + "");
            map.putString("DIRECTORY_DOCUMENTS", Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOCUMENTS) + "");
            map.putString("DIRECTORY_NOTIFICATIONS", Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_NOTIFICATIONS) + "");
            map.putString("DIRECTORY_RINGTONES", Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_RINGTONES) + "");
            map.putString("DIRECTORY_PODCASTS", Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PODCASTS) + "");
        } else {
            map.putString("externalFilesDir", filesDir + "");
            map.putString("externalCacheDir", cacheDir + "");
        }
        map.putString("filesDir", filesDir + "");
        map.putString("cacheDir", cacheDir + "");
        map.putString("phoneModel", android.os.Build.MODEL);
        map.putString("phoneBrand", android.os.Build.BRAND);
        map.putString("systemVersion", android.os.Build.VERSION.RELEASE);
        map.putString("SDKVersion", Build.VERSION.SDK);
        try {
            PackageInfo info = appInfo.getPackageInfo(context.getPackageName(), 0);
            map.putString("packageName", info.packageName);
            map.putInt("versionCode", info.versionCode);
            map.putString("versionName", info.versionName);
            map.putString("firstInstallTime", String.valueOf(info.firstInstallTime));
            map.putString("lastUpdateTime", String.valueOf(info.lastUpdateTime));
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        return map;
    }


    /**
     * 安装apk
     *
     * @param apkFile
     */
    public static void installApp(String apkFile) {
        Context context = CuriosityModule.reactApplicationContext;
        File file = new File(apkFile);
        Intent intent = new Intent(Intent.ACTION_VIEW);
        // 由于没有在Activity环境下启动Activity,设置下面的标签
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        //版本在7.0以上是不能直接通过uri访问的
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            //参数1 上下文, 参数2 Provider主机地址 和配置文件中保持一致   参数3  共享的文件
            Uri apkUri = FileProvider.getUriForFile(context, context.getPackageName() + ".provider", file);
            //添加这一句表示对目标应用临时授权该Uri所代表的文件
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
        } else {
            intent.setDataAndType(Uri.fromFile(file),
                    "application/vnd.android.package-archive");
        }
        context.startActivity(intent);
    }


    /**
     * 获取android 内部 Files文件
     *
     * @return
     */
    public static String getFilesDir(Context context) {
        return context.getFilesDir().getPath();
    }

    /**
     * 获取android 内部 Files文件
     *
     * @return
     */
    public static String getExternalFilesDir(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.FROYO) {
            return context.getExternalFilesDir(null).getPath();
        }
        return null;
    }

    /**
     * 解压文件
     *
     * @param zipPath
     * @return
     */
    public static String unZipFile(String zipPath) {
        if (isFolderExists(zipPath)) {
            try {
                String[] pathArr = zipPath.split("/");
                String fileName = pathArr[pathArr.length - 1];
                String filePath = zipPath.substring(0, zipPath.length() - fileName.length());
                ZipFile file = new ZipFile(new File(zipPath));
                Enumeration zList = file.entries();
                byte[] buf = new byte[1024];
                while (zList.hasMoreElements()) {
                    ZipEntry ze = (ZipEntry) zList.nextElement();
                    if (ze.isDirectory()) {
                        String dirStr = filePath + ze.getName();
                        dirStr = new String(dirStr.getBytes("8859_1"), "GB2312");
                        File f = new File(dirStr);
                        f.mkdir();
                        continue;
                    }
                    OutputStream os = new BufferedOutputStream(new FileOutputStream(FileUtils.getRealFileName(filePath, ze.getName())));
                    InputStream is = new BufferedInputStream(file.getInputStream(ze));
                    int readLen = 0;
                    while ((readLen = is.read(buf, 0, 1024)) != -1) {
                        os.write(buf, 0, readLen);
                    }
                    is.close();
                    os.close();
                }
                file.close();
                return "Success";
            } catch (IOException e) {
                return "NotFile";
            }
        } else {
            return "NotFile";
        }
    }


    /**
     * 获取路径文件和文件夹大小
     *
     * @param filePath
     * @return
     */
    public static String getFilePathSize(final String filePath) {
        if (isFolderExists(filePath)) {
            File file = new File(filePath);
            if (file.isDirectory()) {
                return FileUtils.getDirectorySize(file);
            } else {
                return FileUtils.getFileSize(file);
            }
        } else {
            return "NotFile";
        }
    }


    /**
     * 删除文件和文件夹里面的文件
     *
     * @param path
     */
    public static void deleteFile(final String path) {
        File dir = new File(path);
        FileUtils.deleteDirWithFile(dir);
    }

    /**
     * 删除文件夹内的文件（不删除文件夹）
     *
     * @param path
     */
    public static void deleteFolder(final String path) {
        File[] dir = new File(path).listFiles();
        for (int i = 0; i < dir.length; i++) {
            if (dir[i].isFile()) {
                dir[i].delete(); // 删除所有文件
            } else if (dir[i].isDirectory()) {
                FileUtils.deleteDirWithFile(dir[i]);
            }
        }
    }

    /**
     * 返回bundle文件 没有返回null
     *
     * @return
     */
    public static File getBundleFile(Context context) {
        String indexBundleName = "index.bundle";
        String filePath = getFilePath(context, indexBundleName) + indexBundleName;
        if (filePath.equals("")) return null;
        return new File(filePath);

    }

    /**
     * 获取index.bundle 或version 文件path  不存在返回""
     *
     * @param context
     * @return
     */
    public static String getFilePath(Context context, String fileName) {
        String filePath = getFilesDir(context) + "/bundle/";
        String fileExternalPath = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.FROYO) {
            fileExternalPath = getExternalFilesDir(context) + "/bundle/";
        }
        if (isFolderExists(filePath + fileName)) {
            return filePath;
        } else if (isFolderExists(fileExternalPath + fileName)) {
            return fileExternalPath;
        }
        return "";

    }

    /**
     * 判断bundle版本是否匹配当前app版本
     *
     * @return
     */
    public static boolean matchingVersion(Context context) {
        String versionFileName = "version.json";
        String versionPath = getFilePath(context, versionFileName);
        if (versionPath.equals("")) return false;
        String localVersionCode;
        String versionCode;
        try {
            localVersionCode = String.valueOf(context.getPackageManager().getPackageInfo(context.getPackageName(), 0).versionCode);
            BufferedReader bufferedReader =
                    new BufferedReader(new InputStreamReader(new FileInputStream(new File(versionPath + versionFileName))));
            StringBuilder versionJson = new StringBuilder();
            String readString;
            while ((readString = bufferedReader.readLine()) != null) {
                versionJson.append(readString);
            }
            versionCode = new JSONObject(versionJson.toString()).getString("version").trim();
            bufferedReader.close();
            if (versionCode.equals(localVersionCode)) {
                return true;
            } else {
                NativeTools.deleteFile(versionPath + "bundle");
                NativeTools.deleteFile(versionPath + "bundle.zip");
                return false;
            }
        } catch (Exception e) {
            return false;
        }

    }


    /**
     * 判断手机是否安装某个应用
     *
     * @return true：安装，false：未安装
     */
    public static boolean isInstallApp(String packageName) {
        List<PackageInfo> packages = CuriosityModule.reactApplicationContext.getPackageManager().getInstalledPackages(0);// 获取所有已安装程序的包信息
        if (packages != null) {
            for (int i = 0; i < packages.size(); i++) {
                String pn = packages.get(i).packageName;
                if (packageName.equals(pn)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 跳转至应用商店
     */
    public static void goToMarket(String packageName, String marketPackageName) {
        Uri uri = Uri.parse("market://details?id=" + packageName);
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        if (marketPackageName != null && !marketPackageName.equals("")) {// 如果没给市场的包名，则系统会弹出市场的列表让你进行选择。
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.DONUT) {
                intent.setPackage(marketPackageName);
            }
        }
        try {
            CuriosityModule.reactApplicationContext.startActivity(intent);
        } catch (ActivityNotFoundException e) {
            e.printStackTrace();
        }
    }


    /**
     * 判断应用是否存在的方法
     *
     * @param packageName
     * @return
     */
    public static boolean isAndroidMarket(String packageName) {
        List<PackageInfo> pInfo = CuriosityModule.reactApplicationContext.getPackageManager().getInstalledPackages(0);// 获取所有已安装程序的包信息
        List<String> pName = new ArrayList<String>();// 用于存储所有已安装程序的包名
        // 从pInfo中将包名字逐一取出，压入pName list中
        if (pInfo != null) {
            for (int i = 0; i < pInfo.size(); i++) {
                String pn = pInfo.get(i).packageName;
                pName.add(pn);
            }
        }
        return pName.contains(packageName);// 判断pName中是否有目标程序的包名，有TRUE，没有FALSE
    }

    /**
     * 发送消息至js
     *
     * @param eventName
     * @param params
     */
    public static void sendMessageToJS(String eventName, WritableMap params) {
        CuriosityModule.reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);

    }

    /**
     * 修改状态栏背景颜色和字体颜色
     *
     * @param activity
     * @param fontIconDark
     * @param statusBarColor
     */
    public static void setStatusBarColor(final Activity activity, final Boolean fontIconDark, final String statusBarColor) {
        UiThreadUtil.runOnUiThread(new GuardedRunnable(CuriosityModule.reactApplicationContext) {
            @TargetApi(Build.VERSION_CODES.M)
            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public void runGuarded() {
                Window window = activity.getWindow();
                if (fontIconDark) {
                    window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
                    window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
                } else {
                    window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
                }
                window.setStatusBarColor(Color.parseColor(statusBarColor));
            }
        });
    }

    /**
     * 修改导航栏虚拟按键背景色
     *
     * @param activity
     * @param navigationBarColor
     */
    public static void setNavigationBarColor(final Activity activity, final String navigationBarColor) {
        UiThreadUtil.runOnUiThread(new GuardedRunnable(CuriosityModule.reactApplicationContext) {
            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public void runGuarded() {
                Window window = activity.getWindow();
                window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN//状态栏不会被隐藏但activity布局会扩展到状态栏所在位置
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION//导航栏不会被隐藏但activity布局会扩展到导航栏所在位置
                        | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
                window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
                window.setNavigationBarColor(Color.parseColor(navigationBarColor));
            }
        });
    }


    public static void setSystemUiVisibility(final Activity activity, final int uiFlags) {
        UiThreadUtil.runOnUiThread(new GuardedRunnable(CuriosityModule.reactApplicationContext) {
            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public void runGuarded() {
                activity.getWindow().getDecorView().setSystemUiVisibility(uiFlags);
            }
        });
    }


}
