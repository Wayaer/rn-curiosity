
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <UIKit/UIKit.h>

#if __has_include("AliPaySDK.h")
#import "AliPaySDK.h"
#else
#import <AliPaySDK/AliPaySDK.h>
#endif

@interface RCTAliPay : NSObject <RCTBridgeModule>

@end
