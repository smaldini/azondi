window.onload = function() {
    var url  = 'ws://127.0.0.1:8083/events/stream/users/michaelklishin?token=41a27093-a564-4012-b796-058ebd94c6c0';
    var sock = new WebSocket(url);
    sock.onopen = function(evt) {
        console.log("Connected to " + url);
    };
    sock.onmessage = function (evt) {
        console.log("Received " + evt.data);
    };
    sock.onclose = function(evt) {
        console.log("Connection with was closed");
    };
};
