/**
 * Cargoffer MCP Server
 * 
 * Skybridge MCP App for Cargoffer B2B Logistics API Documentation
 * Provides interactive API docs for freight, trucking and logistics
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ToolSchema,
} from '@modelcontextprotocol/sdk/types.js';

/**
 * Documentation data (in production, load from OpenAPI specs)
 */
const DOCS_DATA = {
  modules: {
    company: {
      title: 'Company API',
      version: '1.0.0',
      locale: ['es', 'en'],
      endpointCount: 52,
      tags: ['authentication', 'users', 'billing', 'addresses', 'contacts']
    },
    truckers: {
      title: 'Truckers API', 
      version: '1.0.0',
      locale: ['es', 'en'],
      endpointCount: 103,
      tags: ['search', 'auctions', 'offers', 'contracts']
    },
    'vehicle-types': {
      title: 'Vehicle Types API',
      version: '1.0.0',
      locale: ['es', 'en'],
      endpointCount: 84,
      tags: ['pricing', 'specifications', 'compatibility']
    }
  },
  // Simplified search index
  searchIndex: [
    // Authentication
    { path: '/company/auth/login', method: 'POST', module: 'company', locale: 'es', tags: ['authentication'], summary: 'Iniciar sesión de usuario' },
    { path: '/company/auth/register', method: 'POST', module: 'company', locale: 'es', tags: ['authentication'], summary: 'Registrar nueva empresa' },
    { path: '/company/auth/refresh', method: 'POST', module: 'company', locale: 'es', tags: ['authentication'], summary: 'Refrescar token de acceso' },
    { path: '/company/auth/logout', method: 'POST', module: 'company', locale: 'es', tags: ['authentication'], summary: 'Cerrar sesión' },
    { path: '/company/auth/forgot-password', method: 'POST', module: 'company', locale: 'es', tags: ['authentication'], summary: 'Recuperar contraseña' },
    { path: '/company/auth/reset-password', method: 'POST', module: 'company', locale: 'es', tags: ['authentication'], summary: 'Restablecer contraseña' },
    
    // Users
    { path: '/company/users/me', method: 'GET', module: 'company', locale: 'es', tags: ['users'], summary: 'Obtener usuario actual' },
    { path: '/company/users/:id', method: 'GET', module: 'company', locale: 'es', tags: ['users'], summary: 'Obtener usuario por ID' },
    { path: '/company/users', method: 'GET', module: 'company', locale: 'es', tags: ['users'], summary: 'Listar usuarios' },
    { path: '/company/users/:id', method: 'PUT', module: 'company', locale: 'es', tags: ['users'], summary: 'Actualizar usuario' },
    { path: '/company/users/:id', method: 'DELETE', module: 'company', locale: 'es', tags: ['users'], summary: 'Eliminar usuario' },
    
    // Addresses
    { path: '/company/addresses', method: 'GET', module: 'company', locale: 'es', tags: ['addresses'], summary: 'Listar direcciones' },
    { path: '/company/addresses', method: 'POST', module: 'company', locale: 'es', tags: ['addresses'], summary: 'Crear dirección' },
    { path: '/company/addresses/:id', method: 'GET', module: 'company', locale: 'es', tags: ['addresses'], summary: 'Obtener dirección' },
    { path: '/company/addresses/:id', method: 'PUT', module: 'company', locale: 'es', tags: ['addresses'], summary: 'Actualizar dirección' },
    { path: '/company/addresses/:id', method: 'DELETE', module: 'company', locale: 'es', tags: ['addresses'], summary: 'Eliminar dirección' },
    
    // Billing
    { path: '/company/billing/invoices', method: 'GET', module: 'company', locale: 'es', tags: ['billing'], summary: 'Listar facturas' },
    { path: '/company/billing/invoices', method: 'POST', module: 'company', locale: 'es', tags: ['billing'], summary: 'Crear factura' },
    { path: '/company/billing/invoices/:id', method: 'GET', module: 'company', locale: 'es', tags: ['billing'], summary: 'Obtener factura' },
    { path: '/company/billing/subscriptions', method: 'GET', module: 'company', locale: 'es', tags: ['billing'], summary: 'Listar suscripciones' },
    { path: '/company/billing/subscriptions', method: 'POST', module: 'company', locale: 'es', tags: ['billing'], summary: 'Crear suscripción' },
    
    // Truckers
    { path: '/truckers', method: 'GET', module: 'truckers', locale: 'es', tags: ['search'], summary: 'Buscar Transportistas' },
    { path: '/truckers/:id', method: 'GET', module: 'truckers', locale: 'es', tags: ['search'], summary: 'Obtener transportista' },
    { path: '/truckers/search', method: 'POST', module: 'truckers', locale: 'es', tags: ['search'], summary: 'Búsqueda avanzda de transportistas' },
    { path: '/truckers/:id/auctions', method: 'GET', module: 'truckers', locale: 'es', tags: ['auctions'], summary: 'Subastas del transportista' },
    { path: '/truckers/:id/offers', method: 'GET', module: 'truckers', locale: 'es', tags: ['offers'], summary: 'Ofertas del transportista' },
    { path: '/truckers/:id/contracts', method: 'GET', module: 'truckers', locale: 'es', tags: ['contracts'], summary: 'Contratos del transportista' },
    { path: '/truckers/featured', method: 'GET', module: 'truckers', locale: 'es', tags: ['search'], summary: 'Transportistas destacados' },
    { path: '/truckers/nearby', method: 'GET', module: 'truckers', locale: 'es', tags: ['search'], summary: 'Transportistas cercanos' },
    
    // Auctions
    { path: '/auctions', method: 'GET', module: 'truckers', locale: 'es', tags: ['auctions'], summary: 'Listar	subastas' },
    { path: '/auctions/:id', method: 'GET', module: 'truckers', locale: 'es', tags: ['auctions'], summary: 'Obtener subasta' },
    { path: '/auctions', method: 'POST', module: 'truckers', locale: 'es', tags: ['auctions'], summary: 'Crear	subasta' },
    { path: '/auctions/:id/bids', method: 'GET', module: 'truckers', locale: 'es', tags: ['auctions'], summary: 'Ofertas de subasta' },
    { path: '/auctions/:id/bids', method: 'POST', module: 'truckers', locale: 'es', tags: ['auctions'], summary: 'Nueva oferta en subasta' },
    { path: '/auctions/:id/award', method: 'POST', module: 'truckers', locale: 'es', tags: ['auctions'], summary: 'Adjudicar	subasta' },
    
    // Vehicle Types
    { path: '/vehicle-types', method: 'GET', module: 'vehicle-types', locale: 'es', tags: ['specifications'], summary: 'Listar tipos de vehículo' },
    { path: '/vehicle-types/:id', method: 'GET', module: 'vehicle-types', locale: 'es', tags: ['specifications'], summary: 'Obtener tipo de vehículo' },
    { path: '/vehicle-types/:id/pricing', method: 'GET', module: 'vehicle-types', locale: 'es', tags: ['pricing'], summary: 'Precios por zona' },
    { path: '/vehicle-types/compatible', method: 'GET', module: 'vehicle-types', locale: 'es', tags: ['compatibility'], summary: 'Vehículos compatibles' },
  ]
};

