# BC MCP Proxy Usage Guide

## Quick Start

### 1. Configure Your Business Central Connection

Copy the example configuration file:

```bash
cp appsettings.example.json appsettings.json
```

Edit `appsettings.json` with your Business Central connection details:

```json
{
  "BcMCPProxy": {
    "Servers": [
      {
        "Name": "MyBC",
        "BaseUrl": "https://api.businesscentral.dynamics.com/v2.0/YOUR-TENANT-ID/Production",
        "Company": "Your Company Name",
        "AuthType": "OAuth2",
        "TenantId": "your-tenant-id",
        "ClientId": "your-client-id"
      }
    ]
  }
}
```

### 2. Run the Proxy

```bash
# Using npm
npm start

# Using npx
npx bc-mcp-proxy

# If installed globally
bc-mcp-proxy
```

## Configuration Options

### Server Configuration

| Property | Description | Required |
|----------|-------------|----------|
| `Name` | Friendly name for the BC server | Yes |
| `BaseUrl` | Business Central API base URL | Yes |
| `Company` | Company name in Business Central | Yes |
| `ApiVersion` | API version (e.g., "v2.0") | Yes |
| `AuthType` | Authentication type: "OAuth2", "Basic", or "Windows" | Yes |
| `TenantId` | Azure AD tenant ID (for OAuth2) | For OAuth2 |
| `ClientId` | Azure AD application ID (for OAuth2) | For OAuth2 |

### Authentication Types

#### OAuth2 (Recommended for BC Online)

```json
{
  "Name": "BCOnline",
  "AuthType": "OAuth2",
  "TenantId": "your-tenant-id",
  "ClientId": "your-client-id",
  "Scopes": [
    "https://api.businesscentral.dynamics.com/.default"
  ]
}
```

#### Basic Authentication (For On-Premises)

```json
{
  "Name": "BCOnPrem",
  "AuthType": "Basic",
  "BaseUrl": "http://your-bc-server:7048/BC/api/v2.0"
}
```

#### Windows Authentication (For On-Premises)

```json
{
  "Name": "BCOnPrem",
  "AuthType": "Windows",
  "BaseUrl": "http://your-bc-server:7048/BC/api/v2.0"
}
```

## Using with Cursor

### 1. Configure Cursor MCP Settings

Add to your Cursor settings (Settings > Features > MCP):

```json
{
  "mcp": {
    "servers": {
      "bc-proxy": {
        "command": "npx",
        "args": [
          "-y",
          "bc-mcp-proxy-fisqal",
          "--TenantId", "YOUR-TENANT-ID",
          "--ClientId", "YOUR-CLIENT-ID",
          "--Environment", "Production",
          "--Company", "Your Company Name"
        ]
      }
    }
  }
}
```

Or if installed globally:

```json
{
  "mcp": {
    "servers": {
      "bc-proxy": {
        "command": "bc-mcp-proxy"
      }
    }
  }
}
```

### 2. Restart Cursor

After configuring, restart Cursor for the changes to take effect.

### 3. Use in Cursor

You can now interact with Business Central through Cursor:

- "Get customer list from Business Central"
- "Show me the sales orders for today"
- "Create a new item in BC"

## Using with Claude Desktop

Add to `claude_desktop_config.json`:

### Windows
Location: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "bc-proxy": {
      "command": "npx",
      "args": ["bc-mcp-proxy-fisqal"],
      "cwd": "C:\\Apps\\Fisqal-Lux-Localization\\bc-mcp-proxy-npm"
    }
  }
}
```

### macOS/Linux
Location: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "bc-proxy": {
      "command": "npx",
      "args": ["bc-mcp-proxy-fisqal"],
      "cwd": "/path/to/bc-mcp-proxy-npm"
    }
  }
}
```

## Setting Up Azure AD App Registration (OAuth2)

### 1. Create App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to Azure Active Directory > App registrations
3. Click "New registration"
4. Name: "BC MCP Proxy"
5. Supported account types: "Accounts in this organizational directory only"
6. Redirect URI: "http://localhost" (Public client/native)
7. Click "Register"

### 2. Configure API Permissions

1. Go to "API permissions"
2. Click "Add a permission"
3. Choose "Dynamics 365 Business Central"
4. Select "Delegated permissions"
5. Check:
   - `Financials.ReadWrite.All`
   - `user_impersonation`
6. Click "Add permissions"
7. Click "Grant admin consent"

### 3. Configure Authentication

1. Go to "Authentication"
2. Under "Advanced settings" > "Allow public client flows": Yes
3. Click "Save"

### 4. Get Configuration Values

- **Tenant ID**: Found in "Overview" > "Directory (tenant) ID"
- **Client ID**: Found in "Overview" > "Application (client) ID"

## Troubleshooting

### Error: "dotnet not found"

Install .NET 8.0 SDK from: https://dotnet.microsoft.com/download

### Error: "Source not downloaded"

Manually clone and build:

```bash
git clone https://github.com/microsoft/BCTech.git
cd BCTech/samples/BcMCPProxy
dotnet build -c Release
```

### Error: "Failed to authenticate"

1. Verify your Tenant ID and Client ID
2. Ensure App Registration has correct permissions
3. Check if admin consent was granted
4. Verify the redirect URI is set to http://localhost

### Error: "Company not found"

1. Check the company name in `appsettings.json` matches exactly (case-sensitive)
2. List companies: `GET https://api.businesscentral.dynamics.com/v2.0/{tenant}/{environment}/api/v2.0/companies`

## Advanced Configuration

### Multiple Business Central Instances

You can configure multiple BC instances:

```json
{
  "BcMCPProxy": {
    "Servers": [
      {
        "Name": "Production",
        "BaseUrl": "https://api.businesscentral.dynamics.com/v2.0/tenant-id/Production",
        "Company": "Prod Company"
      },
      {
        "Name": "Sandbox",
        "BaseUrl": "https://api.businesscentral.dynamics.com/v2.0/tenant-id/Sandbox",
        "Company": "Test Company"
      }
    ]
  }
}
```

### Custom Authentication Header

For custom authentication scenarios:

```json
{
  "Name": "CustomBC",
  "AuthType": "Custom",
  "CustomAuthHeader": "Authorization",
  "CustomAuthValue": "Bearer {your-token}"
}
```

### Logging Configuration

Adjust logging levels:

```json
{
  "BcMCPProxy": {
    "Logging": {
      "LogLevel": {
        "Default": "Debug",
        "Microsoft": "Information",
        "System": "Warning"
      }
    }
  }
}
```

## API Reference

The BC MCP Proxy exposes Business Central API endpoints through the Model Context Protocol. Available tools depend on your BC version and installed apps.

Common endpoints:
- Companies
- Customers
- Vendors
- Items
- Sales Orders
- Purchase Orders
- General Ledger Entries

## Support & Resources

- [BC MCP Proxy Source](https://github.com/microsoft/BCTech/tree/master/samples/BcMCPProxy)
- [Business Central API Documentation](https://docs.microsoft.com/dynamics365/business-central/dev-itpro/api-reference/v2.0/)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Azure AD App Registration](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app)

