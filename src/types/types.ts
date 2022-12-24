import { Response } from "express";

export interface SendResourceProps {
  response: Response;
  code?: number;
  resources?: unknown;
  message?: string;
  errors?: Error[];
}

export default interface ResourceType {
  message?: string;
  resources?: unknown;
  errors?: Error[];
}
