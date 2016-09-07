import * as Http from 'http';
import {PaymentHighwayUtility} from "./PaymentHighwayUtility";
import {SecureSigner} from "./security/SecureSigner";
import {Pair} from "./util/Pair";

type Method = 'POST' | 'GET';

class PaymentApi {

    /* Payment API headers */
    public static USER_AGENT: string = 'PaymentHighway Javascript Library';
    public static METHOD_POST: string = 'POST';
    public static METHOD_GET: string = 'GET';
    public static CT_HEADER: string = 'Content-type';
    public static CT_HEADER_INFO: string = 'application/json; charset=utf-8';
    public static API_VERSION_INFO: string = '';

    /* Custom SPH Headers */
    public static SPH_ACCOUNT: string = 'sph-account';
    public static SPH_MERCHANT: string = 'sph-merchant';
    public static SPH_AMOUNT: string = 'sph-amount';
    public static SPH_CURRENCY: string = 'sph-currency';
    public static SPH_ORDER: string = 'sph-order';
    public static SPH_SUCCESS_URL: string = 'sph-success-url';
    public static SPH_FAILURE_URL: string = 'sph-failure-url';
    public static SPH_CANCEL_URL: string = 'sph-cancel-url';
    public static SPH_REQUEST_ID: string = 'sph-request-id';
    public static SPH_TIMESTAMP: string = 'sph-timestamp';
    public static SPH_API_VERSION: string = 'sph-api-version';
    public static LANGUAGE: string = 'language';
    public static DESCRIPTION: string = 'description';
    public static SIGNATURE: string = 'signature';

    constructor(public serviceUrl: string,
                public signatureKeyId: string,
                public signatureSecret: string,
                public account: string,
                public merchant: string,
                public apiversion: string = '20150605') {
    }

    public initTransaction(): void {
        const paymentUri: string = '/transaction';
        let response = this.executeRequest('POST', null, paymentUri, this.createNameValuePairs());


    }

    /*
     public debitTransaction(transactionId, request){}

     public revertTransaction(UUID transactionId) throws IOException {}

     public transactionStatus(UUID transactionId) throws IOException {}

     public searchOrders(String order) throws IOException {}

     public commitTransaction(UUID transactionId, String amount, String currency) throws IOException {}

     public transactionResult(UUID transactionId) throws IOException {}

     public tokenize(UUID tokenizationId) throws IOException {}

     public fetchDailyReport(String date) throws IOException {}

     public fetchReconciliationReport(String date) throws IOException {}
     */

    /**
     * Create name value pairs
     *
     * @return
     */
    private createNameValuePairs(): Pair<string, string>[] {
        return [
            new Pair('sph-api-version', PaymentApi.SPH_API_VERSION),
            new Pair('sph-account', this.account),
            new Pair('sph-merchant', this.merchant),
            new Pair('sph-timestamp', PaymentHighwayUtility.getUtcTimestamp()),
            new Pair('sph-request-id', PaymentHighwayUtility.createRequestId())
        ];
    }

    private executeRequest(method: Method, callback: any, path: string, nameValuePairs: Pair<string, string>[], requestBody?: any): any {
        const ss = new SecureSigner(this.signatureKeyId, this.signatureSecret);
        let bodyString = "";
        if(requestBody){
            bodyString = JSON.stringify(requestBody);
        }
        const signature = this.createSignature(ss, method, path, nameValuePairs, bodyString);
        nameValuePairs.push(new Pair('signature', signature));

        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': PaymentApi.USER_AGENT
        };
        nameValuePairs.forEach((pair) => {
           headers[pair.first] = pair.second;
        });
        if(requestBody){
            headers['Content-Length'] = Buffer.byteLength(bodyString);
        }
        const options = {
            protocol: 'https:',
            hostname: this.serviceUrl,
            path: path,
            method: method,
            headers: headers
        };

        let req = Http.request(options, (res) => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', (x) => {
                body += x;
            });
            res.on('end', () => {
                callback(JSON.parse(body));
            });
        });

        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });

        req.write(bodyString);
        req.end();
    }

    private createSignature(ss: SecureSigner, method: Method, uri: string, nameValuePairs: Pair<string, string>[], requestBody: string): string {

        return ss.createSignature(method, uri, nameValuePairs, requestBody);
    }


}
