window.onload = function() {
    var url  = 'ws://127.0.0.1:8083/events/stream';
    var sock = new WebSocket(url);
    sock.onopen = function(evt) {
        console.log("Connected to " + url);
    };
    sock.onmessage = function (evt) {
        console.log("Received " + evt.data + " over WebSocket!");
    };
};
