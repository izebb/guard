import Validator from "./Validators";

export type NumberValidatorKeys =
  | "float"
  | "int"
  | "number"
  | "lt"
  | "lte"
  | "gt"
  | "gte";


class NumberValidator extends Validator<number, NumberValidatorKeys> {
  constructor() {
    super();
    this.validatorFns.set("number", isNumber);
  }

  get float() {
    this.validatorFns.set("float", isFloat);

    return this;
  }

  get int() {
    this.validatorFns.set("int", isInt);

    return this;
  }

  lt(value: number) {
    this.validatorFns.set("lt", isLessThan(value));

    return this;
  }

  lte(value: number) {
    this.validatorFns.set("lte", isLessThanOrEqual(value));

    return this;
  }

  gt(value: number) {
    this.validatorFns.set("gt", isGreaterThan(value));

    return this;
  }

  gte(value: number) {
    this.validatorFns.set("gte", isGreaterThanOrEqual(value));
    return this;
  }
}

export default new NumberValidator();


function isNumber(value: number) {
  return typeof value === "number";
}

function isInt(value: number) {
  return isNumber(value) && value % 1 === 0;
}

function isFloat(value: number) {
  return isNumber(value) && !isInt(value);
}

function isLessThanOrEqual(compare: number) {
  return (value: number) => value <= compare;
}

function isLessThan(compare: number) {
  return (value: number) => value < compare;
}

function isGreaterThanOrEqual(compare: number) {
  return (value: number) => value >= compare;
}

function isGreaterThan(compare: number) {
  return (value: number) => value > compare;
}

