/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//
//#import "AppDelegate.h"
//#import <React/RCTBundleURLProvider.h>
//#import <React/RCTRootView.h>
//自定义热更新导入头部
//#import "RNCuriosity.h"
//
//@implementation AppDelegate

////拷贝以下为注释的代码至自己的对应文件
//- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
//{
// jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
//  if([NativeTools isBundle]&&[NativeTools matchingVersion]){
//    NSLog(@"LogInfo%@", [NativeTools isBundle] ? @"YES" : @"NO");
//    NSLog(@"LogInfo%@", [NativeTools matchingVersion] ? @"YES" : @"NO");
//    NSLog(@"LogInfo%@",);
//  }else{
//    NSLog(@"bundle无或不匹配");
//  }


// 自定义热更新 react-native 0.55>&&<0.59
//
//  NSURL *jsCodeLocation;
//#ifdef DEBUG
//    //jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
//    jsCodeLocation = [NSURL URLWithString:@"http://192.168.3.10:8081/index.bundle?platform=ios&dev=true"];
//
//#else
//    if([NativeTools isBundle]&&[NativeTools matchingVersion]){
//        jsCodeLocation=[NativeTools urlBundle];
//    }else{
//        jsCodeLocation =[[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"/index" fallbackResource:nil];
//    }
//#endif

//   [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryAmbient error:nil];  // allow
//  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
//                                                      moduleName:@"Wayaer"
//                                               initialProperties:nil
//                                                   launchOptions:launchOptions];
//  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
//
//  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//  UIViewController *rootViewController = [UIViewController new];
//  rootViewController.view = rootView;
//  self.window.rootViewController = rootViewController;
//  [self.window makeKeyAndVisible];
////启动屏  [NativeTools showSplashScreen];
//  return YES;
//}


// 自定义热更新 react-native >0.59
//- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
//{
//#if DEBUG
//    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
//#else
//    if([RNCuriosity isBundle]&&[RNCuriosity matchingVersion]){
//
//        return [RNCuriosity urlBundle];
//    }else{
//        return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
//    }
//#endif
//}



//@end
