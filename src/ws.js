function connect(address) {
  var ws = new WebSocket(address);
  ws.onopen = function() {
    console.log('Connected');
    ws.send("Hello, world");
  };
  ws.onclose = function() {
    console.log('Socket closed');
    window.setTimeout(function() {
      console.log('Reconnecting');
      connect();
    }, 1000);
  };
  return ws;
}

module.exports = connect;