/**
 * Search documentation
 */
function searchDocs(query, filters = {}) {
  const results = DOCS_DATA.searchIndex.filter(item => {
    const matchesQuery = !query || 
      item.path.toLowerCase().includes(query.toLowerCase()) ||
      item.summary?.toLowerCase().includes(query.toLowerCase()) ||
      item.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()));
    
    const matchesModule = !filters.module || item.module === filters.module;
    const matchesLocale = !filters.locale || item.locale === filters.locale;
    const matchesTag = !filters.tag || item.tags?.includes(filters.tag);
    
    return matchesQuery && matchesModule && matchesLocale && matchesTag;
  });
  
  return results.slice(0, filters.limit || 10);
}

/**
 * Format search results for display
 */
function formatSearchResults(query, results) {
  if (results.length === 0) {
    return `No results found for "${query}".\n\nTry:\n- Different keywords\n- Broader terms\n- Check spelling`;
  }

  let text = `# Search Results for "${query}"\n\nFound ${results.length} result(s)\n\n`;
  
  for (const item of results) {
    text += `## ${item.method} ${item.path}\n`;
    text += `- **Module:** ${item.module} | **Locale:** ${item.locale}\n`;
    if (item.summary) text += `- **Summary:** ${item.summary}\n`;
    if (item.tags?.length) text += `- **Tags:** ${item.tags.join(', ')}\n`;
    text += '\n';
  }
  
  return text;
}

