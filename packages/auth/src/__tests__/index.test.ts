import { firstLast, upperFirst, nameToUpperInitial } from "../functional";

// Test for firstLast function
describe("firstLast", () => {
  it("should return the first and last character of a string", () => {
    expect(firstLast("hello")).toBe("ho");
    expect(firstLast("world")).toBe("wd");
    expect(firstLast("a")).toBe("aa");
    expect(firstLast("")).toBe("");
  });
});

// Test for upperFirst function
describe("upperFirst", () => {
  it("should return the string with the first character in uppercase", () => {
    expect(upperFirst("hello")).toBe("Hello");
    expect(upperFirst("world")).toBe("World");
    expect(upperFirst("a")).toBe("A");
    expect(upperFirst("")).toBe("");
  });
});

// Test for nameToUpperInitial function
describe("nameToUpperInitial", () => {
  it("should return the initials of a name in uppercase", () => {
    expect(nameToUpperInitial("John Doe")).toBe("JD");
    expect(nameToUpperInitial("Jane Smith")).toBe("JS");
    expect(nameToUpperInitial("a b")).toBe("AB");
    expect(nameToUpperInitial("")).toBe("");
  });
});
