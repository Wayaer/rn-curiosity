#import "LinearGradientManager.h"
#import "LinearGradient.h"
#import <React/RCTBridge.h>

@implementation LinearGradientManager

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

- (UIView *)view
{
  return [[LinearGradient alloc] init];
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_VIEW_PROPERTY(colors, NSArray);
RCT_EXPORT_VIEW_PROPERTY(startPoint, CGPoint);
RCT_EXPORT_VIEW_PROPERTY(endPoint, CGPoint);
RCT_EXPORT_VIEW_PROPERTY(locations, NSArray);
RCT_EXPORT_VIEW_PROPERTY(useAngle, BOOL);
RCT_EXPORT_VIEW_PROPERTY(angleCenter, CGPoint);
RCT_EXPORT_VIEW_PROPERTY(angle, CGFloat);

@end
