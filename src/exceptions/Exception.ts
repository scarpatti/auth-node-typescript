export class Exception {
    message!: string | null;
    status!: number;
    errors!: any;

    constructor(message: string | null = null, status: number = 500, errors: any = {}) {
      this.message = message;
      this.status = status;
      this.errors = errors
    }
}
