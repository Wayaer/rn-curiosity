#import <Foundation/Foundation.h>
#import <React/RCTBridge.h>
#import <React/RCTConvert.h>

@interface NativeTools : NSObject
//Log
+ (void)logInfo:(id)props;
//获取Cookie
+ (void)setCookie:(NSDictionary *)props;
+ (void)clearAllCookie;
+ (NSMutableDictionary *)getAllCookie;

//获取名字
+ (NSString *)getVersionName;
//获取版本号
+ (NSString *)getVersionCode;

//显示启动屏
+ (void)showSplashScreen;
//隐藏启动屏
+ (void)hideSplashScreen;

// 获取沙盒主目录路径
+ (NSString *)getHomeDirectory;
// 获取Documents目录路径
+ (NSString *)getDocuments;
// 获取Library的目录路径
+ (NSString *)getLibraryDirectory;
// 获取Caches目录路径
+ (NSString *)getCachesDirectory;
// 获取tmp目录路径
+ (NSString *)getTemporaryDirectory;

// 删除沙盒指定文件夹和文件（删除文件夹）
+ (void)deleteFile:(NSString *)props;

// 删除沙盒指定文件夹内容（不删除文件夹）
+ (void)deleteFolder:(NSString *)props;

// 沙盒是否有指定文件夹
+ (BOOL)isFolderExists:(NSString *)props;

// 解压文件
+ (NSString *)unZipFile:(NSString *)props;

//获取文件或文件夹大小
+ (NSString *)getFilePathSize:(NSString *)props;

//是否有bundle文件
+ (BOOL)isBundle;
//判断bundle version 和版本是否匹配
+ (BOOL)matchingVersion;

//bundle文件路径
+ (NSURL *)urlBundle;

//跳转到应用商店
+ (void)goToAppStore;
@end
