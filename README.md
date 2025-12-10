# SKC Extension App

Applies a preset VS Code setup for SKC: user settings, MCP servers, and required extensions.

## What’s included
- `presets/settings.json`: user settings applied to User scope.
- `presets/mcp.json`: MCP servers written to `mcp.servers` (if non-empty); secrets are injected from VS Code secret storage.
- `presets/extensions.json`: extension IDs to install.

## How to use
1) Install the VSIX (or load in dev).
2) Run “SKC: Configure MCP Auth” to store your GitHub token and Context7 API key in VS Code secrets.
3) Run “SKC: Apply Presets” (or rely on auto-run at first activation) to install extensions and apply settings/MCP servers.

## Config knobs (Settings → skc.*)
- `applyOnStartup` (default true): auto-run once.
- `skipInstalledExtensions` (default true): skip already installed extensions.
- `dryRun` (default false): log only, no writes.
- `presetFilePath` (default `presets/settings.json`), `mcpFilePath` (default `presets/mcp.json`), `extensionsFilePath` (default `presets/extensions.json`); paths resolve from workspace or the bundled extension folder.

## Build & package
- Install deps: `npm install`
- Build: `npm run compile`
- Package VSIX: `npx vsce package`

