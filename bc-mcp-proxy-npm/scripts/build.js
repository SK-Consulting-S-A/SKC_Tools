#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const bcMcpProxyDir = path.join(__dirname, '..', 'src', 'BcMCPProxy');

console.log('🔨 Building BC MCP Proxy...');

if (!fs.existsSync(bcMcpProxyDir)) {
    console.error('❌ Source directory not found. Please run: npm install');
    process.exit(1);
}

// Check if dotnet is available
try {
    const dotnetVersion = execSync('dotnet --version', { encoding: 'utf-8' }).trim();
    console.log(`✓ .NET SDK ${dotnetVersion} found`);
} catch (error) {
    console.error('❌ .NET SDK not found. Please install .NET 8.0 or later from:');
    console.error('   https://dotnet.microsoft.com/download');
    process.exit(1);
}

try {
    // Build the C# project
    console.log('Building Release configuration...');
    execSync('dotnet build -c Release', {
        cwd: bcMcpProxyDir,
        stdio: 'inherit'
    });

    console.log('');
    console.log('✓ BC MCP Proxy built successfully');
    console.log('');
    console.log('🚀 You can now run: npx bc-mcp-proxy');
} catch (error) {
    console.error('❌ Build failed');
    process.exit(1);
}

