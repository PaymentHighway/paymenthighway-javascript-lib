import * as Http from 'http';

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
        response = executeRequest('GET', paymentUri, this.createNameValuePairs());


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
            new Pair('sph-api-version', SPH_API_VERSION),
            new Pair('sph-account', this.account),
            new Pair('sph-merchant', this.merchant),
            new Pair('sph-timestamp', PaymentHighwayUtility.getUtcTimestamp()),
            new Pair('sph-request-id', PaymentHighwayUtility.createRequestId())
        ];
    }

    private executeRequest(method: Method, path: string, nameValuePairs: Pair<string, string>[], requestBody: any): any {
        const options = {
            protocol: 'https:',
            hostname: this.serviceUrl,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const ss = new SecureSigner(this.signatureKeyId, this.signatureSecret);
        const signature = this.createSignature(ss, method, path, nameValuePairs, requestBody);


        let req = http.request(options, (res) => {
            res.setEncoding('utf8');
            let body = '';
            response.on('data', (x) => {
                body += x;
            });
            response.on('end', () => {

                // Data reception is done, do whatever with it!
                var parsed = JSON.parse(body);
                callback({
                    email: parsed.email,
                    password: parsed.pass
                });
            });
        });

        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });


        nameValuePairs.add(new BasicNameValuePair("signature", signature));

        this.addHeaders(httpRequest, nameValuePairs);

        if (requestBody != null) {
            this.addBody(httpRequest, requestBody);
        }

        ResponseHandler<String> responseHandler = new PaymentHighwayResponseHandler(ss, METHOD_POST, requestUri);

        return httpclient.execute(httpRequest, responseHandler);
    }

    private createSignature(ss: SecureSigner, method: Method, uri: string, nameValuePairs: Pair<string, string>[], request: any): string {

        String json = "";
        if (request != null) {
            JsonGenerator jsonGenerator = new JsonGenerator();
            json = jsonGenerator.createTransactionJson(request);
        }
        return ss.createSignature(method, uri, nameValuePairs, json);
    }

    protected addHeaders(HttpRequestBase httpPost, List<NameValuePair> nameValuePairs) {

        httpPost.addHeader(HTTP.USER_AGENT, USER_AGENT);
        httpPost.addHeader(HTTP.CONTENT_TYPE, "application/json; charset=utf-8");

        for (NameValuePair param : nameValuePairs) {
            httpPost.addHeader(param.getName(), param.getValue());
        }
    }


}
