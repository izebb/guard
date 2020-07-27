import bool from "validators/bool";
import guard from "guard";
import number from "validators/number";
import string from "validators/string";
import shape from "validators/shape";

describe("guard/number", () => {
  it("should validate number values", () => {
    expect(guard(number).validate(3)).toBeTruthy();
    expect(guard(number).validate(3.4)).toBeTruthy();

    expect(guard(number).validate("test")).toBeFalsy();
    expect(guard(number).validate()).toBeFalsy();
  });

  it("should validate float values", () => {
    expect(guard(number.float).validate(3.4)).toBeTruthy();
    expect(guard(number.float).validate(3)).toBeFalsy();
  });

  it("should validate integer values", () => {
    expect(guard(number.int).validate(3)).toBeTruthy();
    expect(guard(number.int).validate(3.4)).toBeFalsy();
  });

  it("should validate lte", () => {
    expect(guard(number.lte(12)).validate(12)).toBeTruthy();
    expect(guard(number.lte(10)).validate(9)).toBeTruthy();

    expect(guard(number.lte(10)).validate(12)).toBeFalsy();
  });

  it("should validate lt", () => {
    expect(guard(number.lt(12)).validate(12)).toBeFalsy();
    expect(guard(number.lt(10)).validate(12)).toBeFalsy();

    expect(guard(number.lt(10)).validate(1)).toBeTruthy();
  });

  it("should validate gte", () => {
    expect(guard(number.gte(12)).validate(12)).toBeTruthy();
    expect(guard(number.gte(10)).validate(19)).toBeTruthy();

    expect(guard(number.gte(10)).validate(2)).toBeFalsy();
  });

  it("should validate gt", () => {
    expect(guard(number.gt(12)).validate(12)).toBeFalsy();
    expect(guard(number.gt(10)).validate(2)).toBeFalsy();

    expect(guard(number.gt(10)).validate(19)).toBeTruthy();
  });

  it("should validate allowUndefined", () => {
    expect(guard(number.gt(12).allowUndefined).validate()).toBeTruthy();
    expect(guard(number.int.allowUndefined).validate()).toBeTruthy();
  });
});

describe("guard/string", () => {
  it("should validate string", () => {
    expect(guard(string).validate("test str")).toBeTruthy();
    expect(guard(string).validate()).toBeFalsy();
    expect(guard(string).validate(3)).toBeFalsy();
  });

  it("should validate required", () => {
    expect(guard(string.required).validate("")).toBeFalsy();
    expect(guard(string.required).validate("test")).toBeTruthy();
  });

  it("should validate string with length", () => {
    expect(guard(string.len(4)).validate("test")).toBeTruthy();
    expect(guard(string.len(4)).validate("test str")).toBeFalsy();

    expect(guard(string.len(5, "lt")).validate("test")).toBeTruthy();
    expect(guard(string.len(4, "lt")).validate("test")).toBeFalsy();

    expect(guard(string.len(4, "lte")).validate("test")).toBeTruthy();
    expect(guard(string.len(3, "lte")).validate("test")).toBeFalsy();

    expect(guard(string.len(3, "gt")).validate("test")).toBeTruthy();
    expect(guard(string.len(4, "gt")).validate("test")).toBeFalsy();

    expect(guard(string.len(4, "gte")).validate("test")).toBeTruthy();
    expect(guard(string.len(5, "gte")).validate("test")).toBeFalsy();
  });

  it("should validate string with pattern", () => {
    expect(guard(string.pattern(/\d+/)).validate('10')).toBeTruthy();
    expect(guard(string.pattern(/\d+/)).validate("test")).toBeFalsy();
  });

  it("should validate email", () => {
    expect(guard(string.email).validate("example@mail.com")).toBeTruthy();
  });

  it("should validate URL", () => {
    expect(guard(string.url).validate("http://google.com")).toBeTruthy();
    expect(guard(string.url).validate("http://www.google.com")).toBeTruthy();
  });

  it("should validate UUID  ", () => {
    expect(
      guard(string.uuid).validate("18516f98-cd20-11ea-87d0-0242ac130003")
    ).toBeTruthy();
  });

  it("should validate lowercase  ", () => {
    expect(guard(string.lowercase).validate("test")).toBeTruthy();
    expect(guard(string.lowercase).validate("Test")).toBeFalsy();
  });

  it("should validate uppercase  ", () => {
    expect(guard(string.uppercase).validate("TEST")).toBeTruthy();
    expect(guard(string.uppercase).validate("Test")).toBeFalsy();
  });

  it("should validate capitalize  ", () => {
    expect(guard(string.capitalize).validate("Test And   Want")).toBeTruthy();
    expect(guard(string.capitalize).validate("Test and")).toBeFalsy();
  });
});

describe("guard/bool", () => {
  it("should validate boolean value", () => {
    expect(guard(bool).validate(true)).toBeTruthy();
    expect(guard(bool.false).validate(false)).toBeTruthy();
    expect(guard(bool.true).validate(true)).toBeTruthy();
  });
});

describe.skip("guard/shape", () => {
  it("should validate shape", () => {
    const schema = shape({
      name: string,
      age: number,
      isAdmin: bool,
    });

    expect(
      guard(schema).validate({
        name: "John Doe",
        age: 24,
        isAdmin: false,
        password: string.len(8, "gte"),
        confirmPassword: shape.ref("password"),
      })
    ).toBeTruthy();
  });
});
