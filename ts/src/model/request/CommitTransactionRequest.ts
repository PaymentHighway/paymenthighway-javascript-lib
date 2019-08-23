import { Request } from "./PhRequest";

export class CommitTransactionRequest extends Request {
    constructor(public amount: number, public currency: string) {super();}
}
