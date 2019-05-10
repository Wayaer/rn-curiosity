package com.curiosity;

import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.support.v4.content.FileProvider;
import android.text.TextUtils;
import android.util.Log;
import android.webkit.CookieManager;
import android.webkit.ValueCallback;


import com.curiosity.utils.FileUtils;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;


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

import javax.annotation.Nullable;

/**
 * Created by dev on 2017/9/15.
 */

public class NativeTools {
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

    /*
     * 退出app
     * restartApplication
     * */
    public static void exitApp() {
        //杀死进程，否则就算退出App，App处于空进程并未销毁，再次打开也不会初始化Application
        //从而也不会执行getJSBundleFile去更换bundle的加载路径 !!!
        android.os.Process.killProcess(android.os.Process.myPid());
        System.exit(0);
    }

    /*
     * 获取cookie
     * */
    public static String getAllCookie(String url) {
        return CookieManager.getInstance().getCookie(url);
    }

    /*
     * 清除cookie
     * */
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

    /*
     * 获取VersionCode
     * */
    public static int getAppVersionCode(Context context) {
        int appVersionCode = 0;
        PackageManager manager = context.getPackageManager();
        try {
            PackageInfo info = manager.getPackageInfo(context.getPackageName(), 0);
            appVersionCode = info.versionCode; // 版本号
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        return appVersionCode;
    }

    /*
     * 获取VersionName
     * */
    public static String getAppVersionName(Context context) {
        String appVersionName = null;
        PackageManager manager = context.getPackageManager();
        try {
            PackageInfo info = manager.getPackageInfo(context.getPackageName(), 0);
            appVersionName = info.versionName; // 版本名
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        return appVersionName;
    }

    /*
     * 安装apk
     * */
    public static void installApp(Context context, String apkFile) {
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

    /*
     * 获取android 外部 Files文件
     * getExternalFilesDir
     * */
    public static String getExternalFilesDir(Context context) {
        if (Environment.MEDIA_MOUNTED.equals(Environment.getExternalStorageState()) || !Environment.isExternalStorageRemovable()) {
            return context.getExternalFilesDir(null).getPath();
        } else {
            return NativeTools.getFilesDir(context);
        }
    }

    /*
     * 获取android 外部 Cache文件
     * getExternalCacheDir
     * */
    public static String getExternalCacheDir(Context context) {
        if (Environment.MEDIA_MOUNTED.equals(Environment.getExternalStorageState()) || !Environment.isExternalStorageRemovable()) {
            return context.getExternalCacheDir().getPath();
        } else {
            return NativeTools.getCacheDir(context);
        }
    }

    /*
     * 获取android 内部 Cache文件
     * getCacheDir
     * */
    public static String getCacheDir(Context context) {
        return context.getCacheDir().getPath();
    }

    /*
     * 获取android 内部 Files文件
     * getFilesDir
     * */
    public static String getFilesDir(Context context) {
        return context.getFilesDir().getPath();
    }

    /*
     * 解压文件
     * */
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


    /*
     *
     *判断是否存在bundle文件
     * */
    public static boolean isBundle(Context context) {
        String filePath = getFilesDir(context) + "/bundle/index.bundle";
        File file = new File(filePath);
        if (file.exists()) return true;
        return false;
    }

    /*
     *判断bundle版本是否匹配当前app版本
     * */
    public static boolean matchingVersion(Context context) {
        String versionPath = NativeTools.getFilesDir(context) + "/bundle/version.json";
        if (isFolderExists(versionPath)) {
            int versionCode = 0;
            File file = new File(versionPath);
            try {
                BufferedReader v = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
                versionCode = Integer.parseInt(new JSONObject(v.readLine()).getString("version"));
                v.close();
                if (versionCode == NativeTools.getAppVersionCode(context)) {
                    return true;
                } else {
                    NativeTools.deleteFile(NativeTools.getFilesDir(context) + "/bundle");
                    NativeTools.deleteFile(NativeTools.getFilesDir(context) + "/bundle.zip");
                    return false;
                }
            } catch (Exception e) {
                return false;
            }
        } else {
            return false;
        }
    }


    /**
     * 判断手机是否安装某个应用
     *
     * @param context
     * @return true：安装，false：未安装
     */
    public static boolean isInstallApp(Context context, String packageName) {
        PackageManager packageManager = context.getPackageManager();// 获取packagemanager
        List<PackageInfo> packages = packageManager.getInstalledPackages(0);// 获取所有已安装程序的包信息
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
     * 启动到app详情界面
     *
     * @param appPkg    App的包名
     * @param marketPkg 应用商店包名 ,如果为""则由系统弹出应用商店列表供用户选择,否则调转到目标市场的应用详情界面，某些应用商店可能会失败
     */
    public static void launchAppDetail(Context context, String appPkg, String marketPkg) {
        try {
            if (TextUtils.isEmpty(appPkg))
                return;
            Uri uri = Uri.parse("market://details?id=" + appPkg);
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);
            if (!TextUtils.isEmpty(marketPkg))
                intent.setPackage(marketPkg);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /*
     * 跳转到应用宝
     * */
    public static void goToMarket(Context context) {
        Uri uri = Uri.parse("market://details?id=" + context.getPackageName());
        Intent goToMarket = new Intent(Intent.ACTION_VIEW, uri);
        try {
            goToMarket.setClassName("com.tencent.android.qqdownloader", "com.tencent.pangu.link.LinkProxyActivity");
            context.startActivity(goToMarket);
        } catch (ActivityNotFoundException e) {
            e.printStackTrace();
        }
    }

    // 判断市场是否存在的方法
    public static boolean isAppStore(Context context, String packageName) {
        final PackageManager packageManager = context.getPackageManager();// 获取packageManager
        List<PackageInfo> pInfo = packageManager.getInstalledPackages(0);// 获取所有已安装程序的包信息
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


    public static void sendMessageToJS(ReactContext reactContext, String eventName, @Nullable String params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);

    }

}
