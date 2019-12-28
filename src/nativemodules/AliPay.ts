type TStatus = '9000' | '8000' | '4000' | '5000' | '6001' | '6002';

interface IResult {
    resultStatus: TStatus;
    result: string;
    memo: string;
}

export declare namespace aliPay {

    function aliPayAuthWithInfo(infoStr: string): IResult;

    function aliPay(infoStr: string): IResult;

    function aliPayInterceptorWithUrl(infoStr: string): {
        resultCode: TStatus;
        returnUrl: string;
    };

    function aliPaySign(infoStr: string): string;
}
