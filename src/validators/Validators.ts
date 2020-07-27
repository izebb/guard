import isUndefined from "./is-undefined";

export type NumberValidator = Map<string, (value: number) => boolean>;

export type DefaultValidatorKeys = "allowUndefined";

abstract class Validator<T, K> {
  validatorFns: Map<
    K | DefaultValidatorKeys,
    (value: Partial<T>) => boolean
  > = new Map();

  get allowUndefined() {
    this.validatorFns.set("allowUndefined", isUndefined);

    return this;
  }
}

export default Validator;
