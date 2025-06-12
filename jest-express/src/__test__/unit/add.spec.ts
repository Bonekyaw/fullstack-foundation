import { add } from "../../utils/add";
describe("Adding two numbers", () => {
  test("add two positive numbers", () => {
    expect(add(1, 2)).toBe(3);
  });
  test("add two negative numbers", () => {
    expect(add(-1, -2)).toBe(-3);
  });
});
