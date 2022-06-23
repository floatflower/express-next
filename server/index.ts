import express, { Express, json, Request, Response } from 'express';
import { Server } from 'socket.io';
import { Liquid } from 'liquidjs';
import dotenv from 'dotenv';
import app from './app';
import path from 'path';
dotenv.config();

import defaultRoute from './routes/default';
import renderRoute from './routes/render';

const port = parseInt(process.env.PORT || '3000', 10);

app.prepare().then(() => {
  const engine = new Liquid();
  const server: Express = express()

  server.engine('liquid', engine.express()); 
  server.set('views', path.join(__dirname, './views'));            // specify the views directory
  server.set('view engine', 'liquid'); 

  const http = require('http');
  const httpServer = http.createServer(server);
  const io = new Server(httpServer);
  server.get('/render', renderRoute)
  server.get('*', defaultRoute)

  io.on('connection', socket => {
    console.log('connection created.');
  })

  httpServer.listen(port, () => {
    console.log(`> Listening on port: ${port}`)
  })
})