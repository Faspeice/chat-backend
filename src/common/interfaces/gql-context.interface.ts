import type { Request, Response } from "express";

export interface GqlContext {
  req: Request;
  res: Response;
  loaders?: Record<string, unknown>;
}