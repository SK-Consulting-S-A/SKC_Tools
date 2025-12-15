#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'src');
const bcMcpProxyDir = path.join(sourceDir, 'BcMCPProxy');

console.log('📦 Installing BC MCP Proxy...');

// Create src directory if it doesn't exist
if (!fs.existsSync(sourceDir)) {
    fs.mkdirSync(sourceDir, { recursive: true });
}

// Check if source already exists
if (fs.existsSync(bcMcpProxyDir)) {
    console.log('✓ BC MCP Proxy source already exists');
} else {
    console.log('📥 Downloading BC MCP Proxy source from GitHub...');

    try {
        // Use degit to download just the specific directory
        const degit = require('degit');
        const emitter = degit('microsoft/BCTech/samples/BcMCPProxy', {
            cache: false,
            force: true,
            verbose: false
        });

        emitter.clone(bcMcpProxyDir).then(() => {
            console.log('✓ Source downloaded successfully');
            buildProject();
        }).catch(err => {
            console.error('❌ Failed to download source:', err.message);
            console.log('💡 You can manually clone the repo and build the project');
            process.exit(0); // Don't fail installation
        });
    } catch (error) {
        console.error('❌ Error during download:', error.message);
        console.log('💡 You can manually clone the repo from:');
        console.log('   https://github.com/microsoft/BCTech/tree/master/samples/BcMCPProxy');
        process.exit(0); // Don't fail installation
    }
}

function buildProject() {
    console.log('🔨 Building BC MCP Proxy...');

    // Check if dotnet is available
    try {
        execSync('dotnet --version', { stdio: 'pipe' });
    } catch (error) {
        console.log('⚠️  .NET SDK not found. Please install .NET 8.0 or later from:');
        console.log('   https://dotnet.microsoft.com/download');
        console.log('💡 You can build the project later by running: npm run build');
        return;
    }

    try {
        // Build the C# project
        execSync('dotnet build -c Release', {
            cwd: bcMcpProxyDir,
            stdio: 'inherit'
        });

        console.log('✓ BC MCP Proxy built successfully');
        console.log('');
        console.log('🚀 You can now run: npx bc-mcp-proxy');
        console.log('   Or use: npm start');
    } catch (error) {
        console.error('❌ Build failed:', error.message);
        console.log('💡 You may need to build manually:');
        console.log('   cd', bcMcpProxyDir);
        console.log('   dotnet build -c Release');
    }
}

// If source already exists, attempt to build
if (fs.existsSync(bcMcpProxyDir)) {
    buildProject();
}

