#import "RNCuriosity.h"
#import <AudioToolbox/AudioToolbox.h>

@implementation RNCuriosity

RCT_EXPORT_MODULE(RNCuriosity)

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

//Log
+ (void)logInfo:(id)info{
    [NativeTools logInfo:info];
}
//显示隐藏启动屏
+ (void)showSplashScreen {
    [NativeTools showSplashScreen];
}

//判断是否有index.bundle文件
+ (BOOL)isBundle {
    return [NativeTools isBundle];
}

//判断version是否匹配当前版本
+ (BOOL) matchingVersion {
    return [NativeTools matchingVersion];
}

//index.bundle文件路径
+ (NSURL *)urlBundle {
    return [NativeTools urlBundle];
}
//native 发送消息给 js
-(NSArray<NSString *> *)supportedEvents{
    return nil;
}

- (void)sendMessageToJS:(NSString *)eventName body:(id)body{
    [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter"
                        method:@"emit"
                          args:body ? @[eventName, body] : @[eventName]
                    completion:NULL];
}
- (NSDictionary *)constantsToExport
{
    return @{@"constants":[NativeTools getAppInfo]};
}


// promise例子
RCT_REMAP_METHOD(promiseCallback, options:(NSString *)options resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter){
    if(options){
        resolver(@[@"第一个参数",@"第二个参数"]);
    } else {
        rejecter(@"0",@"取消操作",nil);
    }
}
//从native发消息到JS
RCT_EXPORT_METHOD(sendMessageNativeToJS:(NSString *)eventName props:(NSDictionary *)props) {
    [self sendMessageToJS:eventName body:props];
}
//设置cookie
RCT_EXPORT_METHOD(setCookie:(NSDictionary *)props) {
    [NativeTools setCookie:props];
}
//清楚cookie
RCT_EXPORT_METHOD(clearAllCookie) {
    [NativeTools clearAllCookie];
}
//获取cookie
RCT_EXPORT_METHOD(getAllCookie:(RCTResponseSenderBlock)callback) {
    callback(@[[NativeTools getAllCookie]]);
}

//获取app信息
RCT_EXPORT_METHOD(getAppInfo:(RCTResponseSenderBlock)callback) {
    callback(@[[NativeTools getAppInfo]]);
}

//解压文件
RCT_EXPORT_METHOD(unZipFile:(NSString *)filePath callback:(RCTResponseSenderBlock)callback) {
    callback(@[[NativeTools unZipFile:filePath]]);
}
//获取目录文件或文件夹大小
RCT_EXPORT_METHOD(getFilePathSize:(NSString *)filePath callback:(RCTResponseSenderBlock)callback) {
    callback(@[[NativeTools getFilePathSize:filePath]]);
}

// 删除沙盒指定文件夹或文件 （删除文件夹）
RCT_EXPORT_METHOD(deleteFile:(NSString *)props) {
    [NativeTools deleteFile:props];
}
// 删除沙盒指定文件夹内容 （不删除文件夹）
RCT_EXPORT_METHOD(deleteFolder:(NSString *)props) {
    [NativeTools deleteFolder:props];
}
// 沙盒是否有指定文件夹
RCT_EXPORT_METHOD(isFolderExists:(NSString *)props callback:(RCTResponseSenderBlock)callback) {
    [NativeTools isFolderExists:props]?callback(@[@"true"]):callback(@[@"false"]);
}
//显示隐藏启动屏
RCT_EXPORT_METHOD(showSplashScreen) {
    [NativeTools showSplashScreen];
}
//隐藏启动屏
RCT_EXPORT_METHOD(hideSplashScreen) {
    [NativeTools hideSplashScreen];
}
//退出app
RCT_EXPORT_METHOD(exitApp) {
    exit(0);
}
//调用振动
RCT_EXPORT_METHOD(singleVibration:(NSString *)time) {
   
    //短震  3D Touch中的peek震动反馈
    AudioServicesPlaySystemSound(1519);
    //短震  3D Touch中的pop震动反馈
    //AudioServicesPlaySystemSound(1520);
    //连续三次短震动
    // AudioServicesPlaySystemSound(1521);
    
//    typedef NS_ENUM(NSInteger, UIImpactFeedbackStyle) {
//    UIImpactFeedbackStyleLight,
//    UIImpactFeedbackStyleMedium,
//    UIImpactFeedbackStyleHeavy
//    };
//    UIImpactFeedbackGenerator *generator = [[UIImpactFeedbackGenerator alloc] initWithStyle: UIImpactFeedbackStyleLight];
//    [generator prepare];
//    [generator impactOccurred];
}
//设置状态栏背景色和字体颜色
RCT_EXPORT_METHOD(setStatusBarColor:(BOOL *)fontIconDark :(NSString *)statusBarColor) {
    UIView *statusBar = [[[UIApplication sharedApplication] valueForKey:@"statusBarWindow"] valueForKey:@"statusBar"];
    if ([statusBar respondsToSelector:@selector(setBackgroundColor:)]) {
        statusBar.backgroundColor = [NativeTools colorWithHexString:statusBarColor];
    }
    if(fontIconDark){
        [UIApplication sharedApplication].statusBarStyle =  UIStatusBarStyleDefault;
    }else{
        [UIApplication sharedApplication].statusBarStyle =  UIStatusBarStyleLightContent;
    }
}

//跳转到AppStore
RCT_EXPORT_METHOD(goToMarket:(NSString *)idStr) {
    NSString* url=@"itms-apps://itunes.apple.com/us/app/id";
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:[url stringByAppendingString:idStr]]];
    
}
@end
