
var prism = prism || {};
prism.core = prism.core || {};

prism.core.roundRobinDispatcher = function(scheduler , n){
    this.DEFAULT_COUNT = 10;
    this.threadCount = 0;
    this.workerThreads = [];
    this.scheduler = typeof scheduler !== "undefined" ? scheduler : null;
    if(this.scheduler){
        this.scheduler.dispatcher = this;

    }
    else{
        this.scheduler.dispatcher = null;
    }
    this.n = typeof n !== "undefined" ? n : this.DEFAULT_COUNT;
    for( var i =  0 ; i < this.n ; i++){
        var temp = new prism.core.workerThread(""+i , this , this.scheduler);
        this.workerThreads.push(temp);
    }


};

prism.core.roundRobinDispatcher.prototype.start = function(){
    //for ( var i = 0 ; i < this.workerThreads.length ; i++){
    //    this.workerThreads[i].run();
    //}

};

prism.core.roundRobinDispatcher.prototype.stop = function(){
    for ( var i = 0 ; i < this.workerThreads.length ; i++){
        this.workerThreads[i].keepWorking = false;
    }
};
prism.core.roundRobinDispatcher.prototype.notify = function(){
    if (this.threadCount < this.n){
        this.threadCount++;
        prism.core.currentThreadCount = this.threadCount;

        try{
            var e = this.scheduler.getEvent();
            console.log(" this is e, ", e.handlingBrick);
            if(e != null && e !== 'undefined'){
                console.log("handling a message in dispatch");
                e.handlingBrick.handle(e);
                if(e.name == 'Terminate'){
                    console.log("Leaving the program");
                    this.dispatcher.stop();
                    return;
                }
                e = null;
            }
            else{
                this.threadCount--;
                prism.core.currentThreadCount = this.threadCount;
                if(this.threadCount == 0){
                    prism.core.busyWaiter();
                }
                return;
            //    console.log("Ending a thread, calling busy waiter...");
            //    prism.core.busyWaiter();
            //    return;
                //console.log("Shoot, Null Message in a Worker Thread");
            }
        }
        catch(ex){
            console.log("Shoot! Some Error in dispatcher notify part "+ex);
            return;
        }

        this.threadCount--;
        prism.core.currentThreadCount = this.threadCount;
        this.notify();
        return;
    }
    //prism.core.busyWaiter();
};