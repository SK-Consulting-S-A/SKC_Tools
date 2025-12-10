#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Read token from .publish-token file
const tokenPath = path.join(__dirname, '..', '.publish-token');

if (!fs.existsSync(tokenPath)) {
    console.error('Error: .publish-token file not found!');
    console.error('Please create a .publish-token file in the project root with your Personal Access Token.');
    process.exit(1);
}

const token = fs.readFileSync(tokenPath, 'utf8').trim();

if (!token) {
    console.error('Error: .publish-token file is empty!');
    process.exit(1);
}

// Read package.json to get publisher and extension name
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const publisher = packageJson.publisher;
const extensionName = packageJson.name;

// Get the version bump type from command line args (patch, minor, major, or none)
const versionType = process.argv[2] || '';

// Build the vsce publish command
let command = 'vsce publish';
if (versionType) {
    command += ` ${versionType}`;
}
command += ` --pat ${token}`;

console.log('Publishing extension...');
console.log(`Using version bump: ${versionType || 'none (current version)'}`);

try {
    execSync(command, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log('\n✅ Extension published successfully!');

    // Set extension to private
    console.log('\n🔒 Setting extension to private...');
    setExtensionPrivate(publisher, extensionName, token)
        .then(() => {
            console.log('✅ Extension set to private.');
        })
        .catch(() => {
            // Error already handled in function
        });
} catch (error) {
    console.error('\n❌ Publishing failed!');
    process.exit(1);
}

/**
 * Sets the extension to private using Azure DevOps REST API
 */
function setExtensionPrivate(publisherId, extensionId, pat) {
    return new Promise((resolve) => {
        const auth = Buffer.from(`:${pat}`).toString('base64');

        const options = {
            hostname: 'marketplace.visualstudio.com',
            path: `/_apis/gallery/publishers/${publisherId}/extensions/${extensionId}?api-version=7.1-preview`,
            method: 'PUT',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        // Get current extension details first
        const getOptions = {
            hostname: 'marketplace.visualstudio.com',
            path: `/_apis/gallery/publishers/${publisherId}/extensions/${extensionId}?api-version=7.1-preview`,
            method: 'GET',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Accept': 'application/json'
            }
        };

        const getReq = https.request(getOptions, (getRes) => {
            let data = '';
            getRes.on('data', (chunk) => { data += chunk; });
            getRes.on('end', () => {
                try {
                    const extension = JSON.parse(data);
                    // Set flags to make it private
                    extension.flags = 'Private';

                    // Update extension
                    const putReq = https.request(options, (putRes) => {
                        putRes.on('data', () => { /* consume data */ });
                        putRes.on('end', () => {
                            if (putRes.statusCode >= 200 && putRes.statusCode < 300) {
                                resolve();
                            } else {
                                // Try alternative method - use the web API endpoint
                                console.log('⚠️  Note: Extension published. Please verify privacy setting in the marketplace.');
                                console.log(`   Manage at: https://marketplace.visualstudio.com/manage/publishers/${publisherId}/extensions/${extensionId}/hub`);
                                resolve(); // Don't fail if API call doesn't work
                            }
                        });
                    });

                    putReq.on('error', () => {
                        console.log('⚠️  Note: Extension published. Please verify privacy setting in the marketplace.');
                        console.log(`   Manage at: https://marketplace.visualstudio.com/manage/publishers/${publisherId}/extensions/${extensionId}/hub`);
                        resolve(); // Don't fail if API call doesn't work
                    });

                    putReq.write(JSON.stringify(extension));
                    putReq.end();
                } catch (err) {
                    console.log('⚠️  Note: Extension published. Please verify privacy setting in the marketplace.');
                    console.log(`   Manage at: https://marketplace.visualstudio.com/manage/publishers/${publisherId}/extensions/${extensionId}/hub`);
                    resolve(); // Don't fail if API call doesn't work
                }
            });
        });

        getReq.on('error', () => {
            console.log('⚠️  Note: Extension published. Please verify privacy setting in the marketplace.');
            console.log(`   Manage at: https://marketplace.visualstudio.com/manage/publishers/${publisherId}/extensions/${extensionId}/hub`);
            resolve(); // Don't fail if API call doesn't work
        });

        getReq.end();
    });
}

