type TStatus = '9000' | '8000' | '4000' | '5000' | '6001' | '6002';

interface IResult {
    resultStatus: TStatus;
    result: string;
    memo: string;
}

export declare namespace aliPay {

    function payAuthWithInfo(infoStr: string): IResult;

    function pay(infoStr: string): IResult;

    function payInterceptorWithUrl(infoStr: string): {
        resultCode: TStatus;
        returnUrl: string;
    };

    function sign(infoStr: string): string;
}
