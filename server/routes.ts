import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  app.get("/api/stats", async (_req, res) => {
    const stats = await storage.getStats();
    res.json(stats);
  });

  app.post("/api/stats", async (req, res) => {
    await storage.updateStats(req.body);
    res.json({ success: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}
