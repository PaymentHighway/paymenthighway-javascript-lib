import { Request } from "./PhRequest";

export class AfterPayCommitTransactionRequest extends Request {
    constructor(public amount: number) {super();}
}
