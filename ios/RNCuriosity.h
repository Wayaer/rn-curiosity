
#import "NativeTools.h"
#import <React/RCTBridge.h>
#import <React/RCTEventEmitter.h>


@interface RNCuriosity : RCTEventEmitter<RCTBridgeModule>
//Log
+ (void)logInfo:(id)props;
//显示隐藏启动屏
+ (void)showSplashScreen;
//是否有bundle文件
+ (BOOL)isBundle;
//判断bundle version 和版本是否匹配
+ (BOOL)matchingVersion;
//bundle文件路径
+ (NSURL *)urlBundle;
//native 发送消息给 js
+ (void)sendMessageToJS:(NSString *)name body:(id)body;


@end

