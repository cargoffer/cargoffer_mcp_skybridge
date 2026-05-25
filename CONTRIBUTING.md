# Contributing to Cargo MCP Skybridge

## Development Setup

```bash
# Clone the repository
git clone https://github.com/cargoffer/cargo-mcp-skybridge.git
cd cargo-mcp-skybridge

# Install dependencies
pnpm install

# Start development
pnpm dev
```

## Adding New Endpoints

1. Update `DOCS_DATA.searchIndex` in `app/server/index.js`
2. Add endpoint object with:
   - path, method, module, locale, tags, summary

## Adding New Tools

1. Define tool in `listTools()` method
2. Implement handler in `handleCallTool()` method
3. Update this README with new tool documentation

## Testing

Connect to Claude Desktop with:
```json
{
  "mcpServers": {
    "cargoffer": {
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

## Code Review Guidelines

- Use meaningful summaries for endpoints
- Keep search index updated
- Test all new tools manually
- Update documentation (README, llms.txt)