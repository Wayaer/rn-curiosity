'use strict';
import {Platform, StatusBar, Dimensions} from 'react-native'

export const {height, width, scale} = Dimensions.get('window');
export const FontSize = { //默认大小 14
    textSize_7: 7,
    textSize_8: 8,
    textSize_9: 9,
    textSize_10: 10,
    textSize_11: 11,
    textSize_12: 12,
    textSize_13: 13,
    textSize_14: 14,
    textSize_15: 15,
    textSize_16: 16,
    textSize_17: 17,
    textSize_18: 18,
    textSize_19: 19,
    textSize_20: 20,
    textSize_21: 21,
    textSize_22: 22,
    textSize_23: 23,
    textSize_24: 24,
    textSize_25: 25,
    textSize_26: 26,
    textSize_27: 27,
    textSize_28: 28,
    textSize_29: 29,
    textSize_30: 30,
    textSize_31: 31,
    textSize_32: 32,
    textSize_33: 33,
    textSize_34: 34,
    textSize_35: 35,
    textSize_36: 36,
    textSize_37: 37,
    textSize_38: 38,
    textSize_39: 39,
    textSize_40: 40,
    textSize_41: 41,
    textSize_42: 42,
    textSize_43: 43,
    textSize_44: 44,
    textSize_45: 45,
    textSize_46: 46,
    textSize_47: 47,
    textSize_48: 48,
    textSize_49: 49,
    textSize_50: 50,
    textSize_55: 55,
    textSize_60: 60,
    textSize_65: 65,
};
export const Colors = {
    mainBlue: '#3889FF',
    mainWhite: '#ffffff',
    mainBlack: '#000000',
    mainStartBlue: '#279EF4',
    mainEndBlue: '#35CCF9',
    transparent: '#00000000',
    background: '#f7f7f7',
    white30: '#ffffff30',
    black30: '#00000030',
    black10: '#00000010',
};

export class Fit {
    /*
     * 全面屏适配
     * */
    static phoneFit() {
        const y = scale * height
        if (Platform.OS === 'android') {
            if (y < 1300) { //720p以下手机
                return false
            } else if (y > 1300 && y < 1650) {//720p 18:9
                return true
            } else if (y > 1700 && y < 1930) {//1080p 16:9
                return false
            } else if (y > 1930 && y < 2400) {//1080p 18:9 19.5:9
                return true
            } else if (y > 2400 && y < 2560) {//2k 16:9
                return false
            } else if (y > 2560 && y < 3300) {//2k 18:9  19.5:9
                return true
            } else {
                return false
            }
        } else if (Platform.OS === 'ios') {
            if (y < 1400) {//4.7寸 16:9
                return false
            } else if (y > 1400 && y < 1850) {//iphone xr 18:9
                return true
            } else if (y > 1850 && y < 2300) {//iphone plus 16:9
                return false
            } else if (y > 2300) {//iphone x  18:9
                return true
            }
        }
    }

}


export const Constant = {
    // 系统是iOS
    IOS: (Platform.OS === 'ios'),
    // 系统是安卓
    Android: (Platform.OS === 'android'),
    // 实际屏幕高度
    ActualScreen_Height: height,
    // 获取屏幕宽度
    Screen_Width: width,
    // 获取屏幕分辨率
    Screen_Scale: scale,
    //状态栏高度
    CurrentHeight: Platform.OS === 'ios' ? (Fit.phoneFit() ? 40 : 20) : StatusBar.currentHeight,

    ShadowStyle: {
        shadowColor: '#000',//ios阴影颜色
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 6,//
        shadowOpacity: 0.2,//ios阴影透明的
        elevation: 6,//android阴影范围
    }
}


