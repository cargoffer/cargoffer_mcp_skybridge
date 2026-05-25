# Cargoffer MCP - Skybridge App

<p align="center">
  <strong>Interactive API documentation MCP app for the Cargoffer B2B logistics platform</strong>
</p>

<p align="center">
  <a href="https://docs.cargoffer.com/">Documentation</a> ·
  <a href="https://cargoffer.com/">Website</a> ·
  <a href="https://github.com/cargoffer/cargoffer_mcp_skybridge">GitHub</a>
</p>

---

## About

**Cargoffer MCP** is a [Skybridge](https://skybridge.tech) application that provides **type-safe, interactive API documentation** for the Cargoffer B2B logistics REST API. It enables AI assistants (Claude, ChatGPT, Cursor, Copilot) to explore and query the complete API surface through natural language.

### Keywords

`mcp` `model-context-protocol` `cargoffer` `logistics` `freight` `trucking` `trucks` `transport` `load-board` `carrier` `api-documentation` `openapi` `docs` `spanish` `english` `spain` `portugal` `latam` `b2b` `marketplace`

### Release

![Version](https://img.shields.io/github/v/release/cargoffer/cargoffer_mcp_skybridge?style=flat&label=release)
![Last commit](https://img.shields.io/github/last-commit/cargoffer/cargoffer_mcp_skybridge/main)
![License](https://img.shields.io/github/license/cargoffer/cargoffer_mcp_skybridge)

---

## What is this?

**Cargoffer MCP** is a [Skybridge](https://skybridge.tech) application that provides **type-safe, interactive API documentation** for the Cargoffer B2B logistics REST API. It enables AI assistants (Claude, ChatGPT, Cursor, Copilot) to explore and query the complete API surface through natural language.

### Features

- **Search endpoints** by keyword, tag, module, or locale
- **View detailed endpoint docs** including parameters, request bodies, and responses
- **Explore schemas** with TypeScript inference
- **Navigation by tags** for easy browsing
- **Multi-locale support**: Spanish (es) and English (en)
- **Live documentation** for 239+ API endpoints

### Supported Modules

| Module | Description | Locales |
|--------|------------|--------|
| `company` | Company management, authentication, users | es, en |
| `truckers` | Trucker/carrier management, freight | es, en |
| `vehicle-types` | Vehicle type catalog | es, en |

## Installation

### Prerequisites

- Node.js >= 22.0.0
- pnpm (recommended) or npm

### Quick Install

```bash
# Clone the repository
git clone https://github.com/cargoffer/cargoffer_mcp_skybridge.git
cd cargoffer_mcp_skybridge

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Connect to Claude Desktop

This is a Skybridge app frontend. For the actual MCP server that connects to Cargoffer APIs, use:

**For Cargoffer API Docs (Bolsa de Carga):**
```json
{
  "mcpServers": {
    "cargoffer": {
      "command": "npx",
      "args": ["-y", "@cargoffer/cargo-mcp"]
    }
  }
}
```

Or run from source:
```bash
git clone https://github.com/cargoffer/cargo_mcp.git
cd cargo_mcp && npm install && npm start
```

## Tools Available

### `search_docs`
Search across all Cargoffer API documentation by keywords.

```javascript
{
  query: "authentication",
  module: "company",        // optional
  locale: "es",            // optional: "es" | "en"
  limit: 10                // optional: 1-100
}
```

### `get_endpoint`
Get detailed information about a specific API endpoint.

```javascript
{
  module: "company",
  path: "/company/auth/login",
  method: "POST",
  locale: "es"
}
```

### `list_modules`
List all available API modules with statistics.

```javascript
{
  locale: "es"  // optional
}
```

### `get_navigation`
Get navigation structure organized by tags for a module.

```javascript
{
  module: "company",
  locale: "es"
}
```

### `search_by_tag`
Find all endpoints with a specific tag.

```javascript
{
  tag: "authentication",
  module: "company",  // optional
  locale: "es"       // optional
}
```

### `get_schema`
Retrieve schema definitions for request/response structures.

```javascript
{
  module: "company",
  schemaName: "LoginRequest",
  locale: "es"
}
```

### `list_schemas`
List all available schemas for a module.

```javascript
{
  module: "company",
  locale: "es"
}
```

## API Coverage

### Authentication & Users (company)
- `POST /company/auth/login` - User login
- `POST /company/auth/register` - Company registration
- `POST /company/auth/refresh` - Token refresh
- `GET /company/users/me` - Current user profile
- `PUT /company/users/:id` - Update user
- And 50+ more endpoints

### Truckers & Carriers (truckers)
- `GET /truckers` - List truckers
- `GET /truckers/:id` - Get trucker details
- `POST /truckers/search` - Advanced search
- `GET /truckers/:id/auctions` - Trucker's auctions
- And 100+ more endpoints

### Vehicle Types (vehicle-types)
- `GET /vehicle-types` - List vehicle types
- `GET /vehicle-types/:id` - Get vehicle type
- `GET /vehicle-types/:id/pricing` - Pricing by zone
- And 80+ more endpoints

## Use Cases

### For AI Assistants

This MCP enables AI assistants to:
1. **Help with integration** - Find the right endpoint for a given use case
2. **Explain API contracts** - Show schema structures for request/response
3. **Generate code examples** - Reference endpoint definitions
4. **Debug integration issues** - Compare expected vs actual schemas
5. **Explore available features** - Navigate by tags or modules

### For Developers

- **Interactive documentation** in Claude, ChatGPT, or other MCP clients
- **Type-safe exploration** with automatic TypeScript inference
- **Offline-capable** - Bundle the documentation for local use

## Deployment

### Production Build

```bash
pnpm build
pnpm start
```

### Environment Variables

```bash
# Optional: Custom port (default: 3000)
PORT=3000

# Optional: Enable.debug mode
DEBUG=false
```

## Documentation

- [Cargoffer API Docs](https://docs.cargoffer.com/) - Full API reference
- [Skybridge Framework](https://docs.skybridge.tech) - Framework documentation
- [Model Context Protocol](https://modelcontextprotocol.io/) - MCP specification

## Tech Stack

- [Skybridge](https://skybridge.tech) - MCP Apps framework
- [React](https://react.dev) - UI components
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev) - Build tool

## License

ISC - Cargoffer Team

## Support

- Issues: [GitHub Issues](https://github.com/cargoffer/cargoffer_mcp_skybridge/issues)
- Email: developers@cargoffer.com
- Website: https://cargoffer.com/