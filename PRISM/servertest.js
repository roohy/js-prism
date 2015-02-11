var net = require('net');
/*
connection = net.createServer();
console.log("starting the connection");
connection.listen(6969,'0.0.0.0');
console.log("connection made",connection.address());
//console.log("Now listening on "+this.connection.address().address +":"+this.connection.address().port);
connection.on("connection",function(sock){
    console.log("CONNECTED TO:"+sock.remoteAddress+":"+sock.remotePort);
    sock.on("data",function(data){
        console.log("Message received on extensible port",data);

        //event = new prism.core.event(data.name,this.parentBrick);


    });
});
*/

connection = new net.Socket();
connection.connect(6969,'162.243.153.53',function(){ //162.243.153.53
    console.log("CONNECTED TO REMOTE HOST");
});
connection.on('data',function(){
    console.log("DATA RECEIVED FROM REMOTE PORT");
});

connection.write("hahahaha");