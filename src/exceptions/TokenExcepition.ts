import { Exception as ExceptionBase } from "./Exception";

export class TokenExcepition extends ExceptionBase {
    constructor(errors: any = {}) {
      super();
      this.message = "Token error";
      this.status = 400;
      this.errors = errors
    }
}
