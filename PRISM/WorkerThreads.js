/**
 * Created by Ro0ohy on 12/7/2014.
 */

//Desinged and written by roohy and yixue.
// we are implementing this to support multi-threading as it is supported in java
// We are going to implement some usefull functions for multi-threading in the context of
//prism. Hopefully after deadline. I will change it to a multi-threading-library

var prism = prism || {};
prism.core = prism.core || {};

prism.core.workerThread = function(name, dispatcher,events){
    this.events = events;
    this.name = name;
    this.dispatcher = dispatcher;
    this.keepWorking = true;
    this.timeStep = 100;
};
prism.core.workerThread.prototype.run = function(){
    if(this.keepWorking){
        setTimeout(this.theFunction.bind(this),300);
    }
    return;
};

prism.core.workerThread.prototype.theFunction = function(){
    try{
        var e = this.events.getEvent();
        if(e != null){
            e.handlingBrick.handle(e);
            if(e.name == 'Terminate'){
                console.log("Leaving the program");
                this.dispatcher.stop();
                return;
            }
            e = null;
        }
        else{
            //console.log("Shoot, Null Message in a Worker Thread");
        }
    }
    catch(e){
        console.log("Shoot! Some Error");
    }
    setTimeout(this.run.bind(this),this.timeStep);
};

//This busy waiter helps us keep the control of the program in times that we have no event to process
prism.core.nonBusy = false;
prism.core.busyWaiter = function(){
    if(prism.core.nonBusy){
        setTimeout(prism.core.busyWaiter,1000);
    }
}


prism.core.Threading = {};
prism.core.Threading.theQ = [];

prism.core.Threading.addToWaitingList = function(func,obj){
    prism.core.theQ.push([func,obj]);
};

prism.core.Threading.notifyAll = function(){
    for(var i = 0 ; i<prism.core.Threading.theQ.length ; i++){
        setTimeout(prism.core.Threading.theQ[i][0].bind(prism.core.Threading.theQ[i][1]),10);
    }
    return;
}

prism.core.Threading.sleep = function(milliseconds){
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}