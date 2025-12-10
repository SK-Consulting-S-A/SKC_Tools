/**
 * Central place to define the SKC presets.
 * - SETTINGS_PRESET is applied to user settings (ConfigurationTarget.Global).
 * - EXTENSION_IDS are installed if missing.
 *
 * Update SETTINGS_PRESET when you want to push new defaults (e.g., MCP servers).
 */

export const SETTINGS_PRESET: Record<string, unknown> = {
  // MCP servers (placeholder — replace with your real server config)
  "mcp.servers": [
    {
      id: "skc-default",
      command: "python",
      args: ["-m", "my_mcp_server"],
      env: {}
    }
  ]
};

/**
 * Marketplace extension identifiers to ensure are installed.
 * Kept empty here so the list comes from presets/extensions.json.
 */
export const EXTENSION_IDS: string[] = [];

