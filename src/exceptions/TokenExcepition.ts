import { Exception } from "./Exception";

export class TokenExcepition extends Exception {
    constructor(errors: any = {}) {
      super();
      this.message = "Token error";
      this.status = 400;
      this.errors = errors
    }
}
