var net = require('net');

var fs = require('fs');

// file is included here:
eval(fs.readFileSync('prism.js')+'');
eval(fs.readFileSync('PrismConstants.js')+'');
eval(fs.readFileSync('scaffold.js')+'');

eval(fs.readFileSync('scheduler.js')+'');
eval(fs.readFileSync('event.js')+'');
eval(fs.readFileSync('architecture.js')+'');
eval(fs.readFileSync('port.js')+'');
eval(fs.readFileSync('nodeSocketPort.js')+'');
eval(fs.readFileSync('component.js')+'');
eval(fs.readFileSync('WorkerThreads.js')+'');

eval(fs.readFileSync('abstractImplementation.js')+'');
eval(fs.readFileSync('roundRobinDispatcher.js')+'');
eval(fs.readFileSync('FIFOScheduler.js')+'');

eval(fs.readFileSync('connector.js')+'');


Server = function(){
    prism.core.abstractImplementation.call(this);


};
Server.prototype = Object.create(prism.core.abstractImplementation.prototype);
Server.prototype.constructor = Server;

Client = function(){
    prism.core.abstractImplementation.call(this);
};
Client.prototype = Object.create(prism.core.abstractImplementation.prototype);
Client.prototype.constructor = Client;


Client.prototype.sendMessage=function(){
    //console.log("it is not about prism. It is about sending a message >:)")
    var event = new prism.core.event("Message");
    console.log("sending the message from clinet side");
    event.addParameter("Value","I am Made by roohy and Yixue :D ");
    event.eventType = prism.core.prismConstants.REQUEST;
    //console.log("event in sendMessage",event);
    this.send(event);
};
Client.prototype.handle = function(event){
    console.log('I am handling it on client side, ', event.getParameter('Value'));
}

Server.prototype.handle = function(event){
    console.log("On server Side, we have got a message",event.getParameter('Value'));
    var event2 = new prism.core.event("Message");
    event2.addParameter("Value", "We are good here");
    event2.eventType = prism.core.prismConstants.REPLY;
    this.send(event2);

}
/*
 console.log('Hi, First Test for Prism... ');
 console.log('Initializing an instance of The Brick Class...');
 brick1 = new prism.core.brick();
 console.log('Initialized Brick, Now initializing an Architecture....');
 arch1 = new prism.core.architecture('Arch-1');
 console.log('Initialized the arch1.'+arch1+" the name is "+arch1.name);
 */
var scf = new prism.core.scaffold();
var fifo = new prism.core.FIFOScheduler(100);
var roundRobin = new prism.core.roundRobinDispatcher(fifo,2);
scf.dispatcher = roundRobin;
scf.scheduler = fifo;

var arch = new prism.core.architecture("clientServer");
arch.scaffold = scf;

var serverBehavior = new Server();

var serverComp = new prism.core.component("server",serverBehavior);
serverComp.scaffold = scf;

var clientBehavoir = new Client();
var clientComp = new prism.core.component("Client",clientBehavoir);
clientComp.scaffold = scf;

//console.log("calling to add components to arch", arch);
arch.add(clientComp);
arch.add(serverComp);

/*var clientRequestPort = new prism.core.port("Client request Port"  ,prism.core.prismConstants.REQUEST);
clientComp.addCompPort(clientRequestPort);*/
var clientRequestPort = new prism.core.NodeRemotePort("CLient Request Port",prism.core.prismConstants.REQUEST);
clientComp.addCompPort(clientRequestPort);
/*
var serverReplyPort = new prism.core.port("Server Reply Port" , prism.core.prismConstants.REPLY);
serverComp.addCompPort(serverReplyPort);*/
var serverReplyPort = new prism.core.NodeRemotePort("Server Request Port",prism.core.prismConstants.REPLY);
serverComp.addCompPort(serverReplyPort);

clientRequestPort.setConfigs('162.243.153.54',7878);
serverReplyPort.setConfigs('0.0.0.0',7878);
clientRequestPort.start();
serverReplyPort.start();
//arch.weld(serverReplyPort,clientRequestPort);

roundRobin.start();
arch.start();

clientBehavoir.sendMessage();
/*
var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
    client.write('I am Chuck Norris!');

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {

    console.log('DATA: ' + data);
    // Close the client socket completely
    client.destroy();

});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});*/