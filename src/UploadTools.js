/**
 * 校验类型是否为number
 * @param num
 * @returns {boolean}
 */
import {NativeConstant} from "./NativeConstant";

class UploadTools {
    static checkNumber(num) {
        return typeof num === 'number';
    }

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
            const localVersionCode = NativeConstant.VersionCode;
            if (NativeConstant.Android) {
                if ((netVersion.androidVersion) === localVersionCode && (netVersion.androidBundleVersion) > localAndroidBundleVersion) {
                    this.downloadBundleZipWithUnZip(OSSUrl + 'android/bundle/' + (netVersion.androidBundleVersion) + '/bundle.zip', (percent) => {
                    }, () => {
                        bundleUnZip && bundleUnZip();
                    });
                } else if ((netVersion.iosVersion) === localVersionCode && (netVersion.iosBundleVersion) < localAndroidBundleVersion) {
                    this.deleteBundle();
                }
            } else if (NativeConstant.IOS) {
                if ((netVersion.iosVersion) === localVersionCode && (netVersion.iosBundleVersion) > localIosBundleVersion) {
                    this.downloadBundleZipWithUnZip(OSSUrl + 'android/bundle/' + (netVersion.androidBundleVersion) + '/bundle.zip', (percent) => {
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
}
