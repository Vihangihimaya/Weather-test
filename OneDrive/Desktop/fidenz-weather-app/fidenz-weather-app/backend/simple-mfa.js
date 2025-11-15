// simple-mfa.js
const otpStore = new Map();

// Generate 6-digit code
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Simple email sender
async function sendOTP(email, otp) {
  console.log(` MFA CODE for ${email}: ${otp}`);
  console.log(` In real app, this would be sent to: ${email}`);
  return true;
}

// Check if MFA is required
function checkMFA(req, res, next) {
  // For testing, use this email (from assignment)
  const testEmail = "careers@fidenz.com";
  
  // Store OTP for 10 minutes
  const otp = generateOTP();
  otpStore.set(testEmail, {
    otp: otp,
    expires: Date.now() + 10 * 60 * 1000 // 10 minutes
  });
  
  // Send OTP (in real app, this sends email)
  sendOTP(testEmail, otp);
  
  // Store email in request for verification
  req.mfaEmail = testEmail;
  next();
}

// Verify OTP
function verifyOTP(email, otp) {
  const stored = otpStore.get(email);
  if (!stored) return false;
  
  if (Date.now() > stored.expires) {
    otpStore.delete(email);
    return false;
  }
  
  if (stored.otp === otp) {
    otpStore.delete(email);
    return true;
  }
  
  return false;
}

export { checkMFA, verifyOTP };