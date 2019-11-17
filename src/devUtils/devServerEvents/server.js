const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');
const debounce = require('lodash/debounce');
 
const wss = new WebSocket.Server({ port: 3001 });


fs.watch(path.resolve(__dirname, '../../frontend/views'), debounce(reloadedBroadcast, 300));

function reloadedBroadcast () {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send('reload');
    }
  });
}

wss.on('connection', function connection(ws) {

});