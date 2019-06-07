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

//获取app信息
+ (NSMutableDictionary *)getAppInfo;

//显示启动屏
+ (void)showSplashScreen;
//隐藏启动屏
+ (void)hideSplashScreen;

+ (NSString *)getLibraryDirectory;

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

@end
