'use strict';
import RNFetchBlob from 'rn-fetch-blob';

const Header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

export class FetchBlob {
    /**
     * GET 请求
     * @param url
     * @param successCallBack
     * @param errorCallBack
     * @param header
     * @constructor
     */
    static GET(url, successCallBack, errorCallBack, header) {
        console.log('GET Url=>' + url);
        RNFetchBlob.fetch('GET', url, header || Header)
            .then((success) => {
                return successCallBack(success);
            }).catch((error) => {
            return errorCallBack(error);
        });
    }


    /**
     * DElETE 请求
     * @param url
     * @param successCallBack
     * @param errorCallBack
     * @param header
     * @constructor
     */
    static DElETE(url, successCallBack, errorCallBack, header) {
        console.log('DElETE Url=>' + url);
        RNFetchBlob.fetch('DElETE', url, header || Header)
            .then((success) => {
                return successCallBack(success);
            }).catch((error) => {
            return errorCallBack(error);
        });
    }

    /**
     * POST 请求
     * @param url
     * @param params  参数   json
     * @param successCallBack
     * @param errorCallBack
     * @param header
     * @constructor
     */
    static POST(url, params, successCallBack, errorCallBack, header) {
        this.fetchBlob(url, params, 'POST', (success) => {
            return successCallBack(success);
        }, (error) => {
            return errorCallBack(error);
        }, header);
    }

    /**
     * PUT 请求
     * @param url
     * @param params 参数   json
     * @param successCallBack
     * @param errorCallBack
     * @param header
     * @constructor
     */
    static PUT(url, params, successCallBack, errorCallBack, header) {
        this.fetchBlob(url, params, 'PUT', (success) => {
            return successCallBack(success);
        }, (error) => {
            return errorCallBack(error);
        }, header);
    }

    /**
     *
     * @param url
     * @param params
     * @param method
     * @param callBack
     * @param errorCallBack
     * @param header
     */
    static fetchBlob(url, params, method, callBack, errorCallBack, header) {
        console.log(method + ' Url=>' + url);
        RNFetchBlob.fetch(method, url, header || Header, params)
            .then((response) => {
                    return callBack(response);
                },
            ).catch((error) => {
                return errorCallBack(error);
            },
        );

    }

    /**
     * 下载文件
     * @param url
     * @param path
     * @param fileName
     * @param callbackPercent
     * @param callbackFinish
     * @param callbackFail
     */
    static downloadFile(url, path, fileName, callbackPercent, callbackFinish, callbackFail) {
        RNFetchBlob.config({
            path: path + fileName,
            fileCache: false,
        }).fetch('GET', url).progress((received, total) => {
            return callbackPercent(received / total);
        }).then((finish) => {
            return callbackFinish(finish);
        }).catch((error) => {
            return callbackFail(error);
        });
    }
}
