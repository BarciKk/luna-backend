const OTP_EXPIRY_MINUTES = 15;
const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

export { expiresAt };
