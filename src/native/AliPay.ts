type Status = '9000' | '8000' | '4000' | '5000' | '6001' | '6002';

interface Result {
    resultStatus: Status;
    result: string;
    memo: string;
}

export declare namespace AliPay {

    function aliPayAuthWithInfo(infoStr: string): Result;

    // 设置沙箱模式
    function setAliPaySandbox(isSandbox: boolean): void

    function aliPay(infoStr: string): Result;

    function getAliPaySDKVersion(): Result;

    function aliPayInterceptorWithUrl(infoStr: string): {
        resultCode: Status;
        returnUrl: string;
    };

    // function sign(infoStr: string): string;
}

