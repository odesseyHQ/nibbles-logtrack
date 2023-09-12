// Source of idea: https://engineering.udacity.com/handling-errors-like-a-pro-in-typescript-d7a314ad4991

export class ErrorBase extends Error {
  message: string;
  cause: any;
  constructor({ message, cause }: { message: string; cause?: any }) {
    super();
    this.message = message;
    this.cause = cause;
  }
}

export class ValidationError extends ErrorBase {
  constructor({ message, cause }: { message: string; cause?: any }) {
    super({ message, cause });
    /* Typescript has an issue with instanceOf method by default. To avoid that we are manually doing the below set prototype.
    For more info read: https://dannyguo.medium.com/how-to-fix-instanceof-not-working-for-custom-errors-in-typescript-1df978100a27
    Offline copy: `./instanceof-prototype-issue.doc.md`
    */
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
