
#import "RCTAliPay.h"

static NSString *const kOpenURLNotification = @"RCTOpenURLNotification";

@interface RCTAliPay ()

@property (nonatomic, copy) RCTPromiseResolveBlock payOrderResolve;

@end

@implementation RCTAliPay

- (instancetype)init {
    if (self = [super init]) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleOpenURL:) name:kOpenURLNotification object:nil];
    }
    return self;
}

- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (void)handleOpenURL:(NSNotification *)notification {
    NSString *urlString = notification.userInfo[@"url"];
    NSURL *url = [NSURL URLWithString:urlString];
    if ([url.host isEqualToString:@"safepay"]) {
        __weak __typeof__(self) weakSelf = self;
        [AliPaySDK.defaultService processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
            NSLog(@"processOrderWithPaymentResult = %@", resultDic);
            if (weakSelf.payOrderResolve) {
                weakSelf.payOrderResolve(resultDic);
                weakSelf.payOrderResolve = nil;
            }
        }];

        [AliPaySDK.defaultService processAuth_V2Result:url standbyCallback:^(NSDictionary *resultDic) {
            NSLog(@"processAuth_V2Result = %@", resultDic);
        }];
    }
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(aliPayAuthWithInfo:(NSString *)infoStr
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [AliPaySDK.defaultService auth_V2WithInfo:infoStr fromScheme:self.appScheme callback:^(NSDictionary *resultDic) {
        resolve(resultDic);
    }];
}

RCT_EXPORT_METHOD(aliPay:(NSString *)orderInfo
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    self.payOrderResolve = resolve;
    [AliPaySDK.defaultService payOrder:orderInfo fromScheme:self.appScheme callback:^(NSDictionary *resultDic) {
        resolve(resultDic);
    }];
}

RCT_EXPORT_METHOD(aliPayInterceptorWithUrl:(NSString *)urlStr
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [AliPaySDK.defaultService payInterceptorWithUrl:urlStr fromScheme:self.appScheme callback:^(NSDictionary *resultDic) {
        resolve(resultDic);
    }];
}

RCT_EXPORT_METHOD(getAliPaySDKVersion:(RCTPromiseResolveBlock)resolve) {
    resolve(AliPaySDK.defaultService.currentVersion);
}

- (NSString *)appScheme {
    NSArray *urlTypes = NSBundle.mainBundle.infoDictionary[@"CFBundleURLTypes"];
    for (NSDictionary *urlType in urlTypes) {
        NSString *urlName = urlType[@"CFBundleURLName"];
        if ([urlName hasPrefix:@"alipay"]) {
            NSArray *schemes = urlType[@"CFBundleURLSchemes"];
            return schemes.firstObject;
        }
    }
    return nil;
}

@end
