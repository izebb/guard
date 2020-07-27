import Validator from "./Validators";

export type BoolValidatorKeys = "bool" | "true" | "false";

class BoolValidator extends Validator<boolean, BoolValidatorKeys> {
  constructor() {
    super();
    this.validatorFns.set("bool", isBoolean);
  }

  get true() {
    this.validatorFns.set("true", isTruthy);
    return this;
  }

  get false() {
    this.validatorFns.set("false", isFalsy);
    return this;
  }
}

export default new BoolValidator();

function isBoolean(value: boolean) {
  return typeof value === "boolean";
}

function isTruthy(value: boolean) {
  return value === true;
}

function isFalsy(value: boolean) {
  return value === false;
}
