# BC MCP Proxy

This is an npm wrapper for Microsoft's Business Central MCP (Model Context Protocol) Proxy.

## What is BC MCP Proxy?

The BC MCP Proxy is a C# application that acts as a bridge between MCP clients (like Cursor, Claude Desktop, etc.) and Business Central instances. It handles authentication and proxies requests to Business Central APIs.

## Prerequisites

- **Node.js** 14.0 or later
- **.NET SDK** 8.0 or later ([Download here](https://dotnet.microsoft.com/download))
- A Business Central instance (online or on-premises)

## Installation

### Local Installation (in your project)

```bash
npm install
```

### Global Installation

```bash
npm install -g bc-mcp-proxy-fisqal
```

Or use directly with npx:

```bash
npx bc-mcp-proxy-fisqal
```

## Usage

### Running the Proxy

```bash
# If installed locally
npm start

# If installed globally
bc-mcp-proxy

# Using npx
npx bc-mcp-proxy-fisqal
```

### Configuration

The BC MCP Proxy can be configured in two ways:

#### Option 1: Using appsettings.json (Recommended)

Create an `appsettings.json` file in the package directory with your Business Central connection details:

```json
{
  "BcMCPProxy": {
    "TenantId": "your-tenant-id-here",
    "ClientId": "your-client-id-here",
    "Url": "https://api.businesscentral.dynamics.com",
    "Environment": "Production",
    "Company": "CRONUS International Ltd.",
    "ConfigurationName": "",
    "TokenScope": "https://api.businesscentral.dynamics.com/.default"
  }
}
```

**Important Configuration Fields:**
- `TenantId`: Your Azure AD tenant ID (required)
- `ClientId`: Your Azure AD application (client) ID (required)
- `Environment`: Business Central environment name (e.g., "Production", "Sandbox")
- `Company`: Business Central company name (exact match, case-sensitive)
- `Url`: Business Central API base URL (default: `https://api.businesscentral.dynamics.com`)

#### Option 2: Using Command-Line Arguments

You can also pass arguments directly:

```bash
bc-mcp-proxy --TenantId <tenant-id> --ClientId <client-id> --Environment <env> --Company <company-name>
```

**Note**: Command-line arguments take precedence over `appsettings.json`.

### Using with Cursor

1. Add the MCP server to your Cursor settings (`Settings > Features > MCP`):

```json
{
  "mcp": {
    "servers": {
      "bc-proxy": {
        "command": "npx",
        "args": [
          "-y",
          "bc-mcp-proxy-fisqal",
          "--TenantId", "your-tenant-id",
          "--ClientId", "your-client-id",
          "--Environment", "Production",
          "--Company", "Your Company Name"
        ]
      }
    }
  }
}
```

**Note:** Replace the placeholder values with your actual Business Central connection details. This setup works anywhere and doesn't require a local `appsettings.json` file.

**Or use command-line arguments directly:**

```json
{
  "mcp": {
    "servers": {
      "bc-proxy": {
        "command": "npx",
        "args": [
          "bc-mcp-proxy-fisqal",
          "--TenantId", "your-tenant-id",
          "--ClientId", "your-client-id",
          "--Environment", "Production",
          "--Company", "Your Company Name"
        ]
      }
    }
  }
}
```

## Building from Source

If you need to rebuild the C# project:

```bash
npm run build
```

## Project Structure

```
bc-mcp-proxy-npm/
├── bin/
│   └── bc-mcp-proxy.js      # CLI wrapper
├── scripts/
│   ├── install.js           # Post-install script
│   └── build.js             # Build script
├── src/
│   └── BcMCPProxy/          # Downloaded C# source (created on install)
├── package.json
└── README.md
```

## Troubleshooting

### Authentication Errors

If you see authentication errors like "Selected user account does not exist in tenant":

1. **Verify Tenant ID**: Ensure the `TenantId` in `appsettings.json` matches your Azure AD tenant
2. **Check User Access**: The user account must exist in the specified tenant or be added as an external user
3. **Verify Client ID**: Ensure the `ClientId` matches your Azure AD app registration
4. **Check Permissions**: Verify your Azure AD app has the required permissions:
   - `Financials.ReadWrite.All` (Delegated)
   - `user_impersonation` (Delegated)
5. **Admin Consent**: Ensure admin consent has been granted for the app permissions

### .NET SDK Not Found

If you get an error about .NET SDK not being found:

1. Install .NET 8.0 SDK from: https://dotnet.microsoft.com/download
2. Restart your terminal
3. Run `npm run build`

### Configuration Not Found

If you see "appsettings.json not found":

1. Copy the example: `cp appsettings.example.json appsettings.json`
2. Edit `appsettings.json` with your Business Central credentials
3. Ensure the file is in the package root directory

### Company Not Found

If you get errors about company not being found:

1. Check the company name matches exactly (case-sensitive)
2. Verify the company exists in your Business Central environment
3. List companies using: `GET https://api.businesscentral.dynamics.com/v2.0/{tenant}/{environment}/api/v2.0/companies`

### Source Not Downloaded

If the automatic download fails:

1. Manually clone the repository:
   ```bash
   git clone https://github.com/microsoft/BCTech.git
   cd BCTech/samples/BcMCPProxy
   dotnet build -c Release
   ```

2. Or download directly from: https://github.com/microsoft/BCTech/tree/master/samples/BcMCPProxy

## License

This npm wrapper is MIT licensed. The BC MCP Proxy source code is part of the Microsoft BCTech repository.

## Links

- [BC MCP Proxy Source](https://github.com/microsoft/BCTech/tree/master/samples/BcMCPProxy)
- [Microsoft BCTech Repository](https://github.com/microsoft/BCTech)
- [Model Context Protocol](https://modelcontextprotocol.io)

## Support

For issues related to:
- **This npm wrapper**: Open an issue in your repository
- **BC MCP Proxy itself**: See the [BCTech repository](https://github.com/microsoft/BCTech/issues)
- **Business Central**: See [Microsoft Business Central documentation](https://docs.microsoft.com/dynamics365/business-central)

