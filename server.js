const express = require('express');
const server = express();
const projectModelRouter = require('./projectModelRouter');
const actionModelRouter = require('./actionModelRouter');

server.use(express.json());

server.use('/projects', projectModelRouter);
// declared paths for project
server.use('/actions', actionModelRouter);

module.exports = server