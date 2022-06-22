import { Request, Response } from "express";
import app from '../app';

const handler = (req: Request, res: Response) => {
  const handle = app.getRequestHandler()
  return handle(req, res)
};

export default handler;