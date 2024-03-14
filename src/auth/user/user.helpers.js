import crypto from "crypto";
export function generateSecurePIN() {
  const min = 10000;
  const max = 99999;

  const randomBytes = crypto.randomBytes(4);
  const randomNumber = randomBytes.readUInt32BE(0);

  const scaledRandomNumber = min + (randomNumber % (max - min + 1));

  return scaledRandomNumber;
}
