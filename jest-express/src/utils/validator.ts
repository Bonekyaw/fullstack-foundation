export function isValidEmail(input: string) {
  if (typeof input !== "string") {
    return false;
  }
  const email = input.trim();
  // Just for sample, not complete
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
