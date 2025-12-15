# Publishing Guide

This guide explains how to publish the `bc-mcp-proxy-fisqal` package to npm.

## Prerequisites

1. **npm Account**: Create one at https://www.npmjs.com/signup
2. **npm CLI**: Should be installed with Node.js

## Preparation Steps

### 1. Login to npm

```bash
npm login
```

Enter your npm credentials when prompted.

### 2. Verify Package Configuration

Check `package.json` settings:

```json
{
  "name": "bc-mcp-proxy-fisqal",
  "version": "1.0.0",
  "description": "Business Central MCP Proxy - npm wrapper",
  "private": false,  // Ensure this is false or not present
  "publishConfig": {
    "access": "public"  // Required for scoped packages
  }
}
```

### 3. Test Package Locally

Before publishing, test the package:

```bash
# Test installation
npm install

# Test build
npm run build

# Test CLI
npm start
```

### 4. Update Version (for subsequent releases)

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major
```

## Publishing

### Option 1: Publish Public Package (Recommended)

```bash
npm publish --access public
```

### Option 2: Publish to Private Registry

```bash
npm publish
```

Note: Private packages require a paid npm account.

## Post-Publishing

### 1. Verify Publication

```bash
npm view bc-mcp-proxy-fisqal
```

Or visit: https://www.npmjs.com/package/bc-mcp-proxy-fisqal

### 2. Test Installation

```bash
# In a different directory
npm install -g bc-mcp-proxy-fisqal

# Or test with npx
npx bc-mcp-proxy-fisqal --help
```

### 3. Update README Badges (Optional)

Add npm badges to README.md:

```markdown
[![npm version](https://badge.fury.io/js/%40fisqal%2Fbc-mcp-proxy.svg)](https://www.npmjs.com/package/bc-mcp-proxy-fisqal)
[![npm downloads](https://img.shields.io/npm/dm/bc-mcp-proxy-fisqal.svg)](https://www.npmjs.com/package/bc-mcp-proxy-fisqal)
```

## Publishing Workflow

### First Release (1.0.0)

```bash
# Ensure you're on main/master branch
git checkout main

# Ensure clean working directory
git status

# Test everything
npm install
npm test
npm run build

# Login to npm
npm login

# Publish
npm publish --access public

# Tag the release in git
git tag v1.0.0
git push origin v1.0.0
```

### Subsequent Releases

```bash
# Make your changes
# Test thoroughly

# Update version
npm version patch  # or minor/major

# This creates a git commit and tag automatically

# Publish to npm
npm publish --access public

# Push to git
git push && git push --tags
```

## Automation with GitHub Actions (Optional)

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: npm install
      
      - name: Publish to npm
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add `NPM_TOKEN` secret in GitHub repository settings.

## Package Maintenance

### Unpublishing

⚠️ **Warning**: Unpublishing is permanent and affects all users.

```bash
# Unpublish a specific version (within 72 hours)
npm unpublish bc-mcp-proxy-fisqal@1.0.0

# Unpublish entire package (NOT RECOMMENDED)
npm unpublish bc-mcp-proxy-fisqal --force
```

### Deprecating

Better alternative to unpublishing:

```bash
npm deprecate bc-mcp-proxy-fisqal@1.0.0 "This version has a critical bug, please upgrade to 1.0.1"
```

### Updating Package Info

```bash
# Update without publishing new version
npm owner add <username> bc-mcp-proxy-fisqal
npm owner rm <username> bc-mcp-proxy-fisqal
```

## Pre-Publishing Checklist

- [ ] Tested locally with `npm install`
- [ ] Tested build with `npm run build`
- [ ] Tested CLI with `npm start`
- [ ] Updated version in `package.json`
- [ ] Updated README.md with any changes
- [ ] Verified `.npmignore` excludes unnecessary files
- [ ] Logged in to npm (`npm whoami` works)
- [ ] Clean git working directory
- [ ] All tests pass
- [ ] Documentation is up-to-date

## Files Included in Package

The following files are included when publishing (controlled by `.npmignore`):

```
bc-mcp-proxy-fisqal/
├── bin/
│   └── bc-mcp-proxy.js
├── scripts/
│   ├── install.js
│   └── build.js
├── index.js
├── package.json
├── README.md
├── USAGE.md
├── QUICKSTART.md
├── LICENSE
└── appsettings.example.json
```

Excluded (via `.npmignore`):
- `src/` (downloaded during postinstall)
- `node_modules/`
- `.git/`
- Development files

## Version Strategy

Follow Semantic Versioning (semver):

- **MAJOR** (x.0.0): Breaking changes
- **MINOR** (1.x.0): New features, backward compatible
- **PATCH** (1.0.x): Bug fixes

Example:
- 1.0.0 - Initial release
- 1.0.1 - Bug fix
- 1.1.0 - New feature (e.g., support for additional auth methods)
- 2.0.0 - Breaking change (e.g., different configuration format)

## Support

For publishing issues:
- npm documentation: https://docs.npmjs.com/
- npm support: https://www.npmjs.com/support
- npm CLI docs: https://docs.npmjs.com/cli/

## Security

### npm Tokens

Store npm tokens securely:
- Never commit tokens to git
- Use environment variables or secret managers
- Rotate tokens regularly
- Use granular tokens when possible

### Package Security

```bash
# Check for vulnerabilities
npm audit

# Fix automatically (when possible)
npm audit fix
```

## Registry Configuration

### Using Different Registry

```bash
# Publish to custom registry
npm publish --registry https://your-registry.com

# Or set in package.json
{
  "publishConfig": {
    "registry": "https://your-registry.com"
  }
}
```

## Troubleshooting

### Error: "You must be logged in"
**Solution**: Run `npm login`

### Error: "Package already exists"
**Solution**: Update version number

### Error: "You do not have permission"
**Solution**: 
- Verify you're logged in as correct user
- Check organization membership
- Verify package name availability

### Error: "Package name too similar"
**Solution**: Choose a different package name

## Resources

- [npm Documentation](https://docs.npmjs.com/)
- [npm CLI Commands](https://docs.npmjs.com/cli/)
- [Semantic Versioning](https://semver.org/)
- [npm Package.json Guide](https://docs.npmjs.com/cli/configuring-npm/package-json)

