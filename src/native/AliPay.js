import {NativeModules} from 'react-native';
import {NativeUtils} from "../NativeUtils";

const pay = NativeModules.AliPay;

export class AliPay {

    /**
     * promise
     * @param authWithInfo
     * @param successCallback
     * @param errorCallback
     */
    static aliPayAuthWithInfo(authWithInfo, successCallback, errorCallback) {
        if (typeof (authWithInfo) != 'string') return NativeUtils.logError('authWithInfo must is string')
        pay.aliPayAuthWithInfo(authWithInfo).then((value) => {
            return successCallback(value);
        }).catch((error) => {
            return errorCallback(error);
        });
    }

    /**
     * promise
     * @param isSandbox
     * @param successCallback
     * @param errorCallback
     */
    static setAliPaySandbox(isSandbox, successCallback, errorCallback) {
        if (typeof (isSandbox) != 'boolean') return NativeUtils.logError('isSandbox must is boolean')
        pay.setAliPaySandbox(isSandbox).then((value) => {
            return successCallback(value);
        }).catch((error) => {
            return errorCallback(error);
        });
    }

    /**
     * promise
     * @param orderInfo
     * @param successCallback
     * @param errorCallback
     */
    static aliPay(orderInfo, successCallback, errorCallback) {
        if (typeof (orderInfo) != 'string') return NativeUtils.logError('orderInfo must is string')
        pay.aliPay(orderInfo).then((value) => {
            return successCallback(value);
        }).catch((error) => {
            return errorCallback(error);
        });
    }

    /**
     * promise
     * @param h5PayUrl
     * @param successCallback
     * @param errorCallback
     */
    static aliPayInterceptorWithUrl(h5PayUrl, successCallback, errorCallback) {
        if (typeof (h5PayUrl) != 'string') return NativeUtils.logError('h5PayUrl must is string')
        pay.aliPayInterceptorWithUrl(h5PayUrl).then((value) => {
            return successCallback(value);
        }).catch((error) => {
            return errorCallback(error);
        });
    }

    /**
     * promise
     * @returns {*}
     */

    static getAliPaySDKVersion(successCallback, errorCallback) {
        pay.getAliPaySDKVersion().then((value) => {
            return successCallback(value);
        }).catch((error) => {
            return errorCallback(error);
        });
    }

}
