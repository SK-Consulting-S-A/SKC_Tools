#!/usr/bin/env node

/**
 * BC MCP Proxy - NPM Wrapper
 * 
 * This package provides an npm-installable wrapper for the Business Central MCP Proxy.
 * The actual proxy is a C# application that runs locally and handles authentication
 * and communication with Business Central.
 * 
 * Usage:
 *   const bcMcpProxy = require('bc-mcp-proxy-fisqal');
 * 
 * Or run directly:
 *   npx bc-mcp-proxy-fisqal
 */

const path = require('path');

module.exports = {
    // Path to the BC MCP Proxy source
    sourceDir: path.join(__dirname, 'src', 'BcMCPProxy'),

    // Path to the bin directory
    binDir: path.join(__dirname, 'bin'),

    // Version
    version: require('./package.json').version,

    // Description
    description: 'Business Central MCP Proxy - npm wrapper for running the C# MCP proxy locally'
};

// If run directly
if (require.main === module) {
    require('./bin/bc-mcp-proxy.js');
}

