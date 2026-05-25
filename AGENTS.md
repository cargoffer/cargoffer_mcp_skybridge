# AGENTS.md - Cargo MCP Skybridge

## Project Overview

This is a **Skybridge MCP App** that provides interactive API documentation for the Cargoffer B2B logistics platform.

## Commands

- **`pnpm dev`** - Start development server
- **`pnpm build`** - Build for production
- **`pnpm start`** - Run production server

## Architecture

```
app/
├── server/
│   └── index.js      # MCP server with tools definition
└── views/
    └── index.js     # UI components (optional)
```

## Adding New Tools

1. Define tool in `app/server/index.js` listTools()
2. Implement handler in handleCallTool()
3. Add search index entries in DOCS_DATA

## Documentation

- Full API docs: https://docs.cargoffer.com/
- Skybridge framework: https://docs.skybridge.tech/

## Code Style

- **Format**: 2 spaces, single quotes
- **Naming**: camelCase (functions), PascalCase (classes)
- **Types**: TypeScript (recommended), JSDoc for documentation

## Testing

Manual testing via Claude Desktop or any MCP client:

```json
{
  "mcpServers": {
    "cargoffer": {
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

## Dependencies

- @modelcontextprotocol/sdk >= 1.27.0
- @skybridge/core >= 1.0.0
- node >= 22.0.0