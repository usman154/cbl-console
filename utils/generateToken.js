// generateToken.js

require('dotenv').config(); // Load environment variables from .env file
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Get the secret key from environment variables
const SECRET_KEY = process.env.JWT_SECRET;
const BLACKLIST_FILE = 'blacklistedTokens.json';

// Load blacklisted tokens from the JSON file
let blacklistedTokens = new Set();

function loadBlacklistedTokens() {
  if (fs.existsSync(BLACKLIST_FILE)) {
    const data = fs.readFileSync(BLACKLIST_FILE, 'utf8');
    blacklistedTokens = new Set(JSON.parse(data));
  }
}

// Save blacklisted tokens to the JSON file
function saveBlacklistedTokens() {
  fs.writeFileSync(BLACKLIST_FILE, JSON.stringify(Array.from(blacklistedTokens)), 'utf8');
}

// Function to generate a token
function generateToken(name, id) {
  // Define payload
  const payload = {
    name,
    userId
  };

  // Generate a non-expiring token
  const token = jwt.sign(payload, SECRET_KEY); // No expiresIn option
  return token;
}

// Function to blacklist a token
function blacklistToken(token) {
  blacklistedTokens.add(token);
  saveBlacklistedTokens(); // Save updated blacklist to file
  console.log(`Token has been blacklisted: ${token}`);
}

// Function to check if a token is blacklisted
function isTokenBlacklisted(token) {
  return blacklistedTokens.has(token);
}

// Function to verify a token
function verifyToken(token) {
  if (isTokenBlacklisted(token)) {
    console.log("Token is blacklisted. Access denied.");
    return null;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Token is valid. Access granted.");
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
}

// Command-line argument handling
const action = process.argv[2]; // 'generate' or 'blacklist'
const name = process.argv[3] || 'John Doe';
const userId = process.argv[4] || 'Software Engineer';
const tokenToBlacklist = process.argv[5]; // Token to blacklist (if action is 'blacklist')

// Load existing blacklisted tokens from the file
loadBlacklistedTokens();

// Perform the requested action
if (action === 'generate') {
  const token = generateToken(name, userId);
  console.log(`Generated JWT token for ${name} (${userId}):`);
  console.log(token);
} else if (action === 'blacklist') {
  if (!tokenToBlacklist) {
    console.error("Please provide a token to blacklist.");
  } else {
    blacklistToken(tokenToBlacklist);
  }
} else {
  console.error("Invalid action. Use 'generate' to create a token or 'blacklist' to blacklist a token.");
}
