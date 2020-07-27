import Validator from "./Validators";

let emailRegExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

let urlRegExp = /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

let uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type StringValidatorKeys =
  | "string"
  | "required"
  | "len"
  | "pattern"
  | "email"
  | "url"
  | "uuid"
  | "capitalize"
  | "lowercase"
  | "uppercase";
export type LenOperators = "lt" | "lte" | "gt" | "gte";

class StringValidator extends Validator<string, StringValidatorKeys> {
  constructor() {
    super();
    this.validatorFns.set("string", isString);
  }

  len(compare: number, operator?: LenOperators) {
    this.validatorFns.set("len", length(compare, operator));
    return this;
  }

  pattern(regExp: RegExp) {
    this.validatorFns.set("pattern", pattern(regExp));
    return this;
  }

  get email() {
    this.validatorFns.set("email", isEmail);

    return this;
  }

  get required() {
    this.validatorFns.set("required", required);

    return this;
  }

  get url() {
    this.validatorFns.set("url", isURL);

    return this;
  }
  get uuid() {
    this.validatorFns.set("uuid", isUUID);

    return this;
  }
  get lowercase() {
    this.validatorFns.set("lowercase", lowercase);

    return this;
  }
  get uppercase() {
    this.validatorFns.set("uppercase", uppercase);
    return this;
  }
  get capitalize() {
    this.validatorFns.set("capitalize", capitalize);
    return this;
  }
}

export default new StringValidator();

function isString(value: string) {
  return typeof value === "string";
}

function length(compare: number, operator?: LenOperators) {
  return (value: string) => {
    const strLen = value.length;
    switch (operator) {
      case "lt":
        return strLen < compare;
      case "lte":
        return strLen <= compare;
      case "gt":
        return strLen > compare;
      case "gte":
        return strLen >= compare;
      default:
        return strLen === compare;
    }
  };
}

function required(value?: string) {
    return !!value?.trim()
}

function pattern(regExp: RegExp) {
  return (value: string) => regExp.test(value);
}

function isEmail(value: string) {
  return emailRegExp.test(value);
}

function isURL(value: string) {
  return urlRegExp.test(value);
}

function isUUID(value: string) {
  return uuidRegExp.test(value);
}

function uppercase(value: string) {
  return value === value.toUpperCase();
}

function lowercase(value: string) {
  return value === value.toLowerCase();
}

function capitalize(value: string) {
  let str = "";
  let isSpace = false;
  let strIndex = 0;
  while (strIndex < value.length) {
    const letter = isSpace ? value[strIndex].toUpperCase() : value[strIndex];

    if (value[strIndex] === " ") isSpace = true;
    else isSpace = false;

    str += letter;

    strIndex++;
  }

  return value === str;
}
