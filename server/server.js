'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Qr = require('qr-image');
const Inert = require('inert');
const fs = require('fs');
const tools = require('./tools');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

server.route({
  method: 'GET',
  path: '/qr_code',
  handler: function (request, reply) {
    let str = request.query.text ? request.query.text : 'ZOO App!';
    let response = reply(Qr.imageSync(str, {type: 'png'}));
    response.variety = 'buffer';
    response.type('image/png');
    return response;
  }
});

server.route({
  method: 'GET',
  path: '/news/{id}',
  handler: function (request, reply) {
    let data = JSON.parse(fs.readFileSync('./data/news.json', 'utf8'));
    let response = null;
    data.forEach(obj => {
      if (obj.id == request.params.id) {
        response = reply(obj);
      }
    });
    if (!response) {
      response = reply('{error:"404 Not Found"}');
      response.statusCode = 404;
    }
    return response;
  }
});

server.route({
  method: 'GET',
  path: '/news',
  handler: function (request, reply) {
    reply.file('./data/news.json').type('application/json');
  }
});

server.route({
  method: 'GET',
  path: '/animals/{id}',
  handler: function (request, reply) {
    let data = JSON.parse(fs.readFileSync('./data/animals.json', 'utf8'));
    let response = null;
    data.forEach(obj => {
      if (obj.id == request.params.id) {
        response = reply(obj);
      }
    });
    if (!response) {
      response = reply('{error:"404 Not Found"}');
      response.statusCode = 404;
    }
    return response;
  }
});

server.route({
  method: 'GET',
  path: '/animals',
  handler: function (request, reply) {
    reply.file('./data/animals.json').type('application/json');
  }
});

server.route({
  method: 'GET',
  path: '/events',
  handler: function (request, reply) {
    let date_from = Date.now();
    if (request.query['date_from']) {
      date_from = request.query['date_from'];
    }
    let date_to = new Date(
      date_from + 14*24*60*60*1000 /* 14 days in ms */
    ).setHours(23,59,59,999);
    let data = JSON.parse(fs.readFileSync('./data/events.json', 'utf8'));

    return reply(tools.get_events_in_dates(data, date_from, date_to));
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
});

server.register(Inert, (err) => {
  if (err) {
    throw err;
  }
});

server.register({
  register: Good,
  options: {
    ops: {
      interval: 1000
    },
    reporters: {
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*' }]
        },
        {
          module: 'good-console'
        },
        'stdout'
      ]
    }
  }
}, (err) => {

  if (err) {
    throw err; // something bad happened loading the plugin
  }
});

server.start((err) => {

  if (err) {
    throw err;
  }
  server.log('info', 'Server running at: ' + server.info.uri);
});
