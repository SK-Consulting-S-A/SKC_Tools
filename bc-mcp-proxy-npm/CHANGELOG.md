# Changelog

## [1.0.1] - 2024-12-12

### Fixed
- **Configuration Support**: Updated wrapper to properly read from `appsettings.json` and convert to command-line arguments
- **Documentation**: Corrected configuration format in README, QUICKSTART, and USAGE guides
- **Authentication Errors**: Added comprehensive troubleshooting guide for authentication issues

### Changed
- Wrapper now reads `appsettings.json` and converts to command-line arguments automatically
- Command-line arguments take precedence over `appsettings.json` if both are provided
- Updated `appsettings.example.json` to match the correct format expected by BC MCP Proxy

### Added
- `TROUBLESHOOTING.md` - Comprehensive troubleshooting guide
- Better error messages when configuration is missing
- Support for both configuration file and command-line arguments

## [1.0.0] - 2024-12-12

### Added
- Initial npm package release
- Automatic source download from Microsoft BCTech repository
- Automatic build of C# project
- CLI wrapper for easy execution
- Configuration file support
- Documentation (README, USAGE, QUICKSTART, PUBLISHING)
- Example configuration file

