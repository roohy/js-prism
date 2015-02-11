var net = require('net');


var prism = prism || {};
prism.core = prism.core || {};

prism.core.NodeRemotePort = function(str,type){
    prism.core.port.call(this,str,type);
    this.HOST = null;
    this.PORT = null;

    this.connection = null;
    this.connectionList = [];//TODO: write code to manage this list properly
};

prism.core.NodeRemotePort.prototype = Object.create(prism.core.port.prototype);
prism.core.NodeRemotePort.prototype.constructor = prism.core.NodeRemotePort;

prism.core.NodeRemotePort.prototype.isExtensible = function(){ return true;};
prism.core.NodeRemotePort.prototype.setConfigs = function(HOST,PORT){
    this.HOST = HOST;
    this.PORT = PORT;
    //this.isPort();
};
prism.core.NodeRemotePort.prototype.start = function(){
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

prism.core.NodeRemotePort.prototype.startListning = function(){
    this.connection = net.createServer();
    console.log("starting the connection");
    this.connection.listen(this.PORT);
    console.log("connection made",this.connection.address());
    //console.log("Now listening on "+this.connection.address().address +":"+this.connection.address().port);
    this.connection.on("connection",function(sock){
        console.log("CONNECTED TO:"+sock.remoteAddress+":"+sock.remotePort);
        this.connectionList.push(sock);
        sock.on("data",function(data){
            console.log("Message received on extensible port");
            this.receive(String(data));
            //event = new prism.core.event(data.name,this.parentBrick);


        }.bind(this));
    }.bind(this));
};

prism.core.NodeRemotePort.prototype.startClient = function(){

    this.connection = net.connect({port:this.PORT,host: this.HOST},
        function(){
            console.log("CONNECTED TO REMOTE HOST");
        });
    this.connection.on('data',function(data){
        console.log("DATA RECEIVED FROM REMOTE PORT");
        this.receive(data);
    }.bind(this));
};

prism.core.NodeRemotePort.prototype.handle=function(event){
    if(this.connection == null){
        this.start();
    }
    var data = {type:'event',
            name:event.name,
            data:event.parameters,
            eventType: event.eventType};
    data = JSON.stringify(data);
    if(this.portType == prism.core.prismConstants.REPLY){
        for( var i = 0 ; i < this.connectionList.length ; i++){
            this.connectionList[i].write(data);
        }
    }
    else{
        this.connection.write(data);
    }
};

prism.core.NodeRemotePort.prototype.receive = function(data){
    data = JSON.parse(data);
    console.log("parentttt",data);
    var event = new prism.core.event(data.name,this,this.getParentBrick());
    for (var k in data.data){
        event.addParameter(k ,data.data[k] );
        event.eventType = data.eventType;
    }
    this.getParentBrick().add(event);
    //console.log("sensing the event", event);
};