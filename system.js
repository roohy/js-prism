/**
 * Created by Ruhollah on 7/13/2015.
 */

console.log("---------------------------------------------------------");
console.log("****************  Welcome To PRISM  *********************");
console.log("---------------------------------------------------------");

console.log("Loading up core libraries...");
 //Importing the needed files
var net = require('net');

var fs = require('fs');

// file is included here:
eval(fs.readFileSync('PRISM/prism.js')+'');
eval(fs.readFileSync('PRISM/PrismConstants.js')+'');
eval(fs.readFileSync('PRISM/scaffold.js')+'');

eval(fs.readFileSync('PRISM/scheduler.js')+'');
eval(fs.readFileSync('PRISM/event.js')+'');
eval(fs.readFileSync('PRISM/architecture.js')+'');
eval(fs.readFileSync('PRISM/port.js')+'');
eval(fs.readFileSync('PRISM/nodeSocketPort.js')+'');
eval(fs.readFileSync('PRISM/component.js')+'');
eval(fs.readFileSync('PRISM/WorkerThreads.js')+'');

eval(fs.readFileSync('PRISM/abstractImplementation.js')+'');
eval(fs.readFileSync('PRISM/roundRobinDispatcher.js')+'');
eval(fs.readFileSync('PRISM/FIFOScheduler.js')+'');

eval(fs.readFileSync('PRISM/connector.js')+'');

//add component implementations here
//eval(fs.readFileSync('component/client.js')+'');
//eval(fs.readFileSync('component/server.js')+'');


console.log('Loading Configurations...');
eval(fs.readFileSync('configuration.js')+'');
console.log("Loading Abstract implementations:");
for ( var i = 0 ; i < PRISM_PROJECT.implementations.length ; i++){
    console.log("adding source code for components in file: "+PRISM_PROJECT.implementations[i]);
    eval(fs.readFileSync(PRISM_PROJECT.implementations[i])+'');
}

console.log("Loading Architecture...");
eval(fs.readFileSync('concom.js')+'');


///////////////////////////////////////////////////////////////////////
PRISM_PROJECT.addPort =  function (req,rep){

    var requestOne = new prism.core.port(req+" Port",prism.core.prismConstants.REQUEST)
    var replyOne = new prism.core.port(rep+" Port",prism.core.prismConstants.REPLY)
    PRISM_PROJECT.components[req].addCompPort(requestOne);
    PRISM_PROJECT.components[rep].addCompPort(replyOne);
    PRISM_PROJECT.arch.weld(replyOne,requestOne);
};
PRISM_PROJECT.addComponent = function(key){
    PRISM_PROJECT.components[key] = new prism.core.component(key,new PRISM_PROJECT.components[key]());
    PRISM_PROJECT.components[key].scaffold = scf;
    PRISM_PROJECT.arch.add(PRISM_PROJECT.components[key]);
};

PRISM_PROJECT.addConnection = function(key){
    PRISM_PROJECT.components[key] = new prism.core.connector(key);
    PRISM_PROJECT.components[key].scaffold = scf;
    PRISM_PROJECT.arch.add(PRISM_PROJECT.components[key]);
};
//////////////////////////////////////////////////////////////////////////////////

function addPorts(){
    PRISM_PROJECT.ports.forEach(function(val, index, array){
        PRISM_PROJECT.addPort(val[0],val[1]);
        /*var requestOne = new prism.core.port(val[0]+" Port",prism.core.prismConstants.REQUEST)
        var replyOne = new prism.core.port(val[1]+" Port",prism.core.prismConstants.REPLY)
        PRISM_PROJECT.components[val[0]].addCompPort(requestOne);
        PRISM_PROJECT.components[val[1]].addCompPort(replyOne);
        PRISM_PROJECT.arch.weld(replyOne,requestOne);*/

    });
}
function addComponents(){
    Object.keys(PRISM_PROJECT.components).forEach(function(key){
        PRISM_PROJECT.addComponent(key);
    });
}
function addConnectors(){
    PRISM_PROJECT.connectors.forEach(function(val, index, array){
        PRISM_PROJECT.addConnection(val);
    });
}



//////////////////////////////////////////////////**********************************************//////////////////////////////////////////////
function START(){
    console.log("Initiating Scaffold and Scheduler and Dispatcher");
    scf = new prism.core.scaffold();
    fifo = new PRISM_PROJECT.scheduler(PRISM_PROJECT.maxSize);
    roundRobin = new PRISM_PROJECT.dispatcher(fifo,PRISM_PROJECT.threadCount);
    scf.dispatcher = roundRobin;
    scf.scheduler = fifo;
    console.log("Initializing Architecture "+PRISM_PROJECT.name);
    PRISM_PROJECT.arch = new prism.core.architecture(PRISM_PROJECT.name);
    PRISM_PROJECT.arch.scaffold = scf;
    //making components
    //PRISM_PROJECT.behavior = {};
    console.log("Putting components together...");
    addComponents();
    addConnectors();
    //finding the ports
    console.log("Adding Ports to the components and connectors...");
    addPorts();
    console.log("Starting Dispatcher...");
    roundRobin.start();
    PRISM_PROJECT.arch.start();
}

process.argv.forEach(function(val, index, array){
   if (index == 2){
        //checking the run mode
       if (val == 'run'){
           console.log("Statring");
            //RUN Command
           START();
           console.log("Running the start commands");
           eval(fs.readFileSync('start.js')+'');
       }
   }
});