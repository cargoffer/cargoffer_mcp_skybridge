# Análisis mcp-skybridge — Cambios necesarios para publish en npm

**Fecha:** 2026-07-13  
**Estado:** Código incompleto (no responde a protocolo MCP)  
**Decisión:** Arreglar y publicar `@cargoffer/mcp-skybridge@1.0.0`

## Problema principal

El archivo `app/server/index.js` tiene una clase `McpServer` que:
- Crea `new Server(...)` del SDK
- Asigna `this.server.callTool = this.handleCallTool.bind(this)` y `this.server.listTools = this.listTools.bind(this)` (LÍNEAS 226-227)
- PERO **nunca llama** a `server.setRequestHandler(ListToolsRequestSchema, ...)` ni `server.setRequestHandler(CallToolRequestSchema, ...)`

Resultado: El servidor arranca pero `tools/list` devuelve `{"error":{"code":-32601,"message":"Method not found"}}`.

## Cambios requeridos

### 1. Fix crítico — Registro de handlers MCP (app/server/index.js)
Reemplazar las líneas 226-227 en el constructor:
```javascript
// ELIMINAR:
this.server.callTool = this.handleCallTool.bind(this);
this.server.listTools = this.listTools.bind(this);

// AÑADIR:
this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: this.listTools().tools,
}));
this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  return this.handleCallTool(name, args);
});
```

### 2. Imports correctos (app/server/index.js L8-13)
```javascript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ToolSchema,
} from '@modelcontextprotocol/sdk/types.js';
```
(Quitar `CallToolSchema`, `TextContent` — no existen en v1.27)

### 3. package.json — Limpiar dependencias
Quitar `@skybridge/core`, `@skybridge/devtools`, `nodemon`, `react`, `react-dom`, `vite` (no están en npm público / no necesarios para stdio). Dejar solo `@modelcontextprotocol/sdk`.

### 4. README — Sección API Key (YA HECHO)
Añadida sección "🔑 How to get your API Key (Required)" con funnel a TRANSCEND/Bolsa/eCMR.

### 5. Verificación post-fix
- `npm install` → 0 vulnerabilities
- `npm run build` (si hay tsc) o directo node
- Smoke test: `printf '...' | node app/server/index.js` debe devolver 7 tools en `tools/list`

## Riesgos
- **Bajo:** Sin secretos hardcodeados (verificado)
- **Bajo:** Sin .env commiteado (verificado)
- **Medio:** El código de tools es mock (no llama API real), pero eso es aceptable para v1.0.0 "docs" MCP

## Plan de ejecución (agentes)
- **agy**: Implementar fix #1 y #2 (reescribir constructor + imports)
- **cmd**: Implementar fix #3 (package.json) + verificar build + smoke test
- **CARGOS**: Coordinar, publicar en npm, actualizar cargoffer-zbe-mcp

## RAM monitoring
- Actual: 60% (19GB/32GB)
- Límite: 95% (30GB)
- Estrategia: Ejecutar agy y cmd secuencialmente (no paralelo) para no saturar RAM
- Si RAM > 90%: esperar a que termine una tarea antes de lanzar otra
