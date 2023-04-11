const io = require( "socket.io" )();
const socketapi = {
    io: io
};

var onlineusernames = [];
var onlineuserids = [];


// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    socket.on("inputname", function(data){
        onlineuserids.push(socket.id);
        onlineusernames.push(data);
        io.emit("online", onlineusernames);
    })
    socket.on("disconnect", function(){
        onlineusernames.splice(onlineuserids.indexOf(socket.id), 1);
        onlineuserids.splice(onlineuserids.indexOf(socket.id), 1);
        io.emit("online", onlineusernames);
    })
    socket.on("msg", function(data){
        io.emit("msg", data);
    })
});
// end of socket.io logic

module.exports = socketapi;