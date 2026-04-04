#!/usr/bin/env node
/**
 * FlexOffers MCP Server
 * Exposes FlexOffers v3 API tools for use in Claude Desktop, Cursor, Windsurf, or OpenClaw.
 *
 * Usage:
 *   FLEXOFFERS_API_KEY=xxx node dist/index.js
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { foGet, foPost } from "./client.js";
import { TOOLS } from "./tools.js";
import { handleTool } from "./handlers.js";

const server = new Server(
  { name: "flexoffers-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// List tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS,
}));

// Call tool
server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;
  try {
    const result = await handleTool(name, args ?? {}, { foGet, foPost });
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      content: [{ type: "text", text: `Error: ${message}` }],
      isError: true,
    };
  }
});

// Start
const transport = new StdioServerTransport();
await server.connect(transport);
