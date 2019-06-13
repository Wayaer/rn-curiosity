#import "NativeTools.h"
#import "SSZipArchive.h"

#define fileManager [NSFileManager defaultManager]
#define cachePath [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) lastObject]

static bool waiting = true;
static bool addedJsLoadErrorObserver = false;

@implementation NativeTools

- (dispatch_queue_t)methodQueue{
    return dispatch_get_main_queue();
}

//Log
+ (void)logInfo:(id)info{
    NSLog(@"LogInfo==> %@", info);
}
//cookie的设置 清除 获取
+ (void)setCookie:(NSDictionary *)props
{
    NSString *name = [RCTConvert NSString:props[@"name"]];
    NSString *value = [RCTConvert NSString:props[@"value"]];
    NSString *domain = [RCTConvert NSString:props[@"domain"]];
    NSString *origin = [RCTConvert NSString:props[@"origin"]];
    NSString *path = [RCTConvert NSString:props[@"path"]];
    NSDate *expiration = [RCTConvert NSDate:props[@"expiration"]];
    
    NSMutableDictionary *cookieProperties = [NSMutableDictionary dictionary];
    [cookieProperties setObject:name forKey:NSHTTPCookieName];
    [cookieProperties setObject:value forKey:NSHTTPCookieValue];
    [cookieProperties setObject:domain forKey:NSHTTPCookieDomain];
    [cookieProperties setObject:origin forKey:NSHTTPCookieOriginURL];
    [cookieProperties setObject:path forKey:NSHTTPCookiePath];
    [cookieProperties setObject:expiration forKey:NSHTTPCookieExpires];
    
    NSHTTPCookie *cookie = [NSHTTPCookie cookieWithProperties:cookieProperties];
    [[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookie:cookie];
    
}
+ (void)clearAllCookie
{
    NSHTTPCookieStorage *cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    for (NSHTTPCookie *c in cookieStorage.cookies) {
        [cookieStorage deleteCookie:c];
    }
}
+ (NSMutableDictionary *)getAllCookie
{
    NSHTTPCookieStorage *cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    NSMutableDictionary *cookies = [NSMutableDictionary dictionary];
    for (NSHTTPCookie *c in cookieStorage.cookies) {
        NSMutableDictionary *d = [NSMutableDictionary dictionary];
        [d setObject:c.value forKey:@"value"];
        [d setObject:c.name forKey:@"name"];
        [d setObject:c.domain forKey:@"domain"];
        [d setObject:c.path forKey:@"path"];
        [cookies setObject:d forKey:c.name];
    }
    return cookies;
    
}

//获取app信息
+ (NSMutableDictionary *)getAppInfo;
{
    NSMutableDictionary *info = [NSMutableDictionary dictionary];
    NSDictionary *app = [[NSBundle mainBundle] infoDictionary];
    CGRect rectStatus = [[UIApplication sharedApplication] statusBarFrame];
    [info setObject:@(rectStatus.size.height) forKey:@"StatusBarHeight"];
    [info setObject:@(rectStatus.size.width) forKey:@"StatusBarWidth"];
    
    [info setObject:NSHomeDirectory() forKey:@"HomeDirectory"];
    [info setObject:[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject] forKey:@"DocumentDirectory"];
    [info setObject:[NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES) lastObject] forKey:@"LibraryDirectory"];
    [info setObject:[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) firstObject] forKey:@"CachesDirectory"];
    [info setObject:NSTemporaryDirectory() forKey:@"TemporaryDirectory"];
    
    [info setObject:[app objectForKey:@"CFBundleShortVersionString"] forKey:@"versionName"];
    [info setObject:@"Apple" forKey:@"phoneBrand"];
    [info setObject:[NSNumber numberWithInt:[[app objectForKey:@"CFBundleVersion"] intValue]] forKey:@"versionCode"];
    
    [info setObject:[app objectForKey:@"CFBundleIdentifier"] forKey:@"packageName"];
    [info setObject:[app objectForKey:@"CFBundleName"] forKey:@"AppName"];
    [info setObject:[app objectForKey:@"DTSDKBuild"] forKey:@"SDKBuild"];
    [info setObject:[app objectForKey:@"DTPlatformName"] forKey:@"PlatformName"];
    [info setObject:[app objectForKey:@"MinimumOSVersion"] forKey:@"MinimumOSVersion"];
    [info setObject:[app objectForKey:@"DTPlatformVersion"] forKey:@"PlatformVersion"];
    UIDevice *device = [UIDevice currentDevice];
    [info setObject:device.systemName forKey:@"systemName"];
    [info setObject:device.systemVersion forKey:@"systemVersion"];
    
    return  info;
}

