import { Exception } from "./Exception";

export class UnauthorizedExcepition extends Exception {
    constructor(errors: any = {}) {
      super();
      this.message = "Unauthorized";
      this.status = 403;
      this.errors = errors
    }
}
