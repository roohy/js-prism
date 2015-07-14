/**
 * Created by Ruhollah on 7/13/2015.
 */
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

eval(fs.readFileSync('configuration.js')+'');
eval(fs.readFileSync('concom.js')+'');


function START(){
    scf = new prism.core.scaffold();
    fifo = new PRISM_PROJECT.scheduler(PRISM_PROJECT.maxSize);
    roundRobin = new PRISM_PROJECT.dispatcher(fifo,PRISM_PROJECT.threadCount);
    scf.dispatcher = roundRobin;
    scf.scheduler = fifo;

    arch = new prism.core.architecture(PRISM_PROJECT.name);
    arch.scaffold = scf;
}

console.log("---------------------------------------------------------");
console.log("****************  Welcome To PRISM  *********************");
console.log("---------------------------------------------------------");
process.argv.forEach(function(val, index, array){
   if (index == 2){
        //checking the run mode
       if (val == 'run'){
           console.log("Statring");
       }
   }
});