/**
 * Format endpoint details
 */
function formatEndpoint(endpoint) {
  let text = `## ${endpoint.method} ${endpoint.path}\n\n`;
  text += `**Module:** ${endpoint.module} | **Locale:** ${endpoint.locale}\n\n`;
  
  if (endpoint.summary) text += `**Summary:** ${endpoint.summary}\n\n`;
  if (endpoint.tags?.length) text += `**Tags:** ${endpoint.tags.join(', ')}\n\n`;
  
  text += `---\n\n`;
  text += `### Parameters\n\n`;
  text += `_(See full API docs for parameter details)_\n\n`;
  
  return text;
}

/**
 * Format module list
 */
function formatModules(locale) {
  const modules = Object.entries(DOCS_DATA.modules)
    .filter(([, m]) => !locale || m.locale.includes(locale));
  
  let text = `# Cargoffer API Modules\n\n`;
  
  for (const [key, mod] of modules) {
    text += `## ${mod.title}\n`;
    text += `- **ID:** ${key}\n`;
    text += `- **Version:** ${mod.version}\n`;
    text += `- **Endpoints:** ${mod.endpointCount}\n`;
    text += `- **Locales:** ${mod.locale.join(', ')}\n`;
    text += `- **Tags:** ${mod.tags.join(', ')}\n\n`;
  }
  
  return text;
}

/**
 * Format navigation by tags
 */
function formatNavigation(moduleName, locale) {
  const moduleData = DOCS_DATA.modules[moduleName];
  if (!moduleData) return `Module "${moduleName}" not found`;
  
  const endpoints = DOCS_DATA.searchIndex.filter(
    e => e.module === moduleName && (!locale || e.locale === locale)
  );
  
  // Group by tags
  const byTag = {};
  for (const ep of endpoints) {
    for (const tag of ep.tags) {
      if (!byTag[tag]) byTag[tag] = [];
      byTag[tag].push(ep);
    }
  }
  
  let text = `# Navigation: ${moduleName} (${locale || 'all'})\n\n`;
  
  for (const [tag, eps] of Object.entries(byTag)) {
    text += `## ${tag}\n`;
    for (const ep of eps) {
      text += `- **${ep.method}** \`${ep.path}\` — ${ep.summary}\n`;
    }
    text += '\n';
  }
  
  return text;
}

