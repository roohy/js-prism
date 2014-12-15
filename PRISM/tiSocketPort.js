//This will implement remote port for using in titanium :D

var net = require('net');


var prism = prism || {};
prism.core = prism.core || {};

prism.core.TiSocketPort = function(str,type){
    prism.core.port.call(this,str,type);
    this.HOST = null;
    this.PORT = null;

    this.connection = null;
};

prism.core.TiSocketPort.prototype = Object.create(prism.core.port.prototype);
prism.core.TiSocketPort.prototype.constructor = prism.core.TiSocketPort;

prism.core.TiSocketPort.prototype.isExtensible = function(){ return true;};
prism.core.TiSocketPort.prototype.setConfigs = function(HOST,PORT){
    this.HOST = HOST;
    this.PORT = PORT;
    //this.isPort();
};
prism.core.TiSocketPort.prototype.start = function(){
    if(this.HOST == null || this.PORT == null){
        console.log("RemotePort: cannot start, there is no host or port configure");
        return -1;
    }
    if(this.portType == prism.core.prismConstants.REPLY){
        this.startListning();
    }
    else{
        this.startClient();
    }
};

prism.core.TiSocketPort.prototype.startListning = function(){
    /*this.connection = net.createServer();
    console.log("starting the connection");
    this.connection.listen(this.PORT,this.HOST);
    console.log("connection made",this.connection.address());
    //console.log("Now listening on "+this.connection.address().address +":"+this.connection.address().port);
    this.connection.on("connection",function(sock){
        console.log("CONNECTED TO:"+sock.remoteAddress+":"+sock.remotePort);
        sock.on("data",function(data){
            console.log("Message received on extensible port");
            this.receive(String(data));
            //event = new prism.core.event(data.name,this.parentBrick);


        }.bind(this));
    }.bind(this));*/
    console.log("We currently do not support handsets being listeners\n this program has basic flaws.stop it NOW :D");
};


prism.core.TiSocketPort.prototype.readCallBack = function(){
    if(e.bytesProcessed == -1){
        console.log("reading null buffer on client");
        return;
    }
    try{
        if(e.buffer){
            var data = e.buffer.toString();
            data = JSON.parse(data);
            console.log("parentttt",data);
            var event = new prism.core.event(data.name,this,this.getParentBrick());
            for (var k in data.data){
                event.addParameter(k ,data.data[k] );
                event.eventType = data.eventType;
            }
            this.getParentBrick().add(event);
        }
    }
    catch(e){
        console.log("Problem loading ");
    }
};
prism.core.TiSocketPort.prototype.startClient = function(){
    this.connection = Ti.Network.Socket.createTCP({
        host: this.HOST, port: this.PORT,
        connected : function(e){
            console.log("connected to listener");
            Ti.Stream.pump(e.socket,this.readCallBack , 1024,true);
        }.bind(this)

    });
    this.connection.connect();
    //Ti.Stream.pump()
};

prism.core.TiSocketPort.prototype.handle=function(event){
    if(this.connection == null){
        this.start();
    }
    var data = {type:'event',
        name:event.name,
        data:event.parameters,
        eventType: event.eventType};
    data = JSON.stringify(data);
    Ti.Stream.write(this.connection,Ti.createBuffer({
        value: data
    }));
};
