const https = require('https');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Read config
const configPath = path.join(__dirname, 'appsettings.json');
if (!fs.existsSync(configPath)) {
    console.error('❌ appsettings.json not found');
    process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8')).BcMCPProxy;
const tenantId = config.TenantId;
const environment = config.Environment;

console.log('🔍 BC Diagnostic Tool');
console.log('---------------------');
console.log(`Tenant: ${tenantId}`);
console.log(`Environment: ${environment}`);
console.log('\n1️⃣  Testing Authentication...');

// We'll use the compiled C# app to get a token, because implementing MSAL in JS is complex
// We'll run it and capture the token if possible, or just user manual token for now.
// Actually, let's just ask the user to verify permissions first since we can't easily extract the token from the compiled exe.

console.log('\n⚠️  Cannot auto-diagnose without extracting token.');
console.log('\nPlease check the following manually:');

console.log('\n1. Check Environment Name');
console.log('   Is "Production" correct? Or is it "Sandbox"?');

console.log('\n2. Check Company Name');
console.log(`   Configured: "${config.Company}"`);
console.log('   Action: Open BC, search for "Companies", copy the name EXACTLY.');

console.log('\n3. Check Azure Permissions');
console.log('   - Go to Azure Portal > App Registrations > [Your App] > API Permissions');
console.log('   - Do you see "Financials.ReadWrite.All"?');
console.log('   - Is status "Granted for [Tenant]"? (Green checkmark)');

console.log('\n4. Check BC User Permissions');
console.log('   - Open BC > Users > [Your User]');
console.log('   - Do you have "D365 AUTOMATION" or "SUPER" permission sets?');

