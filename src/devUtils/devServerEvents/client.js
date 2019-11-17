
function tryAfterSomeTime (fn) {
  return () => setTimeout(fn, 1000);
}

function createPingConnection () {
  var socket = new WebSocket('ws://localhost:3001');
  
  socket.addEventListener('open', () => {
    window.location.reload();
  });

  function reconnect() {
    socket.removeEventListener('close', reconnect);
    socket.removeEventListener('error', reconnect);
    socket && socket.close();
    socket = null;
    setTimeout(createPingConnection, 2000);
  }

  socket.addEventListener('close', reconnect);
  socket.addEventListener('error', reconnect);
}

function createLiveReloadConnection() {
  console.log('DEV SERVER EVENT: try new connection');

  var socket = new WebSocket('ws://localhost:3001');
  socket.addEventListener('message', (event) => {
    if(event.data === 'reload') {
      window.location.reload();
    }
  });

  function reconnect () {
    socket.removeEventListener('close', reconnect);
    socket.removeEventListener('error', reconnect);
    socket && socket.close();
    socket = null;
    console.log('DEV SERVER EVENT: waiting for backend restart');
    createPingConnection();
  }

  socket.addEventListener('close', reconnect);
  socket.addEventListener('error', reconnect);
}

createLiveReloadConnection();