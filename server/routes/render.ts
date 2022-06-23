import { Request, Response } from "express";
import app from '../app';

const handler = (req: Request, res: Response) => {
  console.log('adds');
  res.render('example.liquid')
};

export default handler;