//显示启动屏
+ (void)showSplashScreen {
    if (!addedJsLoadErrorObserver) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(jsLoadError:) name:RCTJavaScriptDidFailToLoadNotification object:nil];
        addedJsLoadErrorObserver = true;
    }
    
    while (waiting) {
        NSDate* later = [NSDate dateWithTimeIntervalSinceNow:1];
        [[NSRunLoop mainRunLoop] runUntilDate:later];
    }
}
//隐藏启动屏
+ (void)hideSplashScreen {
    dispatch_async(dispatch_get_main_queue(),
                   ^{
                       waiting = false;
                   });
}

// 获取Library的目录路径
+ (NSString *)getLibraryDirectory {
    return [NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES) lastObject];;
}


// 删除沙盒指定文件或文件夹
+ (void)deleteFile:(NSString *)path{
    if ([self isFolderExists:path]) {
        if(![fileManager removeItemAtPath:path error:nil]){
            [fileManager removeItemAtPath:path error:nil];
        }
    }
}
// 删除沙盒指定文件夹内容
+ (void)deleteFolder:(NSString *)path{
    if ([self isFolderExists:path]) {
        if ([fileManager fileExistsAtPath:path]) {
            // 获取该路径下面的文件名
            NSArray *childrenFiles = [fileManager subpathsAtPath:path];
            for (NSString *fileName in childrenFiles) {
                // 拼接路径
                NSString *absolutePath = [path stringByAppendingPathComponent:fileName];
                // 将文件删除
                [fileManager removeItemAtPath:absolutePath error:nil];
            }
        }
    }
}
// 沙盒是否有指定路径文件夹或文件
+(BOOL)isFolderExists:(NSString *)path {
    if ([fileManager fileExistsAtPath:path]) {
        return YES;
    }else{
        return NO;
    }
}
//解压文件
+ (NSString *)unZipFile:(NSString *)filePath {
    if ([self isFolderExists:filePath]) {
        [SSZipArchive unzipFileAtPath:filePath toDestination:[filePath substringToIndex:filePath.length-[[[filePath componentsSeparatedByString:@"/"] lastObject] length]]];
        return @"Success";
    }else{
        return @"NotFile";
    }
}

// 判断是否有index.bundle文件
// 固定路径 /var/mobile/Containers/Data/Application/{570EAD8E-C3F9-4A8D-9A17-ACD3355AC501}/Library/bundle/index.bundle
+ (BOOL)isBundle {
    if ([self isFolderExists:[[self getLibraryDirectory] stringByAppendingString:@"/bundle/index.bundle"]]) {
        return YES;
    }else {
        return NO;
    }
}

