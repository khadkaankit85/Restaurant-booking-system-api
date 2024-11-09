import { encryptPass, comparePass } from "../../../src/Utils/EncryptPw";

describe("Password Encryption Utility", () => {
  const password = "mySecretPassword";

  it("should encrypt the password", async () => {
    const hashedPassword = await encryptPass(password);
    expect(hashedPassword).not.toBe(password);
    expect(hashedPassword).toMatch(/^\$2[ayb]\$.{56}$/);
  });

  it("should return true for correct password comparison", async () => {
    const hashedPassword = await encryptPass(password);
    const isMatch = await comparePass(password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  it("should return false for incorrect password comparison", async () => {
    const hashedPassword = await encryptPass(password);
    const isMatch = await comparePass("wrongPassword", hashedPassword);
    expect(isMatch).toBe(false);
  });
});
