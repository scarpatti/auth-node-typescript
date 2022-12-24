import { Exception } from "./Exception";

export class UnauthenticatedExcepition extends Exception {
    constructor(errors: any = {}) {
      super();
      this.message = "Unauthenticated";
      this.status = 401;
      this.errors = errors
    }
}