// 判断version是否匹配当前版本
// 固定路径 /var/mobile/Containers/Data/Application/{570EAD8E-C3F9-4A8D-9A17-ACD3355AC501}/Library/bundle/version.json
+ (BOOL) matchingVersion {
    NSString *versionPath=[[self getLibraryDirectory] stringByAppendingString:@"/bundle/version.json"];
    if ([self isFolderExists:versionPath]) {
        NSData *data = [[NSData alloc] initWithContentsOfFile:versionPath];
        // 对数据进行JSON格式化并返回字典形式
        NSDictionary *version= [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:nil];
        if (version[@"version"]== [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleVersion"]) {
            return YES;
        }else{
            //本地bundle与app版本不符合 删除本地bundle文件夹
            [self deleteFile:[[self getLibraryDirectory] stringByAppendingString:@"/bundle"]];
            [self deleteFile:[[self getLibraryDirectory] stringByAppendingString:@"/bundle.zip"]];
            return NO;
        }
    }else {
        return NO;
    }
    
}

//index.bundle文件路径
// 固定路径 /var/mobile/Containers/Data/Application/{570EAD8E-C3F9-4A8D-9A17-ACD3355AC501}/Library/bundle/index.bundle

+ (NSURL *)urlBundle {
    NSString *bundle = [[self getLibraryDirectory] stringByAppendingString:@"/bundle/index.bundle"];
    return [NSURL  fileURLWithPath:bundle];
}

//获取目录文件或文件夹大小
+ (NSString *)getFilePathSize:(NSString *)path{
    // 获取“path”文件夹下的所有文件
    NSArray *subPathArr = [[NSFileManager defaultManager] subpathsAtPath:path];
    NSString *filePath  = nil;
    NSInteger totleSize = 0;
    for (NSString *subPath in subPathArr){
        // 1. 拼接每一个文件的全路径
        filePath =[path stringByAppendingPathComponent:subPath];
        // 2. 是否是文件夹，默认不是
        BOOL isDirectory = NO;
        // 3. 判断文件是否存在
        BOOL isExist = [[NSFileManager defaultManager] fileExistsAtPath:filePath isDirectory:&isDirectory];
        
        // 4. 以上判断目的是忽略不需要计算的文件
        if (!isExist || isDirectory || [filePath containsString:@".DS"]){
            // 过滤: 1. 文件夹不存在  2. 过滤文件夹  3. 隐藏文件
            continue;
        }
        // 5. 指定路径，获取这个路径的属性
        NSDictionary *dict = [[NSFileManager defaultManager] attributesOfItemAtPath:filePath error:nil];
        /**
         attributesOfItemAtPath: 文件夹路径
         该方法只能获取文件的属性, 无法获取文件夹属性, 所以也是需要遍历文件夹的每一个文件的原因
         */
        // 6. 获取每一个文件的大小
        NSInteger size = [dict[@"NSFileSize"] integerValue];
        // 7. 计算总大小
        totleSize += size;
    }
    //8. 将文件夹大小转换为 M/KB/B
    NSString *totleStr = nil;
    if (totleSize > 1000 * 1000){
        totleStr = [NSString stringWithFormat:@"%.2fMB",totleSize / 1000.00f /1000.00f];
        
    }else if (totleSize > 1000){
        totleStr = [NSString stringWithFormat:@"%.2fKB",totleSize / 1000.00f ];
        
    }else{
        totleStr = [NSString stringWithFormat:@"%.2fB",totleSize / 1.00f];
    }
    return totleStr;
}

/**
 16进制颜色转换为UIColor
 @param hexColor 16进制字符串（可以以0x开头，可以以#开头，也可以就是6位的16进制）
 @param opacity 透明度
 @return 16进制字符串对应的颜色
 */

+(UIColor *)colorWithHexString:(NSString *)hexColor{
    NSString * cString = [[hexColor stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]] uppercaseString];
    
    // String should be 6 or 8 characters
    if ([cString length] < 6) return [UIColor blackColor];
    
    // strip 0X if it appears
    if ([cString hasPrefix:@"0X"]) cString = [cString substringFromIndex:2];
    if ([cString hasPrefix:@"#"]) cString = [cString substringFromIndex:1];
    if ([cString length] != 6&[cString length] != 8) return [UIColor blackColor];
    
    // Separate into r, g, b substrings
    NSRange range;
    range.location = 0;
    range.length = 2;
    NSString * rString = [cString substringWithRange:range];
    
    range.location = 2;
    NSString * gString = [cString substringWithRange:range];
    
    range.location = 4;
    NSString * bString = [cString substringWithRange:range];
    
    NSString * aString=@"10";
    if ([cString length]==8) {
        range.location = 6;
        aString = [cString substringWithRange:range];
    }
    // Scan values
    unsigned int r, g, b, a;
    [[NSScanner scannerWithString:rString] scanHexInt:&r];
    [[NSScanner scannerWithString:gString] scanHexInt:&g];
    [[NSScanner scannerWithString:bString] scanHexInt:&b];
    a=[aString intValue];
    return [UIColor colorWithRed:((float)r / 255.0f)
                           green:((float)g / 255.0f)
                            blue:((float)b / 255.0f)
                           alpha:(((float)a/10)/ 1.0f)];
}

@end