// MCPServer class from Skybridge framework
class Mcpserver {
  constructor() {
    this.server = new Server(
      {
        name: 'cargo-mcp-skybridge',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );
    
    // Define tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return this.listTools();
    });
    
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      return this.handleCallTool(request.params.name, request.params.arguments);
    });
  }
  
  /**
   * List available tools
   */
  listTools() {
    return {
      tools: [
        {
          name: 'search_docs',
          description: 'Search across all Cargoffer API documentation. Use this to find relevant API endpoints based on keywords like "authentication", "address", "user", "invoice", "trucker", "vehicle", etc.',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Search query (e.g., "authentication", "create user", "login", "invoice")',
              },
              module: {
                type: 'string',
                description: 'Filter by module',
                enum: ['company', 'truckers', 'vehicle-types'],
              },
              locale: {
                type: 'string',
                description: 'Filter by locale (es=Spanish, en=English)',
                enum: ['es', 'en'],
              },
              limit: {
                type: 'number',
                description: 'Maximum number of results (1-100)',
                default: 10,
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'get_endpoint',
          description: 'Get detailed information about a specific API endpoint including parameters, request body, and responses.',
          inputSchema: {
            type: 'object',
            properties: {
              module: {
                type: 'string',
                description: 'Module name',
                enum: ['company', 'truckers', 'vehicle-types'],
              },
              path: {
                type: 'string',
                description: 'Endpoint path (e.g., /company/auth/login)',
              },
              method: {
                type: 'string',
                description: 'HTTP method',
                enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
              },
              locale: {
                type: 'string',
                description: 'Locale',
                enum: ['es', 'en'],
              },
            },
            required: ['module', 'path', 'method', 'locale'],
          },
        },
        {
          name: 'list_modules',
          description: 'List all available API modules with statistics about endpoints and documentation.',
          inputSchema: {
            type: 'object',
            properties: {
              locale: {
                type: 'string',
                description: 'Filter by locale',
                enum: ['es', 'en'],
              },
            },
          },
        },
        {
          name: 'get_navigation',
          description: 'Get the complete navigation structure for a module, organized by tags. Useful for exploring all endpoints in a module.',
          inputSchema: {
            type: 'object',
            properties: {
              module: {
                type: 'string',
                description: 'Module name',
                enum: ['company', 'truckers', 'vehicle-types'],
              },
              locale: {
                type: 'string',
                description: 'Locale',
                enum: ['es', 'en'],
              },
            },
            required: ['module', 'locale'],
          },
        },
        {
          name: 'search_by_tag',
          description: 'Find all endpoints that have a specific tag. Tags group related endpoints together.',
          inputSchema: {
            type: 'object',
            properties: {
              tag: {
                type: 'string',
                description: 'Tag name to search for (e.g., "authentication", "users", "billing", "auctions")',
              },
              module: {
                type: 'string',
                description: 'Filter by module',
                enum: ['company', 'truckers', 'vehicle-types'],
              },
              locale: {
                type: 'string',
                description: 'Filter by locale',
                enum: ['es', 'en'],
              },
            },
            required: ['tag'],
          },
        },
        {
          name: 'get_schema',
          description: 'Get a specific schema definition from the OpenAPI spec. Useful for understanding request/response data structures.',
          inputSchema: {
            type: 'object',
            properties: {
              module: {
                type: 'string',
                description: 'Module name',
                enum: ['company', 'truckers', 'vehicle-types'],
              },
              schemaName: {
                type: 'string',
                description: 'Schema name (e.g., LoginRequest, Address, User, Invoice, Trucker)',
              },
              locale: {
                type: 'string',
                description: 'Locale',
                enum: ['es', 'en'],
              },
            },
            required: ['module', 'schemaName', 'locale'],
          },
        },
        {
          name: 'list_schemas',
          description: 'List all available schemas for a module and locale.',
          inputSchema: {
            type: 'object',
            properties: {
              module: {
                type: 'string',
                description: 'Module name',
                enum: ['company', 'truckers', 'vehicle-types'],
              },
              locale: {
                type: 'string',
                description: 'Locale',
                enum: ['es', 'en'],
              },
            },
            required: ['module', 'locale'],
          },
        },
      ],
    };
  }
  
  /**
   * Handle tool calls
   */
  async handleCallTool(name, args) {
    try {
      switch (name) {
        case 'search_docs': {
          const results = searchDocs(args.query, {
            module: args.module,
            locale: args.locale,
            limit: args.limit
          });
          
          return {
            content: [{
              type: 'text',
              text: formatSearchResults(args.query, results)
            }]
          };
        }
        
        case 'get_endpoint': {
          const endpoint = DOCS_DATA.searchIndex.find(
            e => e.path === args.path && 
                 e.method === args.method && 
                 e.module === args.module &&
                 e.locale === args.locale
          );
          
          if (!endpoint) {
            return {
              content: [{
                type: 'text',
                text: `Endpoint not found: ${args.method} ${args.path} in module ${args.module} (${args.locale})`
              }]
            };
          }
          
          return {
            content: [{
              type: 'text',
              text: formatEndpoint(endpoint)
            }]
          };
        }
        
        case 'list_modules': {
          return {
            content: [{
              type: 'text',
              text: formatModules(args.locale)
            }]
          };
        }
        
        case 'get_navigation': {
          return {
            content: [{
              type: 'text',
              text: formatNavigation(args.module, args.locale)
            }]
          };
        }
        
        case 'search_by_tag': {
          const results = searchDocs('', {
            module: args.module,
            locale: args.locale,
            tag: args.tag
          });
          
          let text = `# Endpoints with tag "${args.tag}"\n\nFound ${results.length} endpoint(s)\n\n`;
          
          for (const ep of results) {
            text += `### ${ep.method} ${ep.path}\n`;
            text += `- **Module:** ${ep.module} | **Locale:** ${ep.locale}\n`;
            if (ep.summary) text += `- **Summary:** ${ep.summary}\n`;
            text += '\n';
          }
          
          return { content: [{ type: 'text', text }] };
        }
        
        case 'get_schema': {
          // Simplified schema response
          const schemas = {
            'company': {
              'LoginRequest': { email: 'string', password: 'string' },
              'LoginResponse': { token: 'string', refreshToken: 'string', expiresIn: 'number', user: 'User' },
              'User': { id: 'string', email: 'string', name: 'string', role: 'string' },
              'Address': { id: 'string', street: 'string', city: 'string', postalCode: 'string', country: 'string' },
              'Invoice': { id: 'string', number: 'string', amount: 'number', currency: 'string', status: 'string' }
            },
            'truckers': {
              'Trucker': { id: 'string', name: 'string', rating: 'number', verified: 'boolean' },
              'Auction': { id: 'string', origin: 'string', destination: 'string', status: 'string', bids: 'Bid[]' },
              'Bid': { id: 'string', amount: 'number', truckerId: 'string', createdAt: 'datetime' }
            },
            'vehicle-types': {
              'VehicleType': { id: 'string', name: 'string', capacity: 'number', dimensions: 'Dimensions' },
              'Dimensions': { length: 'number', width: 'number', height: 'number' }
            }
          };
          
          const schema = schemas[args.module]?.[args.schemaName];
          
          if (!schema) {
            return {
              content: [{
                type: 'text',
                text: `Schema "${args.schemaName}" not found in module ${args.module}`
              }]
            };
          }
          
          return {
            content: [{
              type: 'text',
              text: `## Schema: ${args.schemaName} (${args.module}/${args.locale})\n\n\`\`\`json\n${JSON.stringify(schema, null, 2)}\n\`\`\``
            }]
          };
        }
        
        case 'list_schemas': {
          const schemaList = {
            'company': ['LoginRequest', 'LoginResponse', 'User', 'Address', 'Invoice', 'Company'],
            'truckers': ['Trucker', 'Auction', 'Bid', 'Contract', 'Offer'],
            'vehicle-types': ['VehicleType', 'Dimensions', 'Pricing', 'Compatibility']
          };
          
          const moduleschemas = schemaList[args.module] || [];
          
          return {
            content: [{
              type: 'text',
              text: `# Schemas in ${args.module} (${args.locale})\n\nFound ${moduleschemas.length} schema(s)\n\n` +
                    moduleschemas.map(s => `- \`${s}\``).join('\n')
            }]
          };
        }
        
        default:
          return {
            content: [{
              type: 'text',
              text: `Unknown tool: ${name}`
            }],
            isError: true
          };
      }
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Error executing tool ${name}: ${error.message}`
        }],
        isError: true
      };
    }
  }
  
  /**
   * Run the server
   */
  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Cargoffer MCP Server running on stdio');
  }
}

// Start server if run directly
const server = new Mcpserver();
server.run().catch(console.error);

export default Mcpserver;