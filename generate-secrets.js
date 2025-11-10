#!/usr/bin/env node

/**
 * Generate secure secrets for JWT and other environment variables
 * Run: node generate-secrets.js
 */

const crypto = require('crypto');

console.log('🔐 Generating Secure Secrets for Production\n');
console.log('=' .repeat(60));
console.log('\n📋 Copy these to your Vercel Environment Variables:\n');

// Generate JWT secrets
const jwtSecret = crypto.randomBytes(64).toString('hex');
const jwtRefreshSecret = crypto.randomBytes(64).toString('hex');

console.log('JWT_SECRET=');
console.log(jwtSecret);
console.log('\nJWT_REFRESH_SECRET=');
console.log(jwtRefreshSecret);

console.log('\n' + '='.repeat(60));
console.log('\n✅ Secrets generated successfully!');
console.log('\n⚠️  IMPORTANT:');
console.log('   1. Copy these values immediately');
console.log('   2. Add them to Vercel environment variables');
console.log('   3. Never commit these to git');
console.log('   4. Keep them secure');
console.log('\n🔒 Each secret is 128 characters (64 bytes) - very secure!\n');

