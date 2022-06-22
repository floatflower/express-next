import express, { Express, json, Request, Response } from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import app from './app';
dotenv.config();

import defaultRoute from './routes/default';

const port = parseInt(process.env.PORT || '3000', 10);

app.prepare().then(() => {
  const server: Express = express()
  const http = require('http');
  const httpServer = http.createServer(server);
  const io = new Server(httpServer);
  server.get('*', defaultRoute)

  io.on('connection', socket => {
    console.log('connection created.');
  })

  httpServer.listen(port, () => {
    console.log(`> Listening on port: ${port}`)
  })
})