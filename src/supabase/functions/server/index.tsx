import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-dbb49771/health", (c) => {
  return c.json({ status: "ok" });
});

// Sovereign Routes
app.get("/make-server-dbb49771/sovereign/stats", async (c) => {
  try {
    const kvResult = await kv.get("sovereign:count");
    const kvCount = typeof kvResult === 'number' ? kvResult : 0;
    
    // Time-based organic growth simulation to ensure the count rises daily
    // We anchor this to a date in the "past" relative to the current moment
    // Using Dec 1, 2025 as the start of the "final intake" phase
    const GENESIS_DATE = new Date('2025-12-01T00:00:00Z').getTime(); 
    const now = Date.now();
    const daysSinceGenesis = Math.max(0, (now - GENESIS_DATE) / (1000 * 60 * 60 * 24));
    
    // Growth algorithm: ~3-4 new initiates per day
    const organicGrowth = Math.floor(daysSinceGenesis * 3.8); 
    
    const baseCount = 1420;
    const computedCount = baseCount + organicGrowth;
    
    // Use the higher of KV (real increments) or Computed (time simulation)
    let finalCount = Math.max(kvCount, computedCount);
    
    // Strict Cap at 1,881
    if (finalCount >= 1881) finalCount = 1881;

    // Optional: Sync back to KV if computed pushed it higher, so it persists
    if (finalCount > kvCount) {
       await kv.set("sovereign:count", finalCount);
    }

    return c.json({ count: finalCount });
  } catch (e) {
    console.error(e);
    return c.json({ count: 1444 }); // Fallback slightly higher than base
  }
});

app.post("/make-server-dbb49771/sovereign/increment", async (c) => {
  try {
    let count = await kv.get("sovereign:count");
    count = (typeof count === 'number' ? count : 1420) + 1;
    if (count > 1881) count = 1881;
    await kv.set("sovereign:count", count);
    return c.json({ count });
  } catch (e) {
    console.error(e);
    return c.json({ error: String(e) }, 500);
  }
});

app.post("/make-server-dbb49771/sovereign/contact", async (c) => {
  try {
    const data = await c.req.json();
    
    // Support both old and new schema during migration
    const alias = data.alias || data.designation;
    const contact = data.contact || data.email;
    const intent = data.intent || data.mandate;

    if (!alias || !contact) {
      return c.json({ error: "Missing required fields (Identity/Vector)" }, 400);
    }

    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    
    // Store full object
    await kv.set(`sovereign:contact:${id}`, {
      id,
      timestamp,
      ...data // Store everything sent
    });

    return c.json({ success: true, id });
  } catch (e) {
    console.error(e);
    return c.json({ error: String(e) }, 500);
  }
});

Deno.serve(app.fetch);