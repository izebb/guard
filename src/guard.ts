import Validator from "validators/Validators";
import isUndefined from "validators/is-undefined";

class Guard {
  validators: Validator<any, any>["validatorFns"];

  constructor(validators: Validator<any, any>) {
    this.validators = validators.validatorFns;
  }

  validate = (value?: any) => {
    const allowUndefinedFn = this.validators.get('allowUndefinedFn');

    if (isUndefined(value) && allowUndefinedFn?.(value)) {
      return true;
    }

    let isValid = false;

    for (let [key, validator] of this.validators) {
      isValid = validator(value);
    }

    return isValid;
  };
}


function guard(validators: any) {
  return new Guard(validators);
}

export default guard;
