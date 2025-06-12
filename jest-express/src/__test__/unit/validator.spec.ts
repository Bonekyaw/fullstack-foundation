import { isValidEmail } from "../../utils/validator";

describe("isValidEmail", () => {
  test("Should return false for a non-string input", () => {
    expect(isValidEmail(123 as any)).toBe(false);
    expect(isValidEmail(null as any)).toBe(false);
    expect(isValidEmail(undefined as any)).toBe(false);
    expect(isValidEmail({} as any)).toBe(false);
    expect(isValidEmail([] as any)).toBe(false);
  });

  test("Should return false for invalid email strings", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("user@")).toBe(false);
    expect(isValidEmail("@domain.com")).toBe(false);
    expect(isValidEmail("user@doamin")).toBe(false);
    expect(isValidEmail("user@doamin.")).toBe(false);
  });

  test("Should return true for valid email strings", () => {
    expect(isValidEmail("phone@gmail.com")).toBe(true);
    expect(isValidEmail("phone.nyo@gmail.com.mm")).toBe(true);
  });
